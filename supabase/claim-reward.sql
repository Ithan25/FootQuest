-- ============================================================
-- FootQuest — Fonction RPC pour réclamer une récompense
-- ============================================================
-- Exécuter ce script dans le SQL Editor de Supabase Dashboard
-- ============================================================

-- Ajouter les colonnes pour les récompenses in-game
ALTER TABLE utilisateur ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE utilisateur ADD COLUMN IF NOT EXISTS active_title TEXT;
ALTER TABLE utilisateur ADD COLUMN IF NOT EXISTS active_badge TEXT;

-- ─── Fonction atomique pour réclamer une récompense ───
CREATE OR REPLACE FUNCTION claim_reward(
  p_user_id UUID,
  p_reward_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_points INTEGER;
  v_reward_cost INTEGER;
  v_reward_stock INTEGER;
  v_reward_name TEXT;
  v_reward_active BOOLEAN;
  v_code TEXT;
  v_claim_id UUID;
BEGIN
  -- 1. Lock and get user points
  SELECT foot_points INTO v_user_points
  FROM utilisateur
  WHERE id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Utilisateur introuvable');
  END IF;

  -- 2. Lock and get reward details
  SELECT cout_points, stock, actif, nom
  INTO v_reward_cost, v_reward_stock, v_reward_active, v_reward_name
  FROM recompense
  WHERE id = p_reward_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Récompense introuvable');
  END IF;

  IF NOT v_reward_active THEN
    RETURN jsonb_build_object('success', false, 'error', 'Récompense indisponible');
  END IF;

  IF v_reward_stock <= 0 THEN
    RETURN jsonb_build_object('success', false, 'error', 'Stock épuisé');
  END IF;

  IF v_user_points < v_reward_cost THEN
    RETURN jsonb_build_object('success', false, 'error',
      'Il te manque ' || (v_reward_cost - v_user_points) || ' FootPoints');
  END IF;

  -- 3. Deduct points
  UPDATE utilisateur
  SET foot_points = foot_points - v_reward_cost
  WHERE id = p_user_id;

  -- 4. Decrement stock
  UPDATE recompense
  SET stock = stock - 1
  WHERE id = p_reward_id;

  -- 5. Create the claim
  INSERT INTO obtention_recompense (utilisateur_id, recompense_id)
  VALUES (p_user_id, p_reward_id)
  RETURNING id, code_unique INTO v_claim_id, v_code;

  -- 6. Auto-apply in-game rewards based on reward name
  IF v_reward_name LIKE '%Badge%' THEN
    UPDATE utilisateur SET active_badge = v_reward_name WHERE id = p_user_id;
  END IF;

  IF v_reward_name LIKE '%Titre%' THEN
    UPDATE utilisateur SET active_title = v_reward_name WHERE id = p_user_id;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'code', v_code,
    'claim_id', v_claim_id,
    'reward_name', v_reward_name,
    'new_points', v_user_points - v_reward_cost
  );
END;
$$;
