
'use client';
import {
  Transaction,
  TransactionButton,
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
import { toast } from "@/components/ui/use-toast";

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
    toast({
      title: "Transaction Failed",
      description: err.message || "An error occurred during the transaction",
      variant: "destructive",
    });
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
    toast({
      title: "Transaction Successful",
      description: `Hash: ${response.hash?.slice(0, 10)}...`,
    });
  };

  return (
    <div className="flex w-full max-w-md">
      <Transaction
        contracts={contracts}
        className="w-full"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-md" />
        <TransactionStatus>
          <TransactionStatusLabel className="text-gray-300" />
          <TransactionStatusAction className="text-blue-500 hover:text-blue-400" />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
