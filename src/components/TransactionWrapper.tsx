
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

// Create a custom TransactionButton that doesn't try to pass children prop
export const TransactionButton: React.FC<{
  className?: string;
  withIcon?: boolean;
  text?: React.ReactNode;
  disabled?: boolean;
}> = ({ 
  className, 
  withIcon = false, 
  text = "Transact", 
  disabled = false
}) => (
  <OnchainKitTransactionButton 
    className={`mt-0 mr-auto ml-auto w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${className}`}
    text={withIcon ? (
      <div className="flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mr-2"
        >
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 9h2" />
          <path d="M18 13h2" />
        </svg>
        {text}
      </div>
    ) : text}
    disabled={disabled}
  />
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
