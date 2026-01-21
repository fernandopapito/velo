import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ExteriorColor = 'glacier-blue' | 'midnight-black' | 'lunar-white';
export type InteriorColor = 'carbon-black' | 'deep-blue';
export type WheelType = 'aero' | 'sport';
export type WheelSize = '18' | '20';
export type OptionalFeature = 'precision-park' | 'flux-capacitor';

export interface CarConfiguration {
  exteriorColor: ExteriorColor;
  interiorColor: InteriorColor;
  wheelType: WheelType;
  optionals: OptionalFeature[];
}

export interface Order {
  id: string;
  configuration: CarConfiguration;
  totalPrice: number;
  customer: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    cpf: string;
    store: string;
  };
  paymentMethod: 'avista' | 'financiamento';
  installmentValue?: number;
  status: 'APROVADO' | 'REPROVADO' | 'EM_ANALISE';
  createdAt: string;
}

export type ViewMode = 'exterior' | 'interior';

interface ConfiguratorState {
  configuration: CarConfiguration;
  viewMode: ViewMode;
  orders: Order[];
  currentUserEmail: string | null;
  setExteriorColor: (color: ExteriorColor) => void;
  setInteriorColor: (color: InteriorColor) => void;
  setWheelType: (type: WheelType) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleOptional: (optional: OptionalFeature) => void;
  addOrder: (order: Order) => void;
  login: (email: string) => boolean;
  logout: () => void;
  getUserOrders: () => Order[];
  resetConfiguration: () => void;
}

const BASE_PRICE = 40000;
const SPORT_WHEELS_PRICE = 2000;
const PRECISION_PARK_PRICE = 5500;
const FLUX_CAPACITOR_PRICE = 5000;

export const OPTIONAL_PRICES: Record<OptionalFeature, number> = {
  'precision-park': PRECISION_PARK_PRICE,
  'flux-capacitor': FLUX_CAPACITOR_PRICE,
};

export const OPTIONAL_LABELS: Record<OptionalFeature, string> = {
  'precision-park': 'Precision Park',
  'flux-capacitor': 'Flux Capacitor',
};

export const calculateTotalPrice = (config: CarConfiguration): number => {
  let total = BASE_PRICE;
  if (config.wheelType === 'sport') {
    total += SPORT_WHEELS_PRICE;
  }
  const optionals = Array.isArray(config.optionals) ? config.optionals : [];
  optionals.forEach((opt) => {
    const price = (OPTIONAL_PRICES as Record<string, number | undefined>)[opt as unknown as string];
    if (typeof price === 'number') {
      total += price;
    }
  });
  return total;
};

export const calculateInstallment = (total: number): number => {
  // 12x with 2% monthly compound interest
  const monthlyRate = 0.02;
  const months = 12;
  const installment = (total * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(installment * 100) / 100;
};

export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    (set, get) => ({
      configuration: {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: [],
      },
      viewMode: 'exterior' as ViewMode,
      orders: [],
      currentUserEmail: null,
      
      setExteriorColor: (color) =>
        set((state) => ({
          configuration: { ...state.configuration, exteriorColor: color },
          viewMode: 'exterior',
        })),
      
      setInteriorColor: (color) =>
        set((state) => ({
          configuration: { ...state.configuration, interiorColor: color },
          viewMode: 'interior',
        })),
      
      setWheelType: (type) =>
        set((state) => ({
          configuration: { ...state.configuration, wheelType: type },
        })),

      toggleOptional: (optional) =>
        set((state) => {
          const current = state.configuration.optionals || [];
          const newOptionals = current.includes(optional)
            ? current.filter((o) => o !== optional)
            : [...current, optional];
          return {
            configuration: { ...state.configuration, optionals: newOptionals },
          };
        }),
      
      setViewMode: (mode) => set({ viewMode: mode }),
      
      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),
      
      login: (email) => {
        const orders = get().orders;
        const hasOrders = orders.some((o) => o.customer.email === email);
        if (hasOrders) {
          set({ currentUserEmail: email });
          return true;
        }
        return false;
      },
      
      logout: () => set({ currentUserEmail: null }),
      
      getUserOrders: () => {
        const { orders, currentUserEmail } = get();
        if (!currentUserEmail) return [];
        return orders.filter((o) => o.customer.email === currentUserEmail);
      },
      
      resetConfiguration: () =>
        set({
          configuration: {
            exteriorColor: 'glacier-blue',
            interiorColor: 'carbon-black',
            wheelType: 'aero',
            optionals: [],
          },
        }),
    }),
    {
      name: 'velo-configurator-storage',
      version: 2,
      migrate: (persistedState: any) => {
        if (persistedState?.configuration) {
          const raw = persistedState.configuration.optionals;
          const optionals = Array.isArray(raw) ? raw : [];
          persistedState.configuration.optionals = optionals.filter(
            (opt: any) => typeof opt === 'string' && opt in (OPTIONAL_PRICES as Record<string, number>)
          );
        }
        return persistedState;
      },
    }
  )
);
