import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleWaveProps {
  className?: string;
  /** Grid resolution per axis. Halved automatically on small screens. */
  density?: number;
  /** Opacity of each particle, 0–1. */
  opacity?: number;
}

/**
 * An animated particle wave, used as a section background.
 *
 * Adapted from the source component:
 *   1. Sizes to its CONTAINER via ResizeObserver, not `window.innerWidth/Height`.
 *      The original hard-coded 100vw/100vh, which overflows any panel narrower
 *      than the viewport and causes horizontal scroll.
 *   2. Renders on a transparent clear colour and reads the particle colour from
 *      the inherited `--theme-fg` custom property, so it follows the light/dark
 *      toggle and any inverted section it is placed inside. A MutationObserver
 *      handles theme changes rather than re-reading computed styles every frame.
 *   3. Pauses when scrolled out of view, and renders a single static frame for
 *      visitors who prefer reduced motion.
 *   4. Drops the `mousemove` listener from the source: the shader never consumed
 *      the mouse vector, so it was a global listener doing no work.
 */
const ParticleWave: React.FC<ParticleWaveProps> = ({ className = "", density = 160, opacity = 0.5 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particleVertex = `
    attribute float scale;
    uniform float uTime;
    void main() {
      vec3 p = position;
      float s = scale;
      p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
      p.x += (sin(p.y + uTime) * 0.5);
      s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = s * 15.0 * (1.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const particleFragment = `
    uniform vec3 uColor;
    uniform float uOpacity;
    void main() {
      gl_FragColor = vec4(uColor, uOpacity);
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    /** Reads the inherited foreground colour so the wave follows the theme. */
    const readColor = () => {
      const triplet = getComputedStyle(canvas).getPropertyValue("--theme-fg").trim();
      const [r, g, b] = triplet.split(/\s+/).map(Number);
      return Number.isFinite(r) ? new THREE.Vector3(r / 255, g / 255, b / 255) : new THREE.Vector3(0, 0, 0);
    };

    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
    camera.position.set(0, 6, 5);

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);

    // Fewer points on small screens — 160² is 25,600 draws.
    const amount = window.innerWidth < 768 ? Math.round(density / 2) : density;
    const gap = 0.3;
    const particleNum = amount * amount;
    const particlePositions = new Float32Array(particleNum * 3);
    const particleScales = new Float32Array(particleNum);

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < amount; ix++) {
      for (let iy = 0; iy < amount; iy++) {
        particlePositions[i] = ix * gap - (amount * gap) / 2;
        particlePositions[i + 1] = 0;
        particlePositions[i + 2] = iy * gap - (amount * gap) / 2;
        particleScales[j] = 1;
        i += 3;
        j++;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("scale", new THREE.BufferAttribute(particleScales, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: readColor() },
        uOpacity: { value: opacity },
      },
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let animationId: number | null = null;
    let visible = true;

    const renderFrame = () => {
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    const animate = () => {
      particleMaterial.uniforms.uTime.value += 0.05;
      renderFrame();
      animationId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (animationId === null && !prefersReducedMotion) animationId = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    if (prefersReducedMotion) {
      renderFrame();
    } else {
      start();
    }

    // Size to the container, not the window.
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      if (prefersReducedMotion) renderFrame();
    });
    resizeObserver.observe(container);

    // Don't burn frames while off-screen.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(container);

    // Follow the theme toggle.
    const themeObserver = new MutationObserver(() => {
      particleMaterial.uniforms.uColor.value = readColor();
      if (prefersReducedMotion || !visible) renderFrame();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      scene.remove(particles);
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density, opacity]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />;
};

export { ParticleWave };
