import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Code, PenTool, Megaphone } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Creative & Design",
    description: "Branding, UI/UX, graphics, and visual identity design with creative direction.",
  },
  {
    icon: Code,
    title: "Technical / IT",
    description: "Web development, mobile apps, software solutions, and technical consulting.",
  },
  {
    icon: PenTool,
    title: "Content & Branding",
    description: "Copywriting, content strategy, brand messaging, and storytelling.",
  },
  {
    icon: Megaphone,
    title: "Media & Marketing",
    description: "Social media, digital marketing, video production, and campaign management.",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="section-padding section-light-blue relative">
      {/* Abstract shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/4 rounded-full blur-3xl" />
      </div>

      <div className="container-wide mx-auto relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            Services We <span className="text-gradient-hero">Deliver</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From creative design to technical development — all delivered by supervised, verified teams.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="card-elevated card-hover p-6 text-center group"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground">
              Explore All Services
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
