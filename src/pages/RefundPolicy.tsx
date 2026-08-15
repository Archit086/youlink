import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RefundPolicy = () => {
  return (
    <Layout>
      <section className="border-b">
        <div className="cell max-w-[900px]">
          <p className="label opacity-60">Legal</p>
          <h1 className="mt-16 text-headline-30">Payment & Refund Policy</h1>
          <p className="mt-24 border-t pt-16 font-mono text-caption-10 uppercase opacity-60">
            Last updated: January 2025
          </p>
        </div>
      </section>

      <section>
        <div className="cell max-w-[900px]">
          <div className="legal-prose">
            <div className="space-y-32">
              <div>
                <h2 className="mb-16 text-headline-10">1. Payment Structure</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">
                  YouLink follows a transparent, milestone-based payment structure:
                </p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li><strong>50% Advance:</strong> Required to initiate the project after agreement signing</li>
                  <li><strong>50% Balance:</strong> Due upon final delivery and approval</li>
                  <li>Large projects may have custom milestone-based payment schedules</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">2. Freelancer Subscription</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">
                  Freelancers pay a monthly subscription of ₹99 to maintain platform access:
                </p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li>Subscription activates after application approval</li>
                  <li>Monthly renewal required for continued project eligibility</li>
                  <li>Subscription fees are non-refundable once the billing cycle begins</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">3. Client Refund Policy</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">
                  Refund eligibility depends on the project stage:
                </p>
                
                <div className="space-y-20">
                  <div className="border-t pt-16">
                    <h4 className="label opacity-60">Before Project Initiation</h4>
                    <p className="mt-12 max-w-prose text-body-10 opacity-70">
                      Full refund of advance payment if cancellation occurs before work begins (within 48 hours of payment).
                    </p>
                  </div>
                  
                  <div className="border-t pt-16">
                    <h4 className="label opacity-60">During Project Execution</h4>
                    <p className="mt-12 max-w-prose text-body-10 opacity-70">
                      Partial refund based on work completed. Completed milestones are non-refundable.
                    </p>
                  </div>
                  
                  <div className="border-t pt-16">
                    <h4 className="label opacity-60">After Delivery</h4>
                    <p className="mt-12 max-w-prose text-body-10 opacity-70">
                      Refunds are not applicable after final delivery approval. Revisions within scope are provided as per agreement.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">4. Revision Policy</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">
                  We offer revisions to ensure client satisfaction:
                </p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li>Number of revisions defined in the service agreement</li>
                  <li>Revisions must be requested within the specified window</li>
                  <li>Additional revisions beyond scope may incur extra charges</li>
                  <li>Major scope changes require new agreement and pricing</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">5. Dispute Resolution</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">
                  In case of disputes:
                </p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li>Contact our support team within 7 days of issue occurrence</li>
                  <li>Provide documentation supporting your claim</li>
                  <li>Our team will review and mediate within 5-7 business days</li>
                  <li>Supervisor reports and project records will be considered</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">6. Cancellation by YouLink</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  In rare cases where YouLink cancels a project due to unforeseen circumstances, 
                  clients will receive a full refund of any unused advance payment. We will provide 
                  reasonable notice and assist in transitioning the project if needed.
                </p>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">7. Processing Time</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  Approved refunds are processed within 7-10 business days. The actual credit to your 
                  account depends on your payment provider and may take additional time.
                </p>
              </div>

              <div className="mt-32 border-t pt-24">
                <h3 className="text-headline-10">Questions About Payments or Refunds?</h3>
                <p className="mb-20 max-w-prose text-body-10 opacity-70">
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
