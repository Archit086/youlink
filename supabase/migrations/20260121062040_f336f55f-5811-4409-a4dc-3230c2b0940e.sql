-- Create table for client project enquiries
CREATE TABLE public.client_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  description TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for freelancer applications
CREATE TABLE public.freelancer_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  degree TEXT NOT NULL,
  current_year TEXT,
  field TEXT NOT NULL,
  skills TEXT NOT NULL,
  portfolio_link TEXT,
  experience TEXT NOT NULL,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending_review',
  subscription_status TEXT NOT NULL DEFAULT 'inactive',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.client_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelancer_applications ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for forms (no auth required)
CREATE POLICY "Anyone can submit client enquiries"
ON public.client_enquiries
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can submit freelancer applications"
ON public.freelancer_applications
FOR INSERT
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_client_enquiries_updated_at
BEFORE UPDATE ON public.client_enquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_freelancer_applications_updated_at
BEFORE UPDATE ON public.freelancer_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();