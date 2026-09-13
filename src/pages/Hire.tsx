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

const serviceOptions = [
  "Creative & Design",
  "Technical / IT / Development",
  "Content & Branding",
  "Media & Marketing",
  "Research & Academic",
  "Other",
];

const budgetRanges = [
  "Under ₹10,000",
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "Above ₹1,00,000",
  "Flexible / Discuss",
];

const timelineOptions = [
  "Less than 1 week",
  "1-2 weeks",
  "2-4 weeks",
  "1-2 months",
  "3+ months",
  "Flexible",
];

const nextSteps = [
  "We review your requirements within 24 hours",
  "Schedule a call to discuss details if needed",
  "Receive a detailed proposal with team allocation",
  "Sign agreement and kick off your project",
];

const Hire = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    service: "",
    description: "",
    budget: "",
    timeline: "",
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
        .from("client_enquiries")
        .insert({
          name: formData.name,
          organization: formData.organization || null,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          description: formData.description,
          budget: formData.budget || null,
          timeline: formData.timeline || null,
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to save enquiry");
      }

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke("send-notification-email", {
        body: {
          type: "client_enquiry",
          data: formData,
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        // Don't throw - the form was saved, email is secondary
      }

      setIsSubmitted(true);
      toast({
        title: "Enquiry Submitted!",
        description: "We've received your project details. Our team will get back to you within 24-48 hours.",
      });

      setFormData({
        name: "",
        organization: "",
        email: "",
        phone: "",
        service: "",
        description: "",
        budget: "",
        timeline: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your enquiry. Please try again.",
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
          eyebrow="01 — Enquiry received"
          title="Thank you. We'll be in touch."
          lead="Thanks, we've received your details. Our team will review and get back to you shortly — you can expect to hear from us within 24–48 hours."
        />

        <Section>
          <Button variant="outline" onClick={() => setIsSubmitted(false)}>
            Submit another enquiry
          </Button>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        eyebrow="01 — Start a project"
        title="Tell us about your brand"
        lead="Share your project and we'll match you with the right supervisor-led team to build it."
      />

      <section className={cn(pageX, "pb-20")}>
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-12">
          {/* Left — the invitation */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <FadeIn delay={0} y={30}>
              <Panel>
                <p className="eyebrow text-mist opacity-50">What happens next</p>
                <ol className="mt-6">
                  {nextSteps.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-start gap-4 border-t border-mist/15 py-4 first:border-t-0"
                    >
                      <span className="text-sm tabular-nums text-mist opacity-40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-light text-mist opacity-70">{step}</span>
                    </li>
                  ))}
                </ol>
              </Panel>
            </FadeIn>

            <FadeIn delay={0.1} y={30}>
              <Panel>
                <p className="eyebrow text-mist opacity-50">Payment note</p>
                <p className="mt-4 text-sm font-light leading-relaxed text-mist opacity-70">
                  Client payments are handled after requirement finalisation. No upfront online
                  payment is required at this stage.
                </p>
              </Panel>
            </FadeIn>
          </div>

          {/* Right — the form */}
          <FadeIn delay={0.15} y={30} className="lg:col-span-7">
            <Panel className="md:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow text-mist">Project enquiry</p>
                <p className="eyebrow text-mist opacity-40">* required</p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Company or brand name"
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service required *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => handleSelectChange("service", value)}
                    required
                  >
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    rows={5}
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget range</Label>
                    <Select value={formData.budget} onValueChange={(value) => handleSelectChange("budget", value)}>
                      <SelectTrigger id="budget">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleSelectChange("timeline", value)}>
                      <SelectTrigger id="timeline">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <p className="text-xs text-mist opacity-50">
                  Your data will be used only for project coordination within YouLink. We respect your
                  privacy.
                </p>

                <Button type="submit" size="cell" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Submit enquiry"}
                </Button>
              </form>
            </Panel>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Hire;
