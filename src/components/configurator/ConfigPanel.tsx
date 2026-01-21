import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColorSwatch } from './ColorSwatch';
import { WheelOption } from './WheelOption';
import {
  useConfiguratorStore,
  calculateTotalPrice,
  formatPrice,
  ExteriorColor,
  WheelType,
  OptionalFeature,
  OPTIONAL_PRICES,
} from '@/store/configuratorStore';
import logo from '@/assets/brand.svg';

const exteriorColors: { id: ExteriorColor; label: string; hex: string }[] = [
  { id: 'glacier-blue', label: 'Glacier Blue', hex: '#7EC8E3' },
  { id: 'midnight-black', label: 'Midnight Black', hex: '#1a1a2e' },
  { id: 'lunar-white', label: 'Lunar White', hex: '#f8f8f8' },
];

const wheelOptions: { type: WheelType; label: string; price: number }[] = [
  { type: 'aero', label: 'Aero Wheels', price: 0 },
  { type: 'sport', label: 'Sport Wheels', price: 2000 },
];

const optionalFeatures: { id: OptionalFeature; label: string; description: string; price: number; testId: string }[] = [
  {
    id: 'precision-park',
    label: 'Precision Park',
    description: 'Sistema avançado de estacionamento totalmente autônomo, capaz de identificar vagas e realizar manobras com precisão e segurança.',
    price: OPTIONAL_PRICES['precision-park'],
    testId: 'opt-precision-park',
  },
  {
    id: 'flux-capacitor',
    label: 'Flux Capacitor',
    description: 'Estação de recarga doméstica de alta performance, projetada para oferecer carregamento ultra-rápido, eficiente e seguro.',
    price: OPTIONAL_PRICES['flux-capacitor'],
    testId: 'opt-flux-capacitor',
  },  
];

export function ConfigPanel() {
  const navigate = useNavigate();
  const {
    configuration,
    setExteriorColor,
    setWheelType,
    toggleOptional,
  } = useConfiguratorStore();

  const totalPrice = calculateTotalPrice(configuration);

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-6 border-b border-border flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Configure seu</p>
          <h1 className="text-3xl font-display font-semibold text-foreground mt-1">Velô Sprint</h1>
        </div>
        <Link to="/">
          <img src={logo} alt="Velô" className="h-7" />
        </Link>
      </div>

      {/* Content - All sections stacked */}
      <div className="flex-1 p-6 overflow-y-auto space-y-8">
        {/* Cores Section */}
        <div data-testid="section-cores">
          <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Cor</h3>
          <div className="flex gap-6">
            {exteriorColors.map((color) => (
              <ColorSwatch
                key={color.id}
                color={color.hex}
                label={color.label}
                selected={configuration.exteriorColor === color.id}
                onClick={() => setExteriorColor(color.id)}
                testId={`color-option-${color.id}`}
              />
            ))}
          </div>
        </div>

        {/* Rodas Section */}
        <div data-testid="section-rodas" className="space-y-3">
          <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Rodas</h3>
          {wheelOptions.map((wheel) => (
            <WheelOption
              key={wheel.type}
              type={wheel.type}
              label={wheel.label}
              price={wheel.price}
              selected={configuration.wheelType === wheel.type}
              onClick={() => setWheelType(wheel.type)}
              testId={`wheel-option-${wheel.type}`}
            />
          ))}
        </div>

        {/* Opcionais Section */}
        <div data-testid="section-opcionais" className="space-y-3">
          <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Opcionais</h3>
          {optionalFeatures.map((opt) => (
            <label
              key={opt.id}
              className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
            >
              <Checkbox
                data-testid={opt.testId}
                checked={(configuration.optionals || []).includes(opt.id)}
                onCheckedChange={() => toggleOptional(opt.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{opt.label}</span>
                  <span className="text-sm font-medium text-primary">+ {formatPrice(opt.price)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Footer with Price */}
      <div className="p-6 border-t border-border bg-secondary/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Preço de Venda</span>
          <span
            data-testid="total-price"
            className="text-2xl font-display font-semibold text-foreground"
          >
            {formatPrice(totalPrice)}
          </span>
        </div>
        <Button
          data-testid="checkout-button"
          onClick={() => navigate('/order')}
          className="w-full h-12 text-base font-medium"
        >
          Monte o Seu
        </Button>
      </div>
    </div>
  );
}
