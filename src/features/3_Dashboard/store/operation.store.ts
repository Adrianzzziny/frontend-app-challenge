import { create } from 'zustand';

interface CalculatorData {
  sendAmount: string;
  sendCurrency: string;
  receiveAmount: string;
  receiveCurrency: string;
  rateCompra: number;
  rateVenta: number;
}

interface OperationState {
  calculatorData: CalculatorData | null;
  setCalculatorData: (data: CalculatorData) => void;
  clearOperation: () => void;
}

export const useOperationStore = create<OperationState>((set) => ({
  calculatorData: null,
  setCalculatorData: (data) => set({ calculatorData: data }),
  clearOperation: () => set({ calculatorData: null }),
}));