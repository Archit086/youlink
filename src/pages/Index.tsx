import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyYouLink } from "@/components/home/WhyYouLink";
import { HowItWorksPreview } from "@/components/home/HowItWorksPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhyYouLink />
      <ServicesPreview />
      <HowItWorksPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;
