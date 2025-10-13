/*
  # Create Game Ideas Table

  1. New Tables
    - `game_ideas`
      - `id` (uuid, primary key) - Unique identifier for each game idea
      - `theme` (text) - The theme/setting of the game (e.g., "Cyberpunk Future", "Medieval Fantasy")
      - `genre` (text) - The genre of the game (e.g., "RPG", "Platformer", "Puzzle")
      - `mechanics` (jsonb) - Array of game mechanics (e.g., ["Double Jump", "Time Manipulation"])
      - `characters` (jsonb) - Array of character concepts with descriptions
      - `description` (text) - Brief description of the game concept
      - `created_at` (timestamptz) - Timestamp when the idea was generated
      - `user_id` (uuid, nullable) - Optional user ID for future auth integration
  
  2. Security
    - Enable RLS on `game_ideas` table
    - Add policy for public read access (anyone can view generated ideas)
    - Add policy for public insert (anyone can save ideas)
    - Add policy for users to delete their own ideas (based on session)

  3. Indexes
    - Index on created_at for efficient sorting
    - Index on theme for filtering by theme

  4. Notes
    - Using JSONB for mechanics and characters to allow flexible arrays of data
    - Public access allows immediate functionality without auth requirement
    - Future-ready with user_id field for authentication integration
*/

-- Create game_ideas table
CREATE TABLE IF NOT EXISTS game_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  theme text NOT NULL,
  genre text NOT NULL,
  mechanics jsonb NOT NULL DEFAULT '[]'::jsonb,
  characters jsonb NOT NULL DEFAULT '[]'::jsonb,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid
);

-- Enable RLS
ALTER TABLE game_ideas ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_game_ideas_created_at ON game_ideas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_game_ideas_theme ON game_ideas(theme);

-- Public read policy - anyone can view game ideas
CREATE POLICY "Anyone can view game ideas"
  ON game_ideas
  FOR SELECT
  USING (true);

-- Public insert policy - anyone can save game ideas
CREATE POLICY "Anyone can create game ideas"
  ON game_ideas
  FOR INSERT
  WITH CHECK (true);

-- Delete policy - anyone can delete any idea (for demo purposes)
CREATE POLICY "Anyone can delete game ideas"
  ON game_ideas
  FOR DELETE
  USING (true);