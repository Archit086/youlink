import { Layout } from "@/components/layout/Layout";
import { Target, Heart, Lightbulb, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "Every project is executed with supervisor oversight, ensuring consistent, high-quality deliverables.",
  },
  {
    icon: Heart,
    title: "Human-Centric",
    description: "We prioritize people — fair payouts for freelancers, transparent pricing for clients.",
  },
  {
    icon: Lightbulb,
    title: "Mentorship-Driven",
    description: "Our freelancers grow through continuous feedback, skill development, and guidance.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "We believe in team-based delivery — where supervisors and freelancers work together.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-subtle-gradient">
        <div className="container-narrow mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
            About <span className="text-gradient-hero">YouLink</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're building a new kind of freelance ecosystem — one where quality, accountability, 
            and human growth are at the center of everything.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div className="card-elevated p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                Our Vision
              </div>
              <h2 className="text-2xl font-bold font-display mb-4">
                Redefining Freelance Work
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We envision a world where freelance work is not just gig-based, but career-building. 
                Where clients trust in quality and freelancers thrive with support, mentorship, and fair compensation.
              </p>
            </div>
            <div className="card-elevated p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-action/10 text-action text-sm font-medium mb-6">
                Our Mission
              </div>
              <h2 className="text-2xl font-bold font-display mb-4">
                Supervised Excellence
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To connect businesses with verified, supervisor-led freelancer teams that deliver 
                professional, quality-controlled work — every single time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="section-padding bg-subtle-gradient">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              The Problem We Solve
            </h2>
          </div>
          <div className="card-elevated p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h3 className="text-xl font-semibold font-display mb-4 text-destructive">
                  Traditional Freelancing Challenges
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                    <span>Inconsistent quality with no accountability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                    <span>Freelancers working in isolation without guidance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                    <span>Hidden pricing and unclear expectations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                    <span>No legal protection for either party</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold font-display mb-4 text-accent">
                  The YouLink Solution
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>Supervisor-led teams ensure quality at every step</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>Verified freelancers with continuous mentorship</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>Transparent pricing with no hidden costs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>Legal-backed service agreements for protection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at YouLink.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card-elevated card-hover p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold font-display mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section-padding bg-hero-gradient text-primary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
            Built With Purpose
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            YouLink was born from a simple observation: talented freelancers often lack structure, 
            and clients struggle to find reliable teams. We bridge this gap by creating a supervised 
            ecosystem where everyone wins — freelancers grow, clients succeed, and quality is never compromised.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
