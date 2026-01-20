import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="section-padding bg-hero-gradient text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-narrow mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
          <Sparkles size={16} />
          <span>Ready to get started?</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
          Let's Build Something Great Together
        </h2>

        <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-10">
          Whether you need a team for your next project or want to join our network of verified freelancers, 
          YouLink is here to help you succeed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/hire">
            <Button 
              size="xl" 
              className="bg-action text-action-foreground hover:bg-action/90 shadow-action"
            >
              Hire a Team
              <ArrowRight size={20} />
            </Button>
          </Link>
          <Link to="/join">
            <Button 
              size="xl" 
              variant="outline"
              className="border-2 border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary"
            >
              Join as Freelancer
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
