import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  /** The homepage hides the bar — its hero carries its own navigation. */
  showNavbar?: boolean;
}

export const Layout = ({ children, showNavbar = true }: LayoutProps) => (
  <div className="flex min-h-screen flex-col bg-[#0C0C0C]" style={{ overflowX: "clip" }}>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-[#D7E2EA] focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-[#0C0C0C]"
    >
      Skip to content
    </a>
    {showNavbar && <Navbar />}
    <main id="main" className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);
