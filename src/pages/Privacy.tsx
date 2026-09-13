import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <section className="border-b border-mist/15">
        <div className="mx-auto max-w-[900px] px-5 py-12 sm:px-8 md:px-10 md:py-16">
          <p className="eyebrow text-mist opacity-50">Legal</p>
          <h1 className="display-serif mt-6" style={{ fontSize: "clamp(2.25rem, 7vw, 5rem)" }}>Privacy Policy</h1>
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
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">1. Information We Collect</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  We collect information you provide directly, including:
                </p>
                <ul className="space-y-2 list-disc pl-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  <li>Personal identification (name, email, phone number)</li>
                  <li>Professional information (skills, experience, portfolio)</li>
                  <li>Educational background (for freelancer verification)</li>
                  <li>Project requirements and communications</li>
                  <li>Payment and billing information</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">2. How We Use Your Information</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">Your information is used to:</p>
                <ul className="space-y-2 list-disc pl-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  <li>Match clients with appropriate freelancer teams</li>
                  <li>Verify freelancer credentials and qualifications</li>
                  <li>Process payments</li>
                  <li>Communicate project updates and platform notifications</li>
                  <li>Improve our services and user experience</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">3. Data Sharing</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">We may share your data with:</p>
                <ul className="space-y-2 list-disc pl-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  <li>Assigned supervisors and team members (for project execution)</li>
                  <li>Payment processors (for transaction processing)</li>
                  <li>Legal authorities (when required by law)</li>
                </ul>
                <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  We do not sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">4. Data Security</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  We implement appropriate technical and organizational measures to protect your personal data 
                  against unauthorized access, alteration, disclosure, or destruction. This includes encrypted 
                  storage, secure transmission protocols, and access controls.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">5. Data Retention</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  We retain your personal data for as long as necessary to fulfill the purposes outlined in 
                  this policy, comply with legal obligations, resolve disputes, and enforce our agreements. 
                  Freelancer profiles may be retained for networking purposes unless deletion is requested.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">6. Your Rights</h2>
                <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">You have the right to:</p>
                <ul className="space-y-2 list-disc pl-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">7. Cookies</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site 
                  traffic, and personalize content. You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">8. Changes to This Policy</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
                  We may update this Privacy Policy periodically. We will notify you of any material changes 
                  by posting the new policy on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-medium leading-tight text-mist md:text-2xl">9. Contact Us</h2>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
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
