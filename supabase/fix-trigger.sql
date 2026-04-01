-- ============================================================
-- FIX: Trigger handle_new_user plus robuste
-- Exécuter dans Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Supprimer les éventuels utilisateurs orphelins dans auth.users
-- (créés lors des tentatives précédentes échouées)
-- Décommente la ligne ci-dessous si nécessaire :
-- DELETE FROM auth.users WHERE email = 'ithanos21000@gmail.com';

-- 2. Recréer la fonction avec gestion d'erreurs
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.utilisateur (id, email, pseudo)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'pseudo', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Si le pseudo existe déjà, on utilise un suffixe unique
    INSERT INTO public.utilisateur (id, email, pseudo)
    VALUES (
      NEW.id,
      NEW.email,
      split_part(NEW.email, '@', 1) || '_' || substr(NEW.id::text, 1, 4)
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
  WHEN OTHERS THEN
    RAISE LOG 'handle_new_user error: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
