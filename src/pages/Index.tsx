import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { MetricsBand } from "@/components/home/MetricsBand";
import { StudioStatement } from "@/components/home/StudioStatement";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { ClientShowcase } from "@/components/work/ClientShowcase";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { OperatingModel } from "@/components/home/OperatingModel";
import { TeamSection } from "@/components/home/TeamSection";
import { CTASection } from "@/components/home/CTASection";

/** Statement → proof → studio → capability → clients → work → model → people → invitation. */
const Index = () => (
  <Layout>
    <HeroSection />
    <MetricsBand />
    <StudioStatement />
    <ServicesIndex />
    <ClientShowcase />
    <FeaturedWork />
    <OperatingModel />
    <TeamSection />
    <CTASection />
  </Layout>
);

export default Index;
