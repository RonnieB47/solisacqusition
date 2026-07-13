
CREATE TABLE public.audit_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  phone TEXT,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  other_text JSONB NOT NULL DEFAULT '{}'::jsonb,
  weakest_area TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.audit_submissions TO anon;
GRANT INSERT ON public.audit_submissions TO authenticated;
GRANT ALL ON public.audit_submissions TO service_role;

ALTER TABLE public.audit_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an audit"
  ON public.audit_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
