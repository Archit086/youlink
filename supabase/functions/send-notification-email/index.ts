import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "architsehgal8@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ClientEnquiryPayload {
  type: "client_enquiry";
  data: {
    name: string;
    organization?: string;
    email: string;
    phone: string;
    service: string;
    description: string;
    budget?: string;
    timeline?: string;
  };
}

interface FreelancerApplicationPayload {
  type: "freelancer_application";
  data: {
    full_name: string;
    email: string;
    phone: string;
    college: string;
    degree: string;
    current_year?: string;
    field: string;
    skills: string;
    portfolio_link?: string;
    experience: string;
  };
}

type EmailPayload = ClientEnquiryPayload | FreelancerApplicationPayload;

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-notification-email function");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: EmailPayload = await req.json();
    console.log("Payload received:", JSON.stringify(payload, null, 2));

    let subject: string;
    let htmlContent: string;

    if (payload.type === "client_enquiry") {
      const { data } = payload;
      subject = "New Client Project Enquiry – YouLink";
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #3b5998 100%); padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Client Project Enquiry</h1>
          </div>
          <div style="padding: 24px; background: #f8fafc; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b;">Name:</td><td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Organization:</td><td style="padding: 8px 0;">${data.organization || "Not provided"}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
            </table>
            
            <h2 style="color: #1e3a5f; margin-top: 24px;">Project Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b;">Service:</td><td style="padding: 8px 0; font-weight: bold;">${data.service}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Budget:</td><td style="padding: 8px 0;">${data.budget || "Not specified"}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Timeline:</td><td style="padding: 8px 0;">${data.timeline || "Not specified"}</td></tr>
            </table>
            
            <h3 style="color: #1e3a5f; margin-top: 24px;">Project Description</h3>
            <p style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #3b5998; margin: 0;">
              ${data.description}
            </p>
            
            <p style="color: #64748b; font-size: 12px; margin-top: 24px;">
              This enquiry was submitted via the YouLink website.
            </p>
          </div>
        </div>
      `;
    } else if (payload.type === "freelancer_application") {
      const { data } = payload;
      subject = "New Freelancer Application – YouLink";
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #3b5998 100%); padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Freelancer Application</h1>
          </div>
          <div style="padding: 24px; background: #f8fafc; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Personal Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b;">Full Name:</td><td style="padding: 8px 0; font-weight: bold;">${data.full_name}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">College/University:</td><td style="padding: 8px 0;">${data.college}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Degree/Course:</td><td style="padding: 8px 0;">${data.degree}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Current Year:</td><td style="padding: 8px 0;">${data.current_year || "Not specified"}</td></tr>
            </table>
            
            <h2 style="color: #1e3a5f; margin-top: 24px;">Professional Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b;">Field:</td><td style="padding: 8px 0; font-weight: bold;">${data.field}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Experience Level:</td><td style="padding: 8px 0;">${data.experience}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Portfolio:</td><td style="padding: 8px 0;">${data.portfolio_link ? `<a href="${data.portfolio_link}">${data.portfolio_link}</a>` : "Not provided"}</td></tr>
            </table>
            
            <h3 style="color: #1e3a5f; margin-top: 24px;">Skills & Interests</h3>
            <p style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #3b5998; margin: 0;">
              ${data.skills}
            </p>
            
            <p style="color: #64748b; font-size: 12px; margin-top: 24px;">
              This application was submitted via the YouLink website.
            </p>
          </div>
        </div>
      `;
    } else {
      throw new Error("Invalid payload type");
    }

    console.log("Sending email to:", ADMIN_EMAIL);

    // Send email using Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "YouLink <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: subject,
        html: htmlContent,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);

    if (!emailResponse.ok) {
      throw new Error(emailResult.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true, emailResult }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-notification-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
