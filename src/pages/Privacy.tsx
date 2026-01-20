import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <section className="section-padding bg-subtle-gradient">
        <div className="container-narrow mx-auto">
          <h1 className="text-4xl font-bold font-display mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="prose prose-slate max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-display mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information you provide directly, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Personal identification (name, email, phone number)</li>
                  <li>Professional information (skills, experience, portfolio)</li>
                  <li>Educational background (for freelancer verification)</li>
                  <li>Project requirements and communications</li>
                  <li>Payment and billing information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Your information is used to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Match clients with appropriate freelancer teams</li>
                  <li>Verify freelancer credentials and qualifications</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Communicate project updates and platform notifications</li>
                  <li>Improve our services and user experience</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">3. Data Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We may share your data with:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Assigned supervisors and team members (for project execution)</li>
                  <li>Payment processors (for transaction processing)</li>
                  <li>Legal authorities (when required by law)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal data 
                  against unauthorized access, alteration, disclosure, or destruction. This includes encrypted 
                  storage, secure transmission protocols, and access controls.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">5. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal data for as long as necessary to fulfill the purposes outlined in 
                  this policy, comply with legal obligations, resolve disputes, and enforce our agreements. 
                  Freelancer profiles may be retained for networking purposes unless deletion is requested.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">7. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site 
                  traffic, and personalize content. You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">8. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy periodically. We will notify you of any material changes 
                  by posting the new policy on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
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
