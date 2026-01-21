import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Users, Shield, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

const benefits = [
  { icon: Users, text: "Verified, supervisor-led teams" },
  { icon: Shield, text: "Legal-backed service agreements" },
  { icon: Clock, text: "Milestone-based transparent delivery" },
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
        <section className="section-padding bg-subtle-gradient min-h-[60vh] flex items-center">
          <div className="container-narrow mx-auto text-center">
            <div className="card-elevated p-12 max-w-xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-3xl font-bold font-display mb-4">Thank You!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Thanks, we've received your details. Our team will review and get back to you shortly.
              </p>
              <p className="text-sm text-muted-foreground">
                You can expect to hear from us within 24-48 hours.
              </p>
              <Button 
                variant="outline" 
                className="mt-8"
                onClick={() => setIsSubmitted(false)}
              >
                Submit Another Enquiry
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-subtle-gradient relative">
        <div className="absolute inset-0 bg-mesh" />
        <div className="container-wide mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Info */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
                Hire a <span className="text-gradient-hero">Team</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Tell us about your project and we'll match you with the perfect supervisor-led team 
                to bring your vision to life.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-card">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <div className="card-elevated p-6">
                <h3 className="font-semibold mb-3">What Happens Next?</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-primary">1.</span>
                    <span>We review your requirements within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-primary">2.</span>
                    <span>Schedule a call to discuss details if needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-primary">3.</span>
                    <span>Receive a detailed proposal with team allocation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-primary">4.</span>
                    <span>Sign agreement and kick off your project</span>
                  </li>
                </ol>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Payment Note:</strong> Client payments are handled after requirement finalization. No upfront online payment required at this stage.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="card-elevated p-8 lg:p-10">
              <h2 className="text-2xl font-bold font-display mb-6">Project Enquiry</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
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
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Required *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => handleSelectChange("service", value)}
                    required
                  >
                    <SelectTrigger>
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
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => handleSelectChange("budget", value)}
                    >
                      <SelectTrigger>
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
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => handleSelectChange("timeline", value)}
                    >
                      <SelectTrigger>
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

                <p className="text-xs text-muted-foreground">
                  Your data will be used only for project coordination within YouLink. 
                  We respect your privacy.
                </p>

                <Button 
                  type="submit" 
                  variant="action" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Submit Enquiry
                      <Send size={18} />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Hire;
