import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <section className="border-b">
        <div className="cell max-w-[900px]">
          <p className="label opacity-60">Legal</p>
          <h1 className="mt-16 text-headline-30">Privacy Policy</h1>
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
                <h2 className="mb-16 text-headline-10">1. Information We Collect</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">
                  We collect information you provide directly, including:
                </p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li>Personal identification (name, email, phone number)</li>
                  <li>Professional information (skills, experience, portfolio)</li>
                  <li>Educational background (for freelancer verification)</li>
                  <li>Project requirements and communications</li>
                  <li>Payment and billing information</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">2. How We Use Your Information</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">Your information is used to:</p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li>Match clients with appropriate freelancer teams</li>
                  <li>Verify freelancer credentials and qualifications</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Communicate project updates and platform notifications</li>
                  <li>Improve our services and user experience</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">3. Data Sharing</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">We may share your data with:</p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li>Assigned supervisors and team members (for project execution)</li>
                  <li>Payment processors (for transaction processing)</li>
                  <li>Legal authorities (when required by law)</li>
                </ul>
                <p className="mt-16 max-w-prose text-body-10 opacity-70">
                  We do not sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">4. Data Security</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  We implement appropriate technical and organizational measures to protect your personal data 
                  against unauthorized access, alteration, disclosure, or destruction. This includes encrypted 
                  storage, secure transmission protocols, and access controls.
                </p>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">5. Data Retention</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  We retain your personal data for as long as necessary to fulfill the purposes outlined in 
                  this policy, comply with legal obligations, resolve disputes, and enforce our agreements. 
                  Freelancer profiles may be retained for networking purposes unless deletion is requested.
                </p>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">6. Your Rights</h2>
                <p className="mb-16 max-w-prose text-body-10 opacity-70">You have the right to:</p>
                <ul className="max-w-prose space-y-8 text-body-10 opacity-70">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">7. Cookies</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site 
                  traffic, and personalize content. You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">8. Changes to This Policy</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  We may update this Privacy Policy periodically. We will notify you of any material changes 
                  by posting the new policy on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="mb-16 text-headline-10">9. Contact Us</h2>
                <p className="max-w-prose text-body-10 opacity-70">
                  For privacy-related inquiries or to exercise your rights, please contact us through our 
                  enquiry form or at the contact information provided on our website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
