-- Tighten public insert: minimal shape validation (lengths + email format)
DROP POLICY IF EXISTS "Anyone can submit a visit plan" ON public.visit_plans;
CREATE POLICY "Anyone can submit a visit plan"
  ON public.visit_plans FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 1 AND 120
    AND char_length(btrim(email)) BETWEEN 3 AND 254
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (phone IS NULL OR char_length(phone) <= 40)
    AND (planned_date IS NULL OR char_length(planned_date) <= 120)
    AND (note IS NULL OR char_length(note) <= 2000)
    AND (how_heard IS NULL OR char_length(how_heard) <= 120)
    AND (party_size IS NULL OR party_size BETWEEN 1 AND 50)
    AND (user_agent IS NULL OR char_length(user_agent) <= 500)
    AND status = 'new'
  );

-- has_role is only used inside RLS policies (server-side); revoke direct execute
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
