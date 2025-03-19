-- Enable RLS on the form_submissions table
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON form_submissions
FOR INSERT TO anon
WITH CHECK (true);

-- Create policy to allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated users to read all submissions" ON form_submissions
FOR SELECT TO authenticated
USING (true);

-- Create policy to allow authenticated users to update their own submissions
CREATE POLICY "Allow authenticated users to update their own submissions" ON form_submissions
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy to allow authenticated users to delete their own submissions
CREATE POLICY "Allow authenticated users to delete their own submissions" ON form_submissions
FOR DELETE TO authenticated
USING (true); 