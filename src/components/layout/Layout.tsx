import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SiteBackground } from "@/components/site/SiteBackground";
import { SmoothScroll } from "@/components/site/SmoothScroll";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
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
    <main id="main" className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);
