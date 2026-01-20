import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RefundPolicy = () => {
  return (
    <Layout>
      <section className="section-padding bg-subtle-gradient">
        <div className="container-narrow mx-auto">
          <h1 className="text-4xl font-bold font-display mb-6">Payment & Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="prose prose-slate max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-display mb-4">1. Payment Structure</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  YouLink follows a transparent, milestone-based payment structure:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>50% Advance:</strong> Required to initiate the project after agreement signing</li>
                  <li><strong>50% Balance:</strong> Due upon final delivery and approval</li>
                  <li>Large projects may have custom milestone-based payment schedules</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">2. Freelancer Subscription</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Freelancers pay a monthly subscription of ₹99 to maintain platform access:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Subscription activates after application approval</li>
                  <li>Monthly renewal required for continued project eligibility</li>
                  <li>Subscription fees are non-refundable once the billing cycle begins</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">3. Client Refund Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Refund eligibility depends on the project stage:
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h4 className="font-semibold mb-2">Before Project Initiation</h4>
                    <p className="text-sm text-muted-foreground">
                      Full refund of advance payment if cancellation occurs before work begins (within 48 hours of payment).
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h4 className="font-semibold mb-2">During Project Execution</h4>
                    <p className="text-sm text-muted-foreground">
                      Partial refund based on work completed. Completed milestones are non-refundable.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h4 className="font-semibold mb-2">After Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      Refunds are not applicable after final delivery approval. Revisions within scope are provided as per agreement.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">4. Revision Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We offer revisions to ensure client satisfaction:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Number of revisions defined in the service agreement</li>
                  <li>Revisions must be requested within the specified window</li>
                  <li>Additional revisions beyond scope may incur extra charges</li>
                  <li>Major scope changes require new agreement and pricing</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">5. Dispute Resolution</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In case of disputes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Contact our support team within 7 days of issue occurrence</li>
                  <li>Provide documentation supporting your claim</li>
                  <li>Our team will review and mediate within 5-7 business days</li>
                  <li>Supervisor reports and project records will be considered</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">6. Cancellation by YouLink</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In rare cases where YouLink cancels a project due to unforeseen circumstances, 
                  clients will receive a full refund of any unused advance payment. We will provide 
                  reasonable notice and assist in transitioning the project if needed.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">7. Processing Time</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Approved refunds are processed within 7-10 business days. The actual credit to your 
                  account depends on your payment provider and may take additional time.
                </p>
              </div>

              <div className="card-elevated p-6">
                <h3 className="font-semibold mb-3">Questions About Payments or Refunds?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have any questions about our payment or refund policies, please reach out to us.
                </p>
                <Link to="/hire">
                  <Button variant="outline">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RefundPolicy;
