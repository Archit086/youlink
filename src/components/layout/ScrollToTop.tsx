import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Routing between pages should land at the top, not mid-page. */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
};
