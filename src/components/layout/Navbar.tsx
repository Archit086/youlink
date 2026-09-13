import { SiteNav } from "./SiteNav";

/** Inner pages: the same bar as the homepage hero, on a sticky glass strip. */
export const Navbar = () => (
  <header className="sticky top-0 z-50 bg-ground/80 backdrop-blur-md">
    <SiteNav />
  </header>
);
