
'use client';
import {
  Transaction,
  TransactionButton as OnchainKitTransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import type { Address, ContractFunctionParameters } from 'viem';
import {
  BASE_SEPOLIA_CHAIN_ID,
  mintABI,
  mintContractAddress,
} from '../constants';
import React from 'react';

// Re-export TransactionButton with a specific implementation
export const TransactionButton: React.FC<React.ComponentProps<typeof OnchainKitTransactionButton> & { withIcon?: boolean }> = ({ 
  children, 
  className, 
  withIcon = false, 
  ...props 
}) => (
  <OnchainKitTransactionButton 
    className={`mt-0 mr-auto ml-auto w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </OnchainKitTransactionButton>
);

export default function TransactionWrapper({ address }: { address: Address }) {
  const contracts = [
    {
      address: mintContractAddress,
      abi: mintABI,
      functionName: 'mint',
      args: [address],
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
  };

  return (
    <div className="flex w-full">
      <Transaction
        contracts={contracts}
        className="w-full"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton className="mt-0 mr-auto ml-auto w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-4 py-3 rounded-lg shadow-lg transition-all duration-300" />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
