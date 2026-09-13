import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTopImmediately } from "@/lib/smooth-scroll";

/** Routing between pages should land at the top, not mid-page. */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTopImmediately();
  }, [pathname]);

  return null;
};
