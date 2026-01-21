import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Award } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-subtle-gradient">
      {/* Mesh Background */}
      <div className="absolute inset-0 bg-mesh" />
      
      {/* Abstract Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Shield size={16} />
            <span>Supervisor-Led • Quality-Controlled • Transparent</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6 animate-slide-up">
            Freelance Teams That{" "}
            <span className="text-gradient-hero">Deliver Results</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Connect with verified, supervisor-led freelancer teams across creative and technical domains. 
            Quality-controlled delivery, accountability, and professional execution — guaranteed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/hire">
              <Button variant="action" size="xl">
                Hire a Team
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/join">
              <Button variant="outline" size="xl" className="border-2 border-primary/20 hover:bg-primary hover:text-primary-foreground">
                Join as Freelancer
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-card">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Verified Teams</p>
                <p className="text-sm text-muted-foreground">Screened & Approved</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-card">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Legal-Backed</p>
                <p className="text-sm text-muted-foreground">Service Agreements</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center shadow-card">
                <Award className="w-6 h-6 text-success" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Fair Payouts</p>
                <p className="text-sm text-muted-foreground">Milestone-Based</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
