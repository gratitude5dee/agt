
'use client';
import WalletWrapper from './WalletWrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[90px]"
      text="Log in"
      // Removed withWalletAggregator prop as it's not supported
    />
  );
}
