import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Palette, Code, PenTool, Megaphone, BookOpen, 
  ArrowRight, Check, Users, Shield, Clock 
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Creative & Design Services",
    description: "Transform your brand with stunning visual design and creative direction from supervised design teams.",
    color: "bg-pink-500/10 text-pink-600 border-pink-200",
    features: [
      "Brand Identity & Logo Design",
      "UI/UX Design & Prototyping",
      "Marketing Collateral & Graphics",
      "Social Media Design Assets",
      "Presentation Design",
    ],
    idealFor: "Startups, businesses needing brand refresh, marketing teams",
  },
  {
    icon: Code,
    title: "Technical / IT / Development",
    description: "Build robust digital solutions with verified developers under technical supervisor guidance.",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    features: [
      "Website Development",
      "Mobile App Development",
      "Custom Software Solutions",
      "API Integrations",
      "Technical Consulting",
    ],
    idealFor: "Startups, enterprises, businesses digitalizing operations",
  },
  {
    icon: PenTool,
    title: "Content & Branding",
    description: "Craft compelling narratives and content strategies that resonate with your audience.",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    features: [
      "Copywriting & Content Strategy",
      "Brand Messaging & Voice",
      "Blog & Article Writing",
      "Email Campaign Content",
      "Product Descriptions",
    ],
    idealFor: "E-commerce, content-driven businesses, agencies",
  },
  {
    icon: Megaphone,
    title: "Media & Marketing",
    description: "Amplify your reach with comprehensive marketing solutions and media production.",
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
    features: [
      "Social Media Management",
      "Digital Marketing Campaigns",
      "Video Production & Editing",
      "Influencer Coordination",
      "Performance Analytics",
    ],
    idealFor: "Brands, influencers, growing businesses, event companies",
  },
  {
    icon: BookOpen,
    title: "Research & Academic Assistance",
    description: "Get expert assistance with research, documentation, and academic projects.",
    color: "bg-violet-500/10 text-violet-600 border-violet-200",
    features: [
      "Market Research & Analysis",
      "Academic Writing Support",
      "Data Collection & Analysis",
      "Report & Documentation",
      "Literature Reviews",
    ],
    idealFor: "Students, researchers, academic institutions, consultants",
  },
];

const deliveryHighlights = [
  {
    icon: Users,
    title: "Supervised Delivery",
    description: "Every project is managed by an experienced supervisor who ensures quality standards.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Multiple review checkpoints before final delivery to guarantee excellence.",
  },
  {
    icon: Clock,
    title: "Timely Execution",
    description: "Milestone-based workflow ensures projects stay on track and on time.",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-subtle-gradient">
        <div className="container-wide mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
              Services We <span className="text-gradient-hero">Deliver</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              From creative design to technical development — all delivered by supervised, 
              verified teams with accountability at every step.
            </p>
          </div>

          {/* Delivery Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {deliveryHighlights.map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="space-y-8">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                className="card-elevated overflow-hidden"
              >
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Service Info */}
                  <div className="lg:col-span-2 p-8 lg:p-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center flex-shrink-0`}>
                        <service.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold font-display mb-2">{service.title}</h2>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">What You Get</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-accent flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Ideal For</h4>
                        <p className="text-sm text-muted-foreground">{service.idealFor}</p>
                        <Link to="/hire" className="mt-6 inline-block">
                          <Button variant="action">
                            Get Started
                            <ArrowRight size={16} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Workflow Preview */}
                  <div className="bg-secondary/30 p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-border">
                    <h4 className="font-semibold mb-4">Typical Workflow</h4>
                    <ol className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center flex-shrink-0">1</span>
                        <span>Requirement discussion & scoping</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center flex-shrink-0">2</span>
                        <span>Team & supervisor assignment</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center flex-shrink-0">3</span>
                        <span>Milestone-based execution</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center flex-shrink-0">4</span>
                        <span>Quality review & delivery</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-hero-gradient text-primary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Tell us about your requirements and we'll match you with the perfect supervised team.
          </p>
          <Link to="/hire">
            <Button 
              size="xl" 
              className="bg-action text-action-foreground hover:bg-action/90 shadow-action"
            >
              Submit Project Enquiry
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
