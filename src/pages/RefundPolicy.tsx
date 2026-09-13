import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RefundPolicy = () => {
  return (
    <Layout>
      <section className="border-b border-mist/15">
        <div className="mx-auto max-w-[900px] px-5 py-12 sm:px-8 md:px-10 md:py-16">
          <p className="eyebrow text-mist opacity-50">Legal</p>
          <h1 className="display-serif mt-6" style={{ fontSize: "clamp(2.25rem, 7vw, 5rem)" }}>Payment & Refund Policy</h1>
          <p className="mt-8 border-t border-mist/15 pt-5 text-xs text-mist opacity-50">
            Last updated: January 2025
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[900px] px-5 py-12 sm:px-8 md:px-10 md:py-16">
          <div>
            <div className="space-y-10">
              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">1. Payment Structure</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  YouLink follows a transparent, milestone-based payment structure:
                </p>
                <ul className="space-y-2 list-disc pl-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  <li>Payment schedule set out in each project's service agreement</li>
                  <li>Large projects may have custom milestone-based payment schedules</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">2. Client Refund Policy</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  Refund eligibility depends on the project stage:
                </p>
                
                <div className="space-y-6">
                  <div className="border-t border-mist/15 pt-6">
                    <h4 className="eyebrow text-mist opacity-50">Before Project Initiation</h4>
                    <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                      Full refund of any payment made if cancellation occurs before work begins (within 48 hours of payment).
                    </p>
                  </div>
                  
                  <div className="border-t border-mist/15 pt-6">
                    <h4 className="eyebrow text-mist opacity-50">During Project Execution</h4>
                    <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                      Partial refund based on work completed. Completed milestones are non-refundable.
                    </p>
                  </div>
                  
                  <div className="border-t border-mist/15 pt-6">
                    <h4 className="eyebrow text-mist opacity-50">After Delivery</h4>
                    <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                      Refunds are not applicable after final delivery approval. Revisions within scope are provided as per agreement.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">3. Revision Policy</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  We offer revisions to ensure client satisfaction:
                </p>
                <ul className="space-y-2 list-disc pl-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  <li>Number of revisions defined in the service agreement</li>
                  <li>Revisions must be requested within the specified window</li>
                  <li>Additional revisions beyond scope may incur extra charges</li>
                  <li>Major scope changes require new agreement and pricing</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">4. Dispute Resolution</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  In case of disputes:
                </p>
                <ul className="space-y-2 list-disc pl-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  <li>Contact our support team within 7 days of issue occurrence</li>
                  <li>Provide documentation supporting your claim</li>
                  <li>Our team will review and mediate within 5-7 business days</li>
                  <li>Supervisor reports and project records will be considered</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">5. Cancellation by YouLink</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  In rare cases where YouLink cancels a project due to unforeseen circumstances,
                  clients will receive a full refund of any payment for work not yet delivered. We will provide
                  reasonable notice and assist in transitioning the project if needed.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">6. Processing Time</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  Approved refunds are processed within 7-10 business days. The actual credit to your 
                  account depends on your payment provider and may take additional time.
                </p>
              </div>

              <div className="mt-10 border-t border-mist/15 pt-8">
                <h3 className="text-xl font-medium leading-tight text-mist md:text-2xl">Questions About Payments or Refunds?</h3>
                <p className="mb-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
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
