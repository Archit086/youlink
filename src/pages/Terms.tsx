import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <section className="border-b">
        <div className="cell max-w-[900px]">
          <p className="label opacity-60">Legal</p>
          <h1 className="mt-16 text-headline-30">Terms & Conditions</h1>
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
                <h2 className="mb-16 text-headline-10">1. Acceptance of Terms</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  By accessing and using YouLink's services, you agree to be bound by these Terms and Conditions. 
                  If you do not agree to these terms, please do not use our platform.
                </p>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">2. Services Description</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">
                  YouLink is a collaborative freelance services ecosystem that connects clients with verified, 
                  supervisor-led freelancer teams. We facilitate:
                </p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li>Project matching and team allocation</li>
                  <li>Supervised project execution</li>
                  <li>Quality control and milestone tracking</li>
                  <li>Payment processing and invoicing</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">3. Client Obligations</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">As a client, you agree to:</p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li>Provide accurate project requirements and specifications</li>
                  <li>Make timely payments as per the agreed schedule</li>
                  <li>Provide feedback within reasonable timeframes</li>
                  <li>Respect intellectual property rights and confidentiality</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">4. Freelancer Obligations</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">As a freelancer, you agree to:</p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li>Provide accurate information during registration</li>
                  <li>Maintain professional conduct and quality standards</li>
                  <li>Complete assigned tasks within agreed timelines</li>
                  <li>Follow supervisor guidance and project protocols</li>
                  <li>Maintain active subscription status for project eligibility</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">5. Payment Terms</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">
                  All payments are processed through secure payment gateways. Standard terms include:
                </p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li>50% advance payment to initiate projects</li>
                  <li>Remaining balance upon final delivery</li>
                  <li>Freelancer payouts based on milestone completion</li>
                  <li>Monthly subscription fees for platform access</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">6. Intellectual Property</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  Upon full payment, clients receive ownership of deliverables as specified in the service agreement. 
                  Freelancers may retain portfolio rights unless otherwise specified. YouLink retains rights to 
                  platform content and proprietary systems.
                </p>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">7. Limitation of Liability</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  YouLink acts as a facilitator between clients and freelancers. While we ensure quality control, 
                  we are not liable for direct damages exceeding the project value. Service agreements define 
                  specific liability terms for each engagement.
                </p>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">8. Changes to Terms</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  We reserve the right to modify these terms at any time. Users will be notified of significant 
                  changes via email or platform notification. Continued use after changes constitutes acceptance.
                </p>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">9. Contact</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  For questions about these Terms, please contact us through our enquiry form or at the 
                  contact information provided on our website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
