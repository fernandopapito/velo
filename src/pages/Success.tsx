import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Order, formatPrice, ExteriorColor, WheelType } from '@/store/configuratorStore';

import logo from '@/assets/brand.svg';
import glacierBlueAero from '@/assets/glacier-blue-aero-wheels.png';
import glacierBlueSport from '@/assets/glacier-blue-sport-wheels.png';
import lunarWhiteAero from '@/assets/lunar-white-aero-wheels.png';
import lunarWhiteSport from '@/assets/lunar-white-sport-wheels.png';
import midnightBlackAero from '@/assets/midnight-black-aero-wheels.png';
import midnightBlackSport from '@/assets/midnight-black-sport-wheels.png';

const exteriorImages: Record<ExteriorColor, Record<WheelType, string>> = {
  'glacier-blue': {
    aero: glacierBlueAero,
    sport: glacierBlueSport,
  },
  'lunar-white': {
    aero: lunarWhiteAero,
    sport: lunarWhiteSport,
  },
  'midnight-black': {
    aero: midnightBlackAero,
    sport: midnightBlackSport,
  },
};

const colorLabels: Record<ExteriorColor, string> = {
  'glacier-blue': 'Glacier Blue',
  'lunar-white': 'Lunar White',
  'midnight-black': 'Midnight Black',
};

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order | undefined;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const isApproved = order.status === 'APROVADO';

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Link to="/" className="mb-8">
        <img src={logo} alt="Velô" className="h-8" />
      </Link>
      
      <div className="w-full max-w-2xl bg-card rounded-lg shadow-elegant-lg p-8 animate-scale-in">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {isApproved ? (
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-12 h-12 text-destructive" />
            </div>
          )}
        </div>

        {/* Status Message */}
        <div className="text-center mb-8">
          <h1
            data-testid="success-status"
            className={cn(
              'font-display text-3xl font-bold mb-2',
              isApproved ? 'text-success' : 'text-destructive'
            )}
          >
            {isApproved ? 'Pedido Aprovado!' : 'Crédito Reprovado'}
          </h1>
          <p className="text-muted-foreground">
            {isApproved
              ? 'Seu pedido foi processado com sucesso. Em breve entraremos em contato.'
              : 'Infelizmente seu crédito não foi aprovado. Tente novamente com pagamento à vista.'}
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-secondary/50 rounded-lg p-6 mb-6">
          <div className="flex gap-4 items-start">
            <div className="w-32 h-20 bg-stage rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={exteriorImages[order.configuration.exteriorColor][order.configuration.wheelType]}
                alt="Velô Sprint"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-lg">Velô Sprint</h3>
              <p className="text-sm text-muted-foreground">
                {colorLabels[order.configuration.exteriorColor]} • Interior {order.configuration.interiorColor.replace('-', ' ')} • {order.configuration.wheelType} wheels
              </p>
              <p className="mt-2 font-display font-semibold text-lg">
                {formatPrice(order.totalPrice)}
                {order.paymentMethod === 'financiamento' && (
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    (12x de {formatPrice(order.installmentValue!)})
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-4 text-sm mb-8">
          <div>
            <p className="text-muted-foreground">Número do Pedido</p>
            <p className="font-medium" data-testid="order-id">
              {order.id}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Cliente</p>
            <p className="font-medium">
              {order.customer.name} {order.customer.surname}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{order.customer.email}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Loja de Retirada</p>
            <p className="font-medium">{order.customer.store}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/lookup')}
            className="flex-1"
            data-testid="goto-consultar"
          >
            Consultar Pedido
          </Button>
          <Button onClick={() => navigate('/configure')} className="flex-1" data-testid="configure-another">
            Configurar Outro
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
