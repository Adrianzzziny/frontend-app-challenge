import { create } from 'zustand';

export interface CalculatorData {
  sendAmount: string;
  sendCurrency: string;
  receiveAmount: string;
  receiveCurrency: string;
  rateCompra: number;
  rateVenta: number;
}

export interface BankAccount {
  id: string;
  alias: string;
  bankName: string;
  currency: 'PEN' | 'USD';
  accountNumber: string;
}

interface OperationState {
  calculatorData: CalculatorData | null;
  setCalculatorData: (data: CalculatorData) => void;
  savedAccounts: BankAccount[];
  addAccount: (account: BankAccount) => void;

  selectedOriginBank: string | null;
  selectedDestinationAccount: BankAccount | null;
  selectedSourceFunds: string | null;
  
  setSelections: (origin: string | null, dest: BankAccount | null, source: string | null) => void;
  clearOperation: () => void;
}

export const useOperationStore = create<OperationState>((set) => ({
  calculatorData: null,
  setCalculatorData: (data) => set({ calculatorData: data }),
  
  savedAccounts: [],
  addAccount: (account) => set((state) => ({ savedAccounts: [...state.savedAccounts, account] })),

  selectedOriginBank: null,
  selectedDestinationAccount: null,
  selectedSourceFunds: null,
  
  setSelections: (origin, dest, source) => set({ 
    selectedOriginBank: origin, 
    selectedDestinationAccount: dest, 
    selectedSourceFunds: source 
  }),

  clearOperation: () => set({ 
    calculatorData: null, 
    selectedOriginBank: null, 
    selectedDestinationAccount: null, 
    selectedSourceFunds: null 
  }),
}));