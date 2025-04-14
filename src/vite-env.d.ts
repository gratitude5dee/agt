
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_WC_PROJECT_ID: string;
  readonly VITE_CDP_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
