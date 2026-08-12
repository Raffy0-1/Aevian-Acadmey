import { createBrowserClient } from "@supabase/ssr";

/**
 * Create a Supabase client for use in Client Components.
 * Uses the public anon key — all security is TODO(stage-3) RLS.
 */
export function createClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  return createBrowserClient(supabaseUrl, supabaseKey);
}

