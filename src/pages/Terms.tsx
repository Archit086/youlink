import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <section className="border-b border-mist/15">
        <div className="mx-auto max-w-[900px] px-5 py-12 sm:px-8 md:px-10 md:py-16">
          <p className="eyebrow text-mist opacity-50">Legal</p>
          <h1 className="display-serif mt-6" style={{ fontSize: "clamp(2.25rem, 7vw, 5rem)" }}>Terms & Conditions</h1>
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
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">1. Acceptance of Terms</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  By accessing and using YouLink's services, you agree to be bound by these Terms and Conditions. 
                  If you do not agree to these terms, please do not use our platform.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">2. Services Description</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  YouLink is a collaborative freelance services ecosystem that connects clients with verified, 
                  supervisor-led freelancer teams. We facilitate:
                </p>
                <ul className="space-y-2 list-disc pl-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  <li>Project matching and team allocation</li>
                  <li>Supervised project execution</li>
                  <li>Quality control and milestone tracking</li>
                  <li>Payment processing and invoicing</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">3. Client Obligations</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">As a client, you agree to:</p>
                <ul className="space-y-2 list-disc pl-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  <li>Provide accurate project requirements and specifications</li>
                  <li>Make timely payments as per the agreed schedule</li>
                  <li>Provide feedback within reasonable timeframes</li>
                  <li>Respect intellectual property rights and confidentiality</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">4. Freelancer Obligations</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">As a freelancer, you agree to:</p>
                <ul className="space-y-2 list-disc pl-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  <li>Provide accurate information during registration</li>
                  <li>Maintain professional conduct and quality standards</li>
                  <li>Complete assigned tasks within agreed timelines</li>
                  <li>Follow supervisor guidance and project protocols</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">5. Payment Terms</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  All payments are processed through secure payment gateways. Standard terms include:
                </p>
                <ul className="space-y-2 list-disc pl-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  <li>Client payments on the schedule set out in the service agreement</li>
                  <li>Freelancer payouts based on milestone completion</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">6. Intellectual Property</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  Upon full payment, clients receive ownership of deliverables as specified in the service agreement. 
                  Freelancers may retain portfolio rights unless otherwise specified. YouLink retains rights to 
                  platform content and proprietary systems.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">7. Limitation of Liability</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  YouLink acts as a facilitator between clients and freelancers. While we ensure quality control, 
                  we are not liable for direct damages exceeding the project value. Service agreements define 
                  specific liability terms for each engagement.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">8. Changes to Terms</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  We reserve the right to modify these terms at any time. Users will be notified of significant 
                  changes via email or platform notification. Continued use after changes constitutes acceptance.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">9. Contact</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
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
