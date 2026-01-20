import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Code, PenTool, Megaphone } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Creative & Design",
    description: "Branding, UI/UX, graphics, and visual identity design with creative direction.",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    icon: Code,
    title: "Technical / IT",
    description: "Web development, mobile apps, software solutions, and technical consulting.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: PenTool,
    title: "Content & Branding",
    description: "Copywriting, content strategy, brand messaging, and storytelling.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Megaphone,
    title: "Media & Marketing",
    description: "Social media, digital marketing, video production, and campaign management.",
    color: "bg-orange-500/10 text-orange-600",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide mx-auto">
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
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mx-auto mb-5`}>
                <service.icon className="w-7 h-7" />
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
            <Button variant="outline" size="lg">
              Explore All Services
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
