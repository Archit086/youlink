import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lines, Reveal } from "@/components/site/Reveal";

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
        <section className="border-b">
          <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
            <span className="index-number">01</span>
            <span className="label">Application received</span>
          </div>

          <div className="px-12 pb-24 pt-40 lg:px-20 lg:pb-40 lg:pt-56">
            <h1 className="text-headline-40">
              <Lines lines={["Thank you.", "We'll review and reply."]} stagger={90} />
            </h1>
          </div>

          <div className="grid border-t lg:grid-cols-2">
            <div className="cell">
              <p className="max-w-prose text-body-20 opacity-70">
                Thanks, we've received your details. Our team will review and get back to you shortly —
                you can expect to hear from us within 3–5 business days.
              </p>
            </div>
            <div className="cell border-t lg:border-l lg:border-t-0">
              <p className="label opacity-60">Next steps</p>
              <p className="mt-16 max-w-prose text-body-10 opacity-70">
                Once approved, you'll receive an email with instructions to complete your ₹99/month
                subscription via PhonePe to activate your account.
              </p>
            </div>
          </div>

          <Button variant="outline" size="cell" className="border-x-0 border-b-0" onClick={() => setIsSubmitted(false)}>
            Submit another application
          </Button>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="border-b">
        <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
          <span className="index-number">01</span>
          <span className="label">Join the network</span>
        </div>

        <div className="grid lg:grid-cols-12">
          {/* Left — the offer, pinned */}
          <div className="lg:col-span-5">
            <div className="pin">
              <Reveal className="cell">
                <h1 className="text-headline-30">
                  <Lines lines={["Work on real", "client projects."]} stagger={90} />
                </h1>
                <p className="mt-24 max-w-prose text-body-20 opacity-70">
                  Be part of our verified freelancer network. Work on supervised projects, receive
                  mentorship, and earn fairly — all while growing your skills.
                </p>
              </Reveal>

              <Reveal className="cell border-t" delay={100}>
                <p className="label opacity-60">What you get</p>
                <ul className="mt-20">
                  {benefits.map((benefit, index) => (
                    <li
                      key={benefit.title}
                      className="flex items-start gap-16 border-t py-12 font-mono text-caption-20 uppercase first:border-t-0"
                    >
                      <span className="tabular-nums opacity-60">{String(index + 1).padStart(2, "0")}</span>
                      <span>
                        {benefit.title}
                        <span className="ml-8 opacity-60">{benefit.description}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="cell border-t" delay={160}>
                <p className="label opacity-60">Platform subscription (₹99/month)</p>
                <p className="mt-16 max-w-prose text-body-10 opacity-70">
                  After your application is approved, you'll need to complete a ₹99/month subscription
                  via PhonePe to activate your account and start receiving project assignments.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right — the application */}
          <div className="border-t lg:col-span-7 lg:border-l lg:border-t-0">
            <div className="flex items-baseline justify-between gap-16 border-b px-12 py-14 lg:px-20">
              <span className="label">Freelancer application</span>
              <span className="label-muted">* required</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="cell space-y-24">
                <p className="label opacity-60">Personal information</p>

                <div className="grid gap-20 sm:grid-cols-2">
                  <div className="space-y-8">
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
                  <div className="space-y-8">
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
                  <div className="space-y-8">
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
                  <div className="space-y-8">
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
                  <div className="space-y-8">
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
                  <div className="space-y-8">
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

              <div className="cell space-y-24 border-t">
                <p className="label opacity-60">Professional information</p>

                <div className="grid gap-20 sm:grid-cols-2">
                  <div className="space-y-8">
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
                  <div className="space-y-8">
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

                <div className="space-y-8">
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

                <div className="space-y-8">
                  <Label htmlFor="portfolioLink">Portfolio link (optional)</Label>
                  <Input
                    id="portfolioLink"
                    name="portfolioLink"
                    type="url"
                    value={formData.portfolioLink}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com or LinkedIn URL"
                  />
                  <p className="font-mono text-caption-10 uppercase opacity-60">
                    CV upload is coming soon — share your resume via the portfolio link for now.
                  </p>
                </div>
              </div>

              <div className="cell space-y-20 border-t">
                <p className="font-mono text-caption-10 uppercase opacity-60">
                  Your data will be used only for internal screening and project coordination within
                  YouLink. We respect your privacy.
                </p>
              </div>

              <Button type="submit" variant="default" size="cell" className="border-t" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Submit application"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Join;
