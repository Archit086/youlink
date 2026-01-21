import { Link } from "react-router-dom";

const footerLinks = {
  platform: [
    { name: "How It Works", path: "/how-it-works" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/hire" },
  ],
  legal: [
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Refund Policy", path: "/refund-policy" },
  ],
  join: [
    { name: "Hire a Team", path: "/hire" },
    { name: "Join as Freelancer", path: "/join" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-hero-gradient text-white">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-xl font-bold text-accent-foreground font-display">Y</span>
              </div>
              <span className="text-xl font-bold font-display">YouLink</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Quality-controlled freelance services with supervisor-led teams.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="font-semibold mb-4">Get Started</h4>
            <ul className="space-y-3">
              {footerLinks.join.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} YouLink. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/60">
            Built with trust, delivered with excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};
