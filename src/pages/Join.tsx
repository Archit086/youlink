import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHeader, Panel, Section, pageX } from "@/components/site/Page";
import { cn } from "@/lib/utils";

const fieldOptions = [
  "Creative & Design",
  "Technical / IT / Development",
  "Content & Branding",
  "Media & Marketing",
  "Research & Academic",
  "Other",
];

const experienceLevels = ["Beginner (0-1 years)", "Intermediate (1-3 years)", "Advanced (3+ years)"];

const benefits = [
  { title: "Supervised projects", description: "Work under experienced supervisors" },
  { title: "Mentorship", description: "Continuous feedback & skill growth" },
  { title: "Fair payouts", description: "Milestone-based payments" },
  { title: "Real projects", description: "Work on actual client projects" },
];

const Join = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    currentYear: "",
    field: "",
    skills: "",
    portfolioLink: "",
    experience: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from("freelancer_applications")
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          degree: formData.degree,
          current_year: formData.currentYear || null,
          field: formData.field,
          skills: formData.skills,
          portfolio_link: formData.portfolioLink || null,
          experience: formData.experience,
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to save application");
      }

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke("send-notification-email", {
        body: {
          type: "freelancer_application",
          data: {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            college: formData.college,
            degree: formData.degree,
            current_year: formData.currentYear,
            field: formData.field,
            skills: formData.skills,
            portfolio_link: formData.portfolioLink,
            experience: formData.experience,
          },
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        // Don't throw - the form was saved, email is secondary
      }

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Thank you for applying! We'll review your profile and get back to you within 3-5 business days.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        degree: "",
        currentYear: "",
        field: "",
        skills: "",
        portfolioLink: "",
        experience: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <PageHeader
          eyebrow="01 — Application received"
          title="Thank you. We'll review and reply."
          lead="Thanks, we've received your details. Our team will review and get back to you shortly — you can expect to hear from us within 3–5 business days."
        />

        <Section>
          <FadeIn delay={0} y={30}>
            <Panel className="max-w-2xl">
              <p className="eyebrow text-[#D7E2EA] opacity-50">Next steps</p>
              <p className="mt-4 text-sm font-light leading-relaxed text-[#D7E2EA] opacity-70">
                Once approved, you'll receive an email with instructions to complete your ₹99/month
                subscription via PhonePe to activate your account.
              </p>
            </Panel>
          </FadeIn>

          <Button variant="outline" className="mt-8" onClick={() => setIsSubmitted(false)}>
            Submit another application
          </Button>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        eyebrow="01 — Join the network"
        title="Work on real client projects"
        lead="Be part of our verified freelancer network. Work on supervised projects, receive mentorship, and earn fairly — all while growing your skills."
      />

      <section className={cn(pageX, "pb-20")}>
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-12">
          {/* Left — the offer */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <FadeIn delay={0} y={30}>
              <Panel>
                <p className="eyebrow text-[#D7E2EA] opacity-50">What you get</p>
                <ul className="mt-6">
                  {benefits.map((benefit, index) => (
                    <li
                      key={benefit.title}
                      className="flex items-start gap-4 border-t border-[#D7E2EA]/15 py-4 first:border-t-0"
                    >
                      <span className="text-sm tabular-nums text-[#D7E2EA] opacity-40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-[#D7E2EA]">
                        <span className="font-medium">{benefit.title}</span>
                        <span className="ml-2 font-light opacity-60">{benefit.description}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </FadeIn>

            <FadeIn delay={0.1} y={30}>
              <Panel>
                <p className="eyebrow text-[#D7E2EA] opacity-50">
                  Platform subscription (₹99/month)
                </p>
                <p className="mt-4 text-sm font-light leading-relaxed text-[#D7E2EA] opacity-70">
                  After your application is approved, you'll need to complete a ₹99/month
                  subscription via PhonePe to activate your account and start receiving project
                  assignments.
                </p>
              </Panel>
            </FadeIn>
          </div>

          {/* Right — the application */}
          <FadeIn delay={0.15} y={30} className="lg:col-span-7">
            <Panel className="md:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow text-[#D7E2EA]">Freelancer application</p>
                <p className="eyebrow text-[#D7E2EA] opacity-40">* required</p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-10">
                <div className="space-y-6">
                  <p className="eyebrow text-[#D7E2EA] opacity-50">Personal information</p>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email ID *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        autoComplete="email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        autoComplete="tel"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="college">College / University *</Label>
                      <Input
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        placeholder="Your institution name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree / Course *</Label>
                      <Input
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        placeholder="B.Tech, BCA, MBA, etc."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentYear">Current year (optional)</Label>
                      <Input
                        id="currentYear"
                        name="currentYear"
                        value={formData.currentYear}
                        onChange={handleChange}
                        placeholder="1st, 2nd, 3rd, Final, Graduated"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 border-t border-[#D7E2EA]/15 pt-8">
                  <p className="eyebrow text-[#D7E2EA] opacity-50">Professional information</p>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="field">Field of work *</Label>
                      <Select
                        value={formData.field}
                        onValueChange={(value) => handleSelectChange("field", value)}
                        required
                      >
                        <SelectTrigger id="field">
                          <SelectValue placeholder="Select your field" />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience level *</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleSelectChange("experience", value)}
                        required
                      >
                        <SelectTrigger id="experience">
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills &amp; areas of interest *</Label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="List your key skills, tools you're proficient in, and areas you want to work on..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolioLink">Portfolio link (optional)</Label>
                    <Input
                      id="portfolioLink"
                      name="portfolioLink"
                      type="url"
                      value={formData.portfolioLink}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com or LinkedIn URL"
                    />
                    <p className="text-xs text-[#D7E2EA] opacity-50">
                      CV upload is coming soon — share your resume via the portfolio link for now.
                    </p>
                  </div>
                </div>

                <div className="space-y-6 border-t border-[#D7E2EA]/15 pt-8">
                  <p className="text-xs text-[#D7E2EA] opacity-50">
                    Your data will be used only for internal screening and project coordination
                    within YouLink. We respect your privacy.
                  </p>

                  <Button type="submit" size="cell" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Submit application"}
                  </Button>
                </div>
              </form>
            </Panel>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Join;
