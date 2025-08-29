-- Profiles tablosuna theme kolonu ekle
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS theme text DEFAULT 'system';

-- Profile trigger fonksiyonunu güncelle
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, language, theme)
  VALUES (
    new.id, 
    new.raw_user_meta_data ->> 'full_name',
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'language', 'tr'),
    'system'
  );
  RETURN new;
END;
$$;