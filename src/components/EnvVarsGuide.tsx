
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function EnvVarsGuide() {
  const isWcMissing = !import.meta.env.VITE_WC_PROJECT_ID;
  const isCdpMissing = !import.meta.env.VITE_CDP_API_KEY;
  
  if (!isWcMissing && !isCdpMissing) return null;
  
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Missing Environment Variables</AlertTitle>
      <AlertDescription>
        <p className="mb-2">To use all features of this app, you need to set up the following environment variables:</p>
        <ul className="list-disc pl-5">
          {isWcMissing && (
            <li className="mb-1">
              <strong>VITE_WC_PROJECT_ID</strong>: Get from <a href="https://cloud.walletconnect.com" target="_blank" rel="noreferrer" className="underline">WalletConnect Cloud</a>
            </li>
          )}
          {isCdpMissing && (
            <li>
              <strong>VITE_CDP_API_KEY</strong>: Get from <a href="https://portal.cdp.coinbase.com/products/onchainkit" target="_blank" rel="noreferrer" className="underline">Coinbase Developer Portal</a>
            </li>
          )}
        </ul>
        <p className="mt-2">
          Create a .env.local file in the project root with these variables.
        </p>
      </AlertDescription>
    </Alert>
  );
}
