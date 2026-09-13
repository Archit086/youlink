/**
 * The standalone document rendered inside GenerativeTree's sandboxed iframe: a
 * recursive branching tree drawn on a 2D canvas. It grows once and stays for the
 * life of the page (set LOOP to fade out and regrow), with pollen drifting up.
 *
 * GenerativeTree patches this source by exact string match (growth speed, hold
 * duration, particle count, padding, the frame loop, the timers and the start
 * call). Keep those statements verbatim, each occurring once, when editing.
 * The script avoids backticks and template interpolation so it can live inside
 * this template literal untouched.
 */
export const generativeTreeSource = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Generative Tree</title>
<style>
  html, body { margin: 0; height: 100%; background: #0a0a0a; overflow: hidden; }
  canvas { display: block; width: 100%; height: 100%; }
  .label { position: fixed; left: 16px; bottom: 12px; font: 12px/1.4 system-ui, sans-serif; color: rgba(255, 255, 255, 0.4); }
</style>
</head>
<body>
<canvas id="tree"></canvas>
<div class="label">generative tree</div>
<script>
(function () {
  var canvas = document.getElementById('tree');
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  let GROWTH_SPEED_BASE = 0.006;
  const HOLD_DURATION = 400;
  const FADE_DURATION = 90;
  const WAIT_DURATION = 30;
  const PARTICLE_COUNT = 50;
  const MAX_DEPTH = 9;
  /* Grow once and stay. Set true to fade out and regrow after HOLD_DURATION. */
  const LOOP = false;
  const _pad = parseFloat(new URLSearchParams(location.search).get('p')) || 1;

  let W = 0;
  let H = 0;
  let root = null;
  let phase = 'grow';
  let holdTimer = 0;
  let fadeTimer = 0;
  let waitTimer = 0;
  let shake = 0;
  let alpha = 1;
  let baseSize = 1;
  let scale = 1;
  let growing = false;
  let particles = [];
  let segments = [];
  let tips = [];

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.max(1, Math.floor(W * dpr));
    canvas.height = Math.max(1, Math.floor(H * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function makeBranch(length, angle, depth, width) {
    var b = {
      length: length,
      angle: angle,
      depth: depth,
      width: width,
      growthProgress: 0,
      growthSpeed: GROWTH_SPEED_BASE * rand(0.7, 1.3),
      swayPhase: rand(0, Math.PI * 2),
      children: []
    };
    if (depth < MAX_DEPTH && length > 6) {
      var count = depth < 3 && Math.random() < 0.35 ? 3 : 2;
      for (var i = 0; i < count; i++) {
        var side = count === 3 ? i - 1 : (i === 0 ? -1 : 1);
        var childAngle = angle + side * rand(0.28, 0.62) + rand(-0.12, 0.12);
        b.children.push(makeBranch(length * rand(0.66, 0.8), childAngle, depth + 1, Math.max(0.4, width * 0.68)));
      }
    }
    return b;
  }

  function createTree() {
    baseSize = Math.min(W, H);
    var trunk = (baseSize * 0.26) / _pad;
    root = makeBranch(trunk, -Math.PI / 2, 0, Math.max(2, trunk * 0.07));
    phase = 'grow';
    holdTimer = 0;
    fadeTimer = 0;
    waitTimer = 0;
    alpha = 1;
    shake = 1;
  }

  function makeParticles() {
    particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        r: rand(0.4, 1.6),
        rise: rand(0.0004, 0.0016),
        drift: rand(0, Math.PI * 2)
      });
    }
  }

  /* Bark brown through the trunk and limbs, turning leaf green only in the
     outer twigs, so the canopy reads as foliage rather than autumn colour. */
  function branchColor(depth, a) {
    var g = Math.pow(depth / MAX_DEPTH, 2.2);
    return 'hsla(' + (28 + g * 84) + ',' + (14 + g * 44) + '%,' + (44 + g * 4) + '%,' + a + ')';
  }

  function walk(b, x, y, inheritedSway, time) {
    if (b.growthProgress < 1) {
      b.growthProgress = Math.min(1, b.growthProgress + b.growthSpeed);
      growing = true;
    }

    var sway = Math.sin(time * 0.0006 + b.swayPhase) * 0.012 * b.depth + inheritedSway;
    var a = b.angle + sway + Math.sin(time * 0.02) * shake * 0.01;
    var len = b.length * b.growthProgress * scale;
    var x2 = x + Math.cos(a) * len;
    var y2 = y + Math.sin(a) * len;

    /* Queue the segment. Every branch at one depth shares a colour and a width,
       so drawTree() strokes each whole level as a single path. */
    var level = segments[b.depth] || (segments[b.depth] = { width: b.width * scale, points: [] });
    level.points.push(x, y, x2, y2);

    if (b.growthProgress < 1) return;

    if (b.children.length === 0) {
      tips.push(x2, y2);
      return;
    }

    for (var i = 0; i < b.children.length; i++) {
      walk(b.children[i], x2, y2, sway * 0.6, time);
    }
  }

  function drawTree() {
    ctx.lineCap = 'round';
    for (var d = 0; d < segments.length; d++) {
      var level = segments[d];
      if (!level) continue;
      ctx.strokeStyle = branchColor(d, alpha);
      ctx.lineWidth = level.width;
      ctx.beginPath();
      for (var s = 0; s < level.points.length; s += 4) {
        ctx.moveTo(level.points[s], level.points[s + 1]);
        ctx.lineTo(level.points[s + 2], level.points[s + 3]);
      }
      ctx.stroke();
    }

    if (tips.length) {
      ctx.fillStyle = 'hsla(112, 52%, 46%,' + 0.8 * alpha + ')';
      ctx.beginPath();
      for (var t = 0; t < tips.length; t += 2) {
        ctx.moveTo(tips[t] + 1.6, tips[t + 1]);
        ctx.arc(tips[t], tips[t + 1], 1.6, 0, Math.PI * 2);
      }
      ctx.fill();
    }
  }

  function frame(time) {
    // Decay shake
    shake *= 0.96;

    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(190, 230, 170, 0.18)';
    ctx.beginPath();
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.y -= p.rise;
      if (p.y < -0.02) {
        p.y = 1.02;
        p.x = Math.random();
      }
      var px = (p.x + Math.sin(time * 0.0003 + p.drift) * 0.01) * W;
      ctx.moveTo(px + p.r, p.y * H);
      ctx.arc(px, p.y * H, p.r, 0, Math.PI * 2);
    }
    ctx.fill();

    growing = false;
    if (root && phase !== 'wait') {
      scale = Math.min(W, H) / baseSize;
      segments = [];
      tips = [];
      walk(root, W / 2, H * 0.98, 0, time);
      drawTree();
    }

    if (phase === 'grow') {
      if (!growing) phase = 'hold';
    } else if (phase === 'hold') {
      holdTimer++;
      if (LOOP && holdTimer >= HOLD_DURATION) phase = 'fade';
    } else if (phase === 'fade') {
      fadeTimer++;
      alpha = Math.max(0, 1 - fadeTimer / FADE_DURATION);
      if (fadeTimer >= FADE_DURATION) phase = 'wait';
    } else if (phase === 'wait') {
      waitTimer++;
      if (waitTimer >= WAIT_DURATION) createTree();
    }

    requestAnimationFrame(frame);
  }

  /* Keep the same tree through resizes (including mobile address-bar changes);
     frame() rescales it to the new viewport instead of growing a new one. */
  window.addEventListener('resize', resize);

  resize();
  makeParticles();
  createTree();
  requestAnimationFrame(frame);
})();
</script>
</body>
</html>
`;
