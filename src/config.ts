
// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  import.meta.env.DEV
    ? 'http://localhost:8080'
    : 'https://lovable-onchain-app.vercel.app';
// Add your API KEY from the Coinbase Developer Portal
export const NEXT_PUBLIC_CDP_API_KEY = import.meta.env.VITE_CDP_API_KEY;
export const NEXT_PUBLIC_WC_PROJECT_ID = import.meta.env.VITE_WC_PROJECT_ID;
