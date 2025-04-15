
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

interface TransactionButtonProps {
  onClick?: () => void;
  className?: string;
  text?: React.ReactNode;
  disabled?: boolean;
  withIcon?: boolean;
}

/**
 * A standalone transaction button that visually matches the OnchainKit TransactionButton
 * but doesn't depend on the Transaction context
 */
export const StandaloneTransactionButton: React.FC<TransactionButtonProps> = ({
  onClick,
  className = "",
  text = "Transact",
  disabled = false,
  withIcon = false,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${className}`}
    >
      {withIcon && <Wallet className="mr-2" size={20} />}
      {text}
    </Button>
  );
};
