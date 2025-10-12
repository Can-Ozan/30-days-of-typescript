/*
  # Email Summarizer AI Schema

  ## Overview
  This migration creates the complete database schema for an Email Summarizer AI application.
  The system allows users to store emails, generate AI summaries, and manage their email data efficiently.

  ## 1. New Tables

  ### `profiles`
  User profile information linked to Supabase auth users
  - `id` (uuid, primary key) - References auth.users
  - `email` (text) - User email address
  - `full_name` (text) - User's full name
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last profile update timestamp

  ### `emails`
  Stores email messages submitted by users
  - `id` (uuid, primary key) - Unique email identifier
  - `user_id` (uuid) - Foreign key to profiles table
  - `subject` (text) - Email subject line
  - `sender` (text) - Email sender address
  - `recipient` (text) - Email recipient address
  - `body` (text) - Full email body content
  - `received_date` (timestamptz) - When email was received
  - `created_at` (timestamptz) - When record was created
  - `updated_at` (timestamptz) - Last update timestamp

  ### `summaries`
  AI-generated summaries for emails
  - `id` (uuid, primary key) - Unique summary identifier
  - `email_id` (uuid) - Foreign key to emails table
  - `user_id` (uuid) - Foreign key to profiles table
  - `summary_text` (text) - AI-generated summary content
  - `key_points` (jsonb) - Extracted key points as JSON array
  - `sentiment` (text) - Email sentiment (positive/neutral/negative)
  - `priority` (text) - Email priority level (low/medium/high/urgent)
  - `created_at` (timestamptz) - Summary generation timestamp

  ## 2. Security
  
  ### Row Level Security (RLS)
  All tables have RLS enabled with the following policies:
  
  #### profiles table
  - Users can view their own profile
  - Users can insert their own profile during signup
  - Users can update their own profile
  
  #### emails table
  - Users can view only their own emails
  - Users can insert their own emails
  - Users can update their own emails
  - Users can delete their own emails
  
  #### summaries table
  - Users can view only their own summaries
  - Users can insert summaries for their own emails
  - Users can delete their own summaries

  ## 3. Indexes
  - Index on emails(user_id) for fast user email queries
  - Index on summaries(email_id) for fast summary lookups
  - Index on summaries(user_id) for user-specific summary queries

  ## 4. Important Notes
  - All timestamps use timestamptz for timezone awareness
  - Foreign keys ensure referential integrity
  - ON DELETE CASCADE ensures cleanup when users/emails are deleted
  - Default values set for timestamps and IDs
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create emails table
CREATE TABLE IF NOT EXISTS emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject text NOT NULL,
  sender text NOT NULL,
  recipient text NOT NULL,
  body text NOT NULL,
  received_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create summaries table
CREATE TABLE IF NOT EXISTS summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_id uuid NOT NULL REFERENCES emails(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  summary_text text NOT NULL,
  key_points jsonb DEFAULT '[]'::jsonb,
  sentiment text DEFAULT 'neutral',
  priority text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_emails_user_id ON emails(user_id);
CREATE INDEX IF NOT EXISTS idx_summaries_email_id ON summaries(email_id);
CREATE INDEX IF NOT EXISTS idx_summaries_user_id ON summaries(user_id);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Emails policies
CREATE POLICY "Users can view own emails"
  ON emails FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own emails"
  ON emails FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own emails"
  ON emails FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own emails"
  ON emails FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Summaries policies
CREATE POLICY "Users can view own summaries"
  ON summaries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own summaries"
  ON summaries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own summaries"
  ON summaries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);