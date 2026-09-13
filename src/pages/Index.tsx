import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

/** Statement → showcase → studio → capability → work → clients. */
const Index = () => (
  <Layout showNavbar={false} showBackground={false}>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <TestimonialsSection />
  </Layout>
);

export default Index;
