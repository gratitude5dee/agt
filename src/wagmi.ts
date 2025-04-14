
'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { toast } from "@/components/ui/use-toast";

export function useWagmiConfig() {
  const projectId = import.meta.env.VITE_WC_PROJECT_ID || '';
  
  return useMemo(() => {
    if (!projectId) {
      // Show a toast notification about the missing project ID
      toast({
        title: "WalletConnect Project ID Missing",
        description: "Some wallet connection features may be limited. Please set VITE_WC_PROJECT_ID in your environment.",
        variant: "destructive",
      });

      // Create a config with just Coinbase Wallet which doesn't require WalletConnect project ID
      const connectors = connectorsForWallets(
        [
          {
            groupName: 'Recommended Wallet',
            wallets: [coinbaseWallet],
          },
        ],
        {
          appName: 'onchainkit',
          projectId: 'DEMO', // Use a placeholder to avoid crashing
        },
      );

      return createConfig({
        chains: [base, baseSepolia],
        multiInjectedProviderDiscovery: false,
        connectors,
        ssr: true,
        transports: {
          [base.id]: http(),
          [baseSepolia.id]: http(),
        },
      });
    }

    // If project ID exists, use all wallets
    const connectors = connectorsForWallets(
      [
        {
          groupName: 'Recommended Wallet',
          wallets: [coinbaseWallet],
        },
        {
          groupName: 'Other Wallets',
          wallets: [rainbowWallet, metaMaskWallet],
        },
      ],
      {
        appName: 'onchainkit',
        projectId,
      },
    );

    return createConfig({
      chains: [base, baseSepolia],
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
      },
    });
  }, [projectId]);
}
