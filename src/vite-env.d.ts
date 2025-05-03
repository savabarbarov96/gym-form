/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_WEBHOOK_AUTH_TOKEN: string;
  // Stripe environment variables
  readonly VITE_STRIPE_PUBLIC_KEY_TEST: string;
  readonly VITE_STRIPE_PUBLIC_KEY_LIVE: string;
  readonly VITE_STRIPE_MODE: 'live';
  readonly VITE_STRIPE_PRICE_WORKOUT_TEST: string;
  readonly VITE_STRIPE_PRICE_MEAL_TEST: string;
  readonly VITE_STRIPE_PRICE_COMBINED_TEST: string;
  readonly VITE_STRIPE_PRICE_WORKOUT_LIVE: string;
  readonly VITE_STRIPE_PRICE_MEAL_LIVE: string;
  readonly VITE_STRIPE_PRICE_COMBINED_LIVE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
