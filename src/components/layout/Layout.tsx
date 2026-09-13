import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TreeBackground } from "@/components/site/TreeBackground";

interface LayoutProps {
  children: ReactNode;
  /** The homepage hides the bar — its hero carries its own navigation. */
  showNavbar?: boolean;
  /** The generative tree behind the page. On everywhere except the homepage. */
  showBackground?: boolean;
}

export const Layout = ({ children, showNavbar = true, showBackground = true }: LayoutProps) => (
  <div className="relative flex min-h-screen flex-col bg-ground" style={{ overflowX: "clip" }}>
    {showBackground && <TreeBackground />}
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-mist focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-ground"
    >
      Skip to content
    </a>
    {showNavbar && <Navbar />}
    {/* Positioned so it paints above the fixed background. */}
    <main id="main" className="relative z-10 flex-1">
      {children}
    </main>
    <Footer />
  </div>
);
