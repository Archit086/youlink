import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SiteBackground } from "@/components/site/SiteBackground";
import { SmoothScroll } from "@/components/site/SmoothScroll";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <SmoothScroll />
      <SiteBackground />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-12 focus:top-12 focus:z-[60] focus:bg-theme-fg focus:px-12 focus:py-10 focus:font-mono focus:text-caption-10 focus:uppercase focus:text-theme-bg"
      >
        Skip to content
      </a>
      <Navbar />
      {/* Keyed on the route so each page fades in rather than snapping. */}
      <main id="main" key={pathname} className="page-enter flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
