import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Lines } from "@/components/site/Reveal";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="border-b">
        <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
          <span className="index-number">404</span>
          <span className="label">Not found</span>
        </div>

        <div className="px-12 pb-24 pt-40 lg:px-20 lg:pb-40 lg:pt-56">
          <h1 className="text-headline-40">
            <Lines lines={["This page", "doesn't exist."]} stagger={90} />
          </h1>
        </div>

        <div className="grid border-t lg:grid-cols-2">
          <div className="cell">
            <p className="max-w-prose text-body-20 opacity-70">
              The link may be out of date, or the page may have moved. Everything else is still where
              you left it.
            </p>
          </div>
          <div className="grid grid-cols-2 border-t lg:border-l lg:border-t-0">
            <Button asChild variant="default" size="cell">
              <Link to="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline" size="cell" className="border-y-0 border-r-0">
              <Link to="/work">See the work</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
