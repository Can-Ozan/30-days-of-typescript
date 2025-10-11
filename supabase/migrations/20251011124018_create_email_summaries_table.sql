/*
  # Email Summaries Table

  1. New Tables
    - `email_summaries`
      - `id` (uuid, primary key)
      - `email_subject` (text) - The subject of the email
      - `email_body` (text) - The original email content
      - `summary` (text) - The AI-generated summary
      - `summary_length` (text) - The length type: short, medium, or detailed
      - `key_points` (jsonb) - Array of key points extracted from the email
      - `user_id` (uuid, nullable) - For future user authentication
      - `created_at` (timestamptz) - Timestamp of when the summary was created

  2. Security
    - Enable RLS on `email_summaries` table
    - Add policy for public read access (for demo purposes)
    - Add policy for public insert access (for demo purposes)
    - Add policy for public delete access (for demo purposes)

  3. Indexes
    - Add index on `created_at` for efficient sorting
    - Add index on `user_id` for future user-based queries
*/

CREATE TABLE IF NOT EXISTS email_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_subject text DEFAULT '',
  email_body text NOT NULL,
  summary text NOT NULL,
  summary_length text NOT NULL CHECK (summary_length IN ('short', 'medium', 'detailed')),
  key_points jsonb DEFAULT '[]'::jsonb,
  user_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON email_summaries
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON email_summaries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON email_summaries
  FOR DELETE
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS email_summaries_created_at_idx ON email_summaries(created_at DESC);
CREATE INDEX IF NOT EXISTS email_summaries_user_id_idx ON email_summaries(user_id);
