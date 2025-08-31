import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ethers } from 'ethers';

// Define a more specific type for EthereumProvider
type EthereumProvider = {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

interface WalletStore {
  walletConnected: boolean;
  walletAddress: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      walletConnected: false,
      walletAddress: '',
      connectWallet: async () => {
        // @ts-expect-error window.ethereum may not exist in non-browser environments
        if (typeof window === 'undefined' || !window.ethereum) {
          alert('MetaMask is not installed!');
          return;
        }
        try {
          // @ts-expect-error window.ethereum is not typed as EthereumProvider by default
          const ethProvider = window.ethereum as EthereumProvider;
          const provider = new ethers.BrowserProvider(ethProvider);
          // Request account access from MetaMask
          await ethProvider.request({ method: 'eth_requestAccounts', params: [] });
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          set({
            walletConnected: true,
            walletAddress: address,
          });
        } catch (error) {
          alert('Wallet connection failed.');
          console.error(error);
        }
      },
      disconnectWallet: () => set({
        walletConnected: false,
        walletAddress: '',
      }),
    }),
    {
      name: 'wallet-store',
      partialize: (state) => ({
        walletConnected: state.walletConnected,
        walletAddress: state.walletAddress,
      }),
    }
  )
);

export default useWalletStore;
