import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Send, ClipboardCheck, Users, FileSignature, Rocket, HeartHandshake,
  UserPlus, Search, CheckCircle, CreditCard, Briefcase, GraduationCap,
  ArrowRight
} from "lucide-react";

const clientSteps = [
  {
    icon: Send,
    title: "Submit Project Enquiry",
    description: "Fill out our project enquiry form with your requirements, timeline, and budget expectations.",
  },
  {
    icon: ClipboardCheck,
    title: "Requirement Assessment",
    description: "Our team reviews your project, clarifies details, and prepares a comprehensive scope document.",
  },
  {
    icon: Users,
    title: "Team & Supervisor Assignment",
    description: "We match you with the right freelancer team led by an experienced supervisor for your project type.",
  },
  {
    icon: FileSignature,
    title: "Legal Agreement + 50% Advance",
    description: "Sign a service agreement for legal protection. Project begins after 50% advance payment.",
  },
  {
    icon: Rocket,
    title: "Milestone-Based Execution",
    description: "Work progresses through defined milestones with regular updates and quality checkpoints.",
  },
  {
    icon: HeartHandshake,
    title: "Delivery + Post-Support",
    description: "Final delivery after quality review, followed by post-project support as per agreement.",
  },
];

const freelancerSteps = [
  {
    icon: UserPlus,
    title: "Apply via Onboarding Form",
    description: "Submit your profile with skills, experience, portfolio, and CV for initial screening.",
  },
  {
    icon: Search,
    title: "Profile Screening & Verification",
    description: "Our team reviews your application, verifies credentials, and assesses skill alignment.",
  },
  {
    icon: CheckCircle,
    title: "Approval by Admin/Supervisor",
    description: "Qualified applicants are approved and added to our verified freelancer network.",
  },
  {
    icon: CreditCard,
    title: "Subscription Payment (₹99/month)",
    description: "Activate your account with a nominal monthly subscription to access project opportunities.",
  },
  {
    icon: Briefcase,
    title: "Assignment to Supervised Projects",
    description: "Get matched to projects based on your skills, work under supervisor guidance.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship + Payout Cycle",
    description: "Receive continuous feedback, skill development support, and fair milestone-based payouts.",
  },
];

const HowItWorks = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-subtle-gradient">
        <div className="container-narrow mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
            How <span className="text-gradient-hero">YouLink</span> Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A structured, transparent process designed for success — 
            whether you're a client seeking quality work or a freelancer looking to grow.
          </p>
        </div>
      </section>

      {/* For Clients */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-action/10 text-action text-sm font-medium mb-4">
              For Clients
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Get Quality Work Delivered
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From enquiry to delivery, here's how we ensure your project succeeds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {clientSteps.map((step, index) => (
              <div key={step.title} className="card-elevated p-6 lg:p-8 relative">
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-action/10 text-action text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-action/10 flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-action" />
                </div>
                <h3 className="text-xl font-semibold font-display mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/hire">
              <Button variant="action" size="lg">
                Start Your Project
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* For Freelancers */}
      <section className="section-padding bg-subtle-gradient">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              For Freelancers
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Join Our Verified Network
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From application to earning, here's your journey to becoming a YouLink freelancer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {freelancerSteps.map((step, index) => (
              <div key={step.title} className="card-elevated p-6 lg:p-8 relative bg-card">
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-accent/10 text-accent text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold font-display mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/join">
              <Button variant="accent" size="lg">
                Apply Now
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="card-elevated p-8 lg:p-12 text-center">
            <h2 className="text-2xl font-bold font-display mb-4">
              Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We're here to help. Reach out through our contact form or explore our pricing and policies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/hire">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
