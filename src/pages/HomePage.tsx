
import { useAccount } from 'wagmi';
import TransactionWrapper from '@/components/TransactionWrapper';
import WalletWrapper from '@/components/WalletWrapper';

const HomePage = () => {
  const { address } = useAccount();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      
      <section className="flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-900 px-6 py-8">
        <div className="flex h-[350px] w-[400px] max-w-full items-center justify-center rounded-xl bg-[#030712]">
          <div className="rounded-xl bg-[#F3F4F6] px-4 py-[11px]">
            <p className="font-normal text-indigo-600 text-xl not-italic tracking-[-1.2px]">
              npm install @coinbase/onchainkit
            </p>
          </div>
        </div>
        {address ? (
          <TransactionWrapper address={address} />
        ) : (
          <WalletWrapper
            className="w-[400px] max-w-full"
            text="Sign in to transact"
          />
        )}
      </section>
    </div>
  );
};

export default HomePage;
