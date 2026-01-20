import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Shield, CreditCard, FileText, RefreshCw } from "lucide-react";

const pricingHighlights = [
  {
    icon: Shield,
    title: "Transparent Pricing",
    description: "Clear pricing structure based on project scope. No hidden fees, no surprises.",
  },
  {
    icon: CreditCard,
    title: "50% Advance System",
    description: "Projects begin after 50% advance payment. Balance due upon final delivery.",
  },
  {
    icon: FileText,
    title: "Legal Agreements",
    description: "Every project comes with a service agreement protecting both parties.",
  },
  {
    icon: RefreshCw,
    title: "Milestone Payouts",
    description: "Freelancers receive fair, timely payments based on milestone completion.",
  },
];

const whatYouGet = [
  "Detailed project scoping and requirement analysis",
  "Supervisor-led team assignment",
  "Regular progress updates and communication",
  "Quality review at every milestone",
  "Legal-backed service agreement",
  "Post-delivery support as per scope",
  "Revision window within agreed terms",
  "Transparent breakdown of all costs",
];

const Pricing = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-subtle-gradient">
        <div className="container-narrow mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
            Pricing & <span className="text-gradient-hero">Engagement</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent, fair pricing for quality-controlled freelance services. 
            We believe in clarity — no hidden costs, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Highlights */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingHighlights.map((item) => (
              <div key={item.title} className="card-elevated card-hover p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold font-display mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Pricing Works */}
      <section className="section-padding bg-subtle-gradient">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              How Pricing Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Every project is unique. Here's our approach to fair, transparent pricing.
            </p>
          </div>

          <div className="card-elevated p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h3 className="text-xl font-semibold font-display mb-6">
                  Custom Quotes Based On
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="font-medium">Project Scope & Complexity</p>
                      <p className="text-sm text-muted-foreground">Size, features, and technical requirements</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="font-medium">Timeline Requirements</p>
                      <p className="text-sm text-muted-foreground">Standard or expedited delivery</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <p className="font-medium">Team Expertise Level</p>
                      <p className="text-sm text-muted-foreground">Based on required skills and experience</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <p className="font-medium">Support & Maintenance Needs</p>
                      <p className="text-sm text-muted-foreground">Post-delivery support requirements</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold font-display mb-6">
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {whatYouGet.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Terms */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Payment Terms
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-elevated p-8">
              <h3 className="text-xl font-semibold font-display mb-4">For Clients</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>50% advance to initiate project</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Remaining 50% upon final delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Multiple payment options available</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Invoice with complete breakdown</span>
                </li>
              </ul>
            </div>

            <div className="card-elevated p-8">
              <h3 className="text-xl font-semibold font-display mb-4">For Freelancers</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>₹99/month platform subscription</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Milestone-based project payouts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Fair, transparent payout structure</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Timely payments after milestone approval</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Refund Policy Note */}
          <div className="mt-8 p-6 rounded-xl bg-secondary/50 border border-border">
            <h4 className="font-semibold mb-2">Revision & Refund Policy</h4>
            <p className="text-sm text-muted-foreground">
              We offer revisions within the agreed scope. Refund policies are defined in the service agreement 
              and depend on project stage and deliverables completed. 
              <Link to="/refund-policy" className="text-accent hover:underline ml-1">
                View full policy →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-hero-gradient text-primary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
            Ready to Get a Quote?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Share your project details and we'll provide a transparent, detailed proposal.
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

export default Pricing;
