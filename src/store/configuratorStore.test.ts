import { describe, it, expect } from 'vitest';
import { calculateTotalPrice, calculateInstallment, formatPrice, CarConfiguration, useConfiguratorStore } from './configuratorStore';

describe('configuratorStore pure functions', () => {
  describe('calculateTotalPrice', () => {
    it('should calculate base price with aero wheels and no optionals', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: []
      };
      expect(calculateTotalPrice(config)).toBe(40000);
    });

    it('should add sport wheels price correctly', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'sport',
        optionals: []
      };
      expect(calculateTotalPrice(config)).toBe(42000);
    });

    it('should add optionals price correctly', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: ['precision-park', 'flux-capacitor']
      };
      expect(calculateTotalPrice(config)).toBe(40000 + 5500 + 5000); // Base + Precision Park + Flux Capacitor
    });
  });

  describe('calculateInstallment', () => {
    it('should calculate 12x installment with 2% monthly interest correctly', () => {
      // 40000 total -> 12x at 2% monthly
      const total = 40000;
      const installment = calculateInstallment(total);
      // Math.round(((40000 * 0.02 * Math.pow(1.02, 12)) / (Math.pow(1.02, 12) - 1)) * 100) / 100 => 3782.38
      expect(installment).toBe(3782.38);
    });
  });

  describe('formatPrice', () => {
    it('should format numbers to BRL currency string', () => {
      const formatted = formatPrice(40000);
      // To avoid issues with normal space vs non-breaking space (unicode \u00A0) in Intl.NumberFormat:
      const normalized = formatted.replace(/\u00A0/g, ' ');
      expect(normalized).toContain('R$');
      expect(normalized).toContain('40.000,00');
    });
  });
});

describe('configuratorStore actions', () => {
  it('should toggle an optional feature correctly', () => {
    // Reset state before test
    useConfiguratorStore.getState().resetConfiguration();
    
    // Initial state has no optionals
    expect(useConfiguratorStore.getState().configuration.optionals).toEqual([]);
    
    // Toggle a feature (should add it)
    useConfiguratorStore.getState().toggleOptional('precision-park');
    expect(useConfiguratorStore.getState().configuration.optionals).toContain('precision-park');
    
    // Toggle the same feature (should remove it)
    useConfiguratorStore.getState().toggleOptional('precision-park');
    expect(useConfiguratorStore.getState().configuration.optionals).not.toContain('precision-park');
  });

  it('should handle login logic depending on previous orders', () => {
    useConfiguratorStore.setState({ orders: [] });
    useConfiguratorStore.getState().logout();
    
    // Login fails if there are no orders for the email
    const loginResult1 = useConfiguratorStore.getState().login('test@example.com');
    expect(loginResult1).toBe(false);
    expect(useConfiguratorStore.getState().currentUserEmail).toBeNull();
    
    // Add a mock order
    useConfiguratorStore.setState({
      orders: [
        {
          id: '1',
          configuration: { exteriorColor: 'glacier-blue', interiorColor: 'carbon-black', wheelType: 'aero', optionals: [] },
          totalPrice: 40000,
          customer: { name: 'Test', surname: 'User', email: 'test@example.com', phone: '', cpf: '', store: '' },
          paymentMethod: 'avista',
          status: 'APROVADO',
          createdAt: new Date().toISOString()
        }
      ]
    });
    
    // Login succeeds now
    const loginResult2 = useConfiguratorStore.getState().login('test@example.com');
    expect(loginResult2).toBe(true);
    expect(useConfiguratorStore.getState().currentUserEmail).toBe('test@example.com');
  });
});
