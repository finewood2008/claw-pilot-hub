import { supabase } from "@/integrations/supabase/client";

/**
 * Ensures user_settings record exists for the current user.
 * Called once after first login/signup.
 */
export async function seedDemoData(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  // Ensure user_settings exists
  const { data: settingsExist } = await supabase
    .from("user_settings")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (!settingsExist) {
    await supabase.from("user_settings").insert({ id: user.id });
  }

  return true;
}
