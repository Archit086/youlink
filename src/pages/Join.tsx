import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Send, GraduationCap, Briefcase, Users, Wallet } from "lucide-react";

const fieldOptions = [
  "Creative & Design",
  "Technical / IT / Development",
  "Content & Branding",
  "Media & Marketing",
  "Research & Academic",
  "Other",
];

const experienceLevels = [
  "Beginner (0-1 years)",
  "Intermediate (1-3 years)",
  "Advanced (3+ years)",
];

const benefits = [
  { icon: Users, title: "Supervised Projects", description: "Work under experienced supervisors" },
  { icon: GraduationCap, title: "Mentorship", description: "Continuous feedback & skill growth" },
  { icon: Wallet, title: "Fair Payouts", description: "Milestone-based payments" },
  { icon: Briefcase, title: "Real Projects", description: "Work on actual client projects" },
];

const Join = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-hero-gradient text-primary-foreground">
        <div className="container-wide mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
              Join as a Freelancer
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Be part of our verified freelancer network. Work on supervised projects, 
              receive mentorship, and earn fairly — all while growing your skills.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <benefit.icon className="w-6 h-6 mb-2" />
                  <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
                  <p className="text-xs text-primary-foreground/70">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="card-elevated p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-display mb-2">Freelancer Application</h2>
              <p className="text-muted-foreground">
                Fill out the form below to apply. All fields marked with * are required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold font-display mb-4 pb-2 border-b border-border">
                  Personal Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
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
                  <div className="space-y-2">
                    <Label htmlFor="college">College / University Name *</Label>
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
                    <Label htmlFor="currentYear">Current Year (Optional)</Label>
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

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold font-display mb-4 pb-2 border-b border-border">
                  Professional Information
                </h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="field">Field of Work *</Label>
                      <Select
                        value={formData.field}
                        onValueChange={(value) => handleSelectChange("field", value)}
                        required
                      >
                        <SelectTrigger>
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
                      <Label htmlFor="experience">Experience Level *</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleSelectChange("experience", value)}
                        required
                      >
                        <SelectTrigger>
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
                    <Label htmlFor="skills">Skills & Areas of Interest *</Label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="List your key skills, tools you're proficient in, and areas you want to work on..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolioLink">Portfolio Link (Optional)</Label>
                    <Input
                      id="portfolioLink"
                      name="portfolioLink"
                      type="url"
                      value={formData.portfolioLink}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com or LinkedIn URL"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload CV / Resume (PDF) *</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-accent/50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF only, max 5MB
                      </p>
                      <Input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        id="resume"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Note: File upload will be enabled once backend is connected.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription Note */}
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                <h4 className="font-semibold text-sm mb-2">Platform Subscription</h4>
                <p className="text-sm text-muted-foreground">
                  After your application is approved, you'll need to complete a ₹99/month subscription 
                  to activate your account and start receiving project assignments.
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                Your data will be used only for internal screening and project coordination within YouLink. 
                We respect your privacy.
              </p>

              <Button 
                type="submit" 
                variant="accent" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    Submit Application
                    <Send size={18} />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Join;
