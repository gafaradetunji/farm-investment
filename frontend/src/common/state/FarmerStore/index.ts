import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Farmer {
  id: number;
  name: string;
  location: string;
  product: string;
  description: string;
  investmentNeeded: number;
  currentInvestment: number;
  returnPercentage: number;
  duration: number;
  minimumInvestment: number;
  image: string;
}

interface FarmerStore {
  selectedFarmer: Farmer | null;
  setSelectedFarmer: (farmer: Farmer) => void;
  clearSelectedFarmer: () => void;
}


const useFarmerStore = create<FarmerStore>()(
  persist(
    (set) => ({
      selectedFarmer: null,
      setSelectedFarmer: (farmer) => set({ selectedFarmer: farmer }),
      clearSelectedFarmer: () => set({ selectedFarmer: null }),
    }),
    {
      name: 'farmer-store',
      partialize: (state) => ({ selectedFarmer: state.selectedFarmer }),
    }
  )
);

export default useFarmerStore;
