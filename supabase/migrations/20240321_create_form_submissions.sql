-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  form_data JSONB
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);

-- Create index on submission_date for faster date-based queries
CREATE INDEX IF NOT EXISTS idx_form_submissions_date ON form_submissions(submission_date);

-- Add comment to the table
COMMENT ON TABLE form_submissions IS 'Stores user form submissions with their personal information and form data';

-- Add comments to columns
COMMENT ON COLUMN form_submissions.id IS 'The primary identifier for the form submission';
COMMENT ON COLUMN form_submissions.name IS 'The name of the user who submitted the form';
COMMENT ON COLUMN form_submissions.email IS 'The email address of the user who submitted the form';
COMMENT ON COLUMN form_submissions.submission_date IS 'The date and time when the form was submitted';
COMMENT ON COLUMN form_submissions.form_data IS 'The complete form data stored as JSONB'; 