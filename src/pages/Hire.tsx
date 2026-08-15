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
        <section className="border-b">
          <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
            <span className="index-number">01</span>
            <span className="label">Enquiry received</span>
          </div>

          <div className="px-12 pb-24 pt-40 lg:px-20 lg:pb-40 lg:pt-56">
            <h1 className="text-headline-40">
              <Lines lines={["Thank you.", "We'll be in touch."]} stagger={90} />
            </h1>
          </div>

          <div className="grid border-t lg:grid-cols-2">
            <div className="cell">
              <p className="max-w-prose text-body-20 opacity-70">
                Thanks, we've received your details. Our team will review and get back to you shortly —
                you can expect to hear from us within 24–48 hours.
              </p>
            </div>
            <div className="border-t lg:border-l lg:border-t-0">
              <Button variant="outline" size="cell" className="border-0" onClick={() => setIsSubmitted(false)}>
                Submit another enquiry
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="border-b">
        <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
          <span className="index-number">01</span>
          <span className="label">Start a project</span>
        </div>

        <div className="grid lg:grid-cols-12">
          {/* Left — the invitation, pinned */}
          <div className="lg:col-span-5">
            <div className="pin">
              <Reveal className="cell">
                <h1 className="text-headline-30">
                  <Lines lines={["Tell us about", "your brand."]} stagger={90} />
                </h1>
                <p className="mt-24 max-w-prose text-body-20 opacity-70">
                  Share your project and we'll match you with the right supervisor-led team to build it.
                </p>
              </Reveal>

              <Reveal className="cell border-t" delay={100}>
                <p className="label opacity-60">What happens next</p>
                <ol className="mt-20">
                  {nextSteps.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-start gap-16 border-t py-12 font-mono text-caption-20 uppercase first:border-t-0"
                    >
                      <span className="tabular-nums opacity-60">{String(index + 1).padStart(2, "0")}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal className="cell border-t" delay={160}>
                <p className="label opacity-60">Payment note</p>
                <p className="mt-16 max-w-prose text-body-10 opacity-70">
                  Client payments are handled after requirement finalisation. No upfront online payment
                  is required at this stage.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right — the form */}
          <div className="border-t lg:col-span-7 lg:border-l lg:border-t-0">
            <div className="flex items-baseline justify-between gap-16 border-b px-12 py-14 lg:px-20">
              <span className="label">Project enquiry</span>
              <span className="label-muted">* required</span>
            </div>

            <form onSubmit={handleSubmit} className="cell space-y-24">
              <div className="grid gap-20 sm:grid-cols-2">
                <div className="space-y-8">
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
                <div className="space-y-8">
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

              <div className="grid gap-20 sm:grid-cols-2">
                <div className="space-y-8">
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
              </div>

              <div className="space-y-8">
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

              <div className="space-y-8">
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

              <div className="grid gap-20 sm:grid-cols-2">
                <div className="space-y-8">
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
                <div className="space-y-8">
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

              <p className="font-mono text-caption-10 uppercase opacity-60">
                Your data will be used only for project coordination within YouLink. We respect your
                privacy.
              </p>

              <Button type="submit" variant="default" size="cell" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Submit enquiry"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Hire;
