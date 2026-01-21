import { CheckCircle, Users, Eye, FileCheck, GraduationCap, Wallet } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Verified Freelancers",
    description: "Every freelancer is screened, verified, and approved before joining our ecosystem.",
  },
  {
    icon: Users,
    title: "Supervisor-Led Teams",
    description: "Projects are managed by experienced supervisors ensuring quality at every step.",
  },
  {
    icon: Eye,
    title: "Transparent Pricing",
    description: "Clear pricing structure with no hidden fees. Know exactly what you're paying for.",
  },
  {
    icon: FileCheck,
    title: "Legal-Backed Agreements",
    description: "Every project comes with proper service agreements protecting both parties.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship Culture",
    description: "Freelancers grow with us through continuous mentorship and feedback loops.",
  },
  {
    icon: Wallet,
    title: "Fair Payouts",
    description: "Milestone-based payments ensure freelancers are compensated fairly and on time.",
  },
];

export const WhyYouLink = () => {
  return (
    <section className="section-padding section-white relative">
      {/* Subtle mesh overlay */}
      <div className="absolute inset-0 bg-mesh opacity-50" />
      
      <div className="container-wide mx-auto relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            Why Choose <span className="text-gradient-hero">YouLink</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            We're not just another freelance platform. We're a structured, human-centric ecosystem 
            built for quality and accountability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-elevated card-hover p-6 lg:p-8 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold font-display mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
