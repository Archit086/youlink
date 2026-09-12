import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHeader, Section } from "@/components/site/Page";
import { ContactButton, LiveProjectButton } from "@/components/site/Buttons";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <PageHeader
        eyebrow="404 — Not found"
        title="This page doesn't exist"
        lead="The link may be out of date, or the page may have moved. Everything else is still where you left it."
      />

      <Section>
        <div className="flex flex-wrap gap-4">
          <ContactButton to="/">Back to home</ContactButton>
          <LiveProjectButton to="/work">See the work</LiveProjectButton>
        </div>
      </Section>
    </Layout>
  );
};

export default NotFound;
