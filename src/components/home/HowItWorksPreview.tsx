import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send, UserCheck, Users, FileSignature, Rocket, HeartHandshake } from "lucide-react";

const clientSteps = [
  { icon: Send, title: "Submit Enquiry", description: "Share your project requirements" },
  { icon: UserCheck, title: "Team Allocation", description: "We assign the right team & supervisor" },
  { icon: Rocket, title: "Quality Delivery", description: "Milestone-based execution" },
];

const freelancerSteps = [
  { icon: FileSignature, title: "Apply & Verify", description: "Submit your profile for screening" },
  { icon: Users, title: "Get Approved", description: "Join our verified freelancer network" },
  { icon: HeartHandshake, title: "Earn & Grow", description: "Work on supervised projects" },
];

export const HowItWorksPreview = () => {
  return (
    <section className="section-padding section-white relative">
      <div className="absolute inset-0 bg-mesh" />
      <div className="container-wide mx-auto relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            How <span className="text-gradient-hero">YouLink</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple, structured, and designed for success — for both clients and freelancers.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* For Clients */}
          <div className="card-elevated p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              For Clients
            </div>
            <h3 className="text-2xl font-bold font-display mb-8">
              Get Quality Work Delivered
            </h3>
            <div className="space-y-6">
              {clientSteps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                    </div>
                    <h4 className="font-semibold mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/hire" className="mt-8 inline-block">
              <Button variant="action">
                Start Your Project
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          {/* For Freelancers */}
          <div className="card-elevated p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              For Freelancers
            </div>
            <h3 className="text-2xl font-bold font-display mb-8">
              Join Our Verified Network
            </h3>
            <div className="space-y-6">
              {freelancerSteps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                    </div>
                    <h4 className="font-semibold mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/join" className="mt-8 inline-block">
              <Button variant="accent">
                Apply Now
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>

        {/* See Full Process Link */}
        <div className="text-center mt-12">
          <Link to="/how-it-works">
            <Button variant="outline" size="lg">
              View Complete Process
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
