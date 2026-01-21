import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useConfiguratorStore,
  calculateTotalPrice,
  formatPrice,
  ExteriorColor,
  WheelType,
  OPTIONAL_LABELS,
  OPTIONAL_PRICES,
} from '@/store/configuratorStore';
import { createOrder } from '@/hooks/useOrders';
import { supabase } from '@/integrations/supabase/client';

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

const stores = [
  'Velô Paulista - Av. Paulista, 1000',
  'Velô Faria Lima - Av. Faria Lima, 2500',
  'Velô Morumbi - Av. Morumbi, 1500',
  'Velô Ibirapuera - Av. Ibirapuera, 3000',
];

const orderSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  surname: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
  cpf: z.string().min(14, 'CPF inválido'),
  store: z.string().min(1, 'Selecione uma loja'),
  terms: z.boolean().refine((val) => val === true, 'Aceite os termos'),
});

type FormData = z.infer<typeof orderSchema>;

const colorLabels: Record<ExteriorColor, string> = {
  'glacier-blue': 'Glacier Blue',
  'lunar-white': 'Lunar White',
  'midnight-black': 'Midnight Black',
};

const Order = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { configuration, resetConfiguration } = useConfiguratorStore();
  const [paymentMethod, setPaymentMethod] = useState<'avista' | 'financiamento'>('avista');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [entryValue, setEntryValue] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    cpf: '',
    store: '',
    terms: false,
  });

  const totalPrice = calculateTotalPrice(configuration);
  
  // Cálculo dinâmico das parcelas baseado no valor da entrada
  // Parcela = (Total - Entrada) / 12 * 1.02
  const amountToFinance = Math.max(0, totalPrice - entryValue);
  const installmentValue = (amountToFinance / 12) * 1.02;
  const totalFinanced = installmentValue * 12;

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const result = orderSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    let orderStatus: 'APROVADO' | 'REPROVADO' | 'EM_ANALISE' = 'APROVADO';

    // Análise de crédito apenas para financiamento
    if (paymentMethod === 'financiamento') {
      try {
        const { data, error } = await supabase.functions.invoke('credit-analysis', {
          body: { cpf: formData.cpf },
        });

        if (error || !data || typeof data.score !== 'number') {
          console.error('Credit analysis error:', error || 'Invalid response');
          toast({
            title: 'Erro',
            description: 'Falha ao consultar análise de crédito. Verifique seus dados ou tente mais tarde.',
            variant: 'destructive',
            // @ts-ignore - data-testid para testes
            'data-testid': 'toast-error',
          });
          setIsSubmitting(false);
          return;
        }

        const score = data.score;
        const entryPercentage = entryValue / totalPrice;

        // Regras de Decisão (Ordem de Avaliação)
        // 1️⃣ Regra da Entrada Alta: SE (Entrada >= 50% do Total) E (Score < 700) → APROVADO
        if (entryPercentage >= 0.5 && score < 700) {
          orderStatus = 'APROVADO';
        }
        // 2️⃣ Score Alto: SE Score > 700 → APROVADO
        else if (score > 700) {
          orderStatus = 'APROVADO';
        }
        // 3️⃣ Score Médio: SE Score entre 501 e 700 → EM_ANALISE
        else if (score >= 501 && score <= 700) {
          orderStatus = 'EM_ANALISE';
        }
        // 4️⃣ Score Baixo: SE Score <= 500 → REPROVADO
        else {
          orderStatus = 'REPROVADO';
        }

      } catch (err) {
        console.error('Credit analysis network error:', err);
        toast({
          title: 'Erro',
          description: 'Falha ao consultar análise de crédito. Verifique seus dados ou tente mais tarde.',
          variant: 'destructive',
          // @ts-ignore - data-testid para testes
          'data-testid': 'toast-error',
        });
        setIsSubmitting(false);
        return;
      }
    }

    const finalPrice = paymentMethod === 'financiamento' 
      ? (entryValue + totalFinanced) 
      : totalPrice;

    const optionalsSanitized = (
      (configuration.optionals as unknown as string[]).filter(
        (opt) => opt in (OPTIONAL_PRICES as Record<string, number>)
      ) as unknown as typeof configuration.optionals
    );

    const configurationForOrder = {
      ...configuration,
      optionals: optionalsSanitized,
    };

    const { order, error } = await createOrder({
      configuration: configurationForOrder,
      totalPrice: finalPrice,
      customer: {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        store: formData.store,
      },
      paymentMethod,
      status: orderStatus,
    });

    if (error || !order) {
      toast({
        title: 'Erro ao criar pedido',
        description: error || 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    // Add installment value for display
    if (paymentMethod === 'financiamento') {
      order.installmentValue = installmentValue;
    }
    order.customer.store = formData.store;

    resetConfiguration();
    navigate('/success', { state: { order } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/configure')}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-xl font-semibold">Finalizar Pedido</h1>
          </div>
          <Link to="/">
            <img src={logo} alt="Velô" className="h-7" />
          </Link>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <section className="bg-card rounded-lg p-6 shadow-elegant">
                <h2 className="font-display text-lg font-semibold mb-6">Dados Pessoais</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      data-testid="checkout-name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={cn(errors.name && 'border-destructive')}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Sobrenome</Label>
                    <Input
                      id="surname"
                      data-testid="checkout-surname"
                      value={formData.surname}
                      onChange={(e) => handleChange('surname', e.target.value)}
                      className={cn(errors.surname && 'border-destructive')}
                    />
                    {errors.surname && <p className="text-sm text-destructive">{errors.surname}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      data-testid="checkout-email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={cn(errors.email && 'border-destructive')}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <InputMask
                      mask="(99) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    >
                      {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                        <Input
                          {...inputProps}
                          id="phone"
                          data-testid="checkout-phone"
                          className={cn(errors.phone && 'border-destructive')}
                        />
                      )}
                    </InputMask>
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <InputMask
                      mask="999.999.999-99"
                      value={formData.cpf}
                      onChange={(e) => handleChange('cpf', e.target.value)}
                    >
                      {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                        <Input
                          {...inputProps}
                          id="cpf"
                          data-testid="checkout-cpf"
                          className={cn(errors.cpf && 'border-destructive')}
                        />
                      )}
                    </InputMask>
                    {errors.cpf && <p className="text-sm text-destructive">{errors.cpf}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store">Loja para Retirada</Label>
                    <Select
                      value={formData.store}
                      onValueChange={(value) => handleChange('store', value)}
                    >
                      <SelectTrigger
                        id="store"
                        data-testid="checkout-store"
                        className={cn(errors.store && 'border-destructive')}
                      >
                        <SelectValue placeholder="Selecione uma loja" />
                      </SelectTrigger>
                      <SelectContent>
                        {stores.map((store) => (
                          <SelectItem key={store} value={store}>
                            {store}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.store && <p className="text-sm text-destructive">{errors.store}</p>}
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-card rounded-lg p-6 shadow-elegant">
                <h2 className="font-display text-lg font-semibold mb-6">Forma de Pagamento</h2>
                <div className="flex gap-4">
                  <button
                    type="button"
                    data-testid="payment-avista"
                    onClick={() => setPaymentMethod('avista')}
                    className={cn(
                      'flex-1 p-4 rounded-lg border-2 transition-all duration-200 text-center',
                      paymentMethod === 'avista'
                        ? 'border-primary bg-secondary'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    <p className="font-medium">À Vista</p>
                    <p className="text-xl font-display font-semibold mt-1">
                      {formatPrice(totalPrice)}
                    </p>
                  </button>
                  <button
                    type="button"
                    data-testid="payment-financiamento"
                    onClick={() => setPaymentMethod('financiamento')}
                    className={cn(
                      'flex-1 p-4 rounded-lg border-2 transition-all duration-200 text-center',
                      paymentMethod === 'financiamento'
                        ? 'border-primary bg-secondary'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    <p className="font-medium">Financiamento</p>
                    <p className="text-xl font-display font-semibold mt-1">
                      12x de {formatPrice(installmentValue)}
                    </p>
                  </button>
                </div>

                {paymentMethod === 'financiamento' && (
                  <div className="mt-4 space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="entry-value">Valor da Entrada</Label>
                      <Input
                        id="entry-value"
                        type="number"
                        data-testid="input-entry-value"
                        min={0}
                        max={totalPrice}
                        value={entryValue || ''}
                        onChange={(e) => setEntryValue(Number(e.target.value) || 0)}
                        placeholder="R$ 0,00"
                        className="font-mono"
                      />
                      <p className="text-xs text-muted-foreground">
                        Máximo: {formatPrice(totalPrice)}
                      </p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Valor a financiar:{' '}
                        <span className="font-medium">{formatPrice(amountToFinance)}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Parcela (12x):{' '}
                        <span className="font-medium">{formatPrice(installmentValue)}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Taxa de juros: <span className="font-medium">2% a.m.</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total financiado:{' '}
                        <span className="font-medium">{formatPrice(totalFinanced)}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Juros totais:{' '}
                        <span className="font-medium">{formatPrice(totalFinanced - amountToFinance)}</span>
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Terms */}
              <section className="bg-card rounded-lg p-6 shadow-elegant">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    data-testid="checkout-terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) => handleChange('terms', checked as boolean)}
                    className={cn(errors.terms && 'border-destructive')}
                  />
                  <div>
                    <Label htmlFor="terms" className="cursor-pointer">
                      Li e aceito os{' '}
                      <Link to="/termos" className="text-accent hover:underline">
                        Termos de Uso
                      </Link>{' '}
                      e{' '}
                      <Link to="/privacidade" className="text-accent hover:underline">
                        Política de Privacidade
                      </Link>
                    </Label>
                    {errors.terms && <p className="text-sm text-destructive mt-1">{errors.terms}</p>}
                  </div>
                </div>
              </section>

              <Button
                type="submit"
                data-testid="checkout-submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Confirmar Pedido'
                )}
              </Button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 shadow-elegant sticky top-8">
              <h2 className="font-display text-lg font-semibold mb-4">Resumo</h2>
              <div className="aspect-video bg-stage rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                <img
                  src={exteriorImages[configuration.exteriorColor][configuration.wheelType]}
                  alt="Velô Sprint"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-display font-semibold text-lg">Velô Sprint</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>Cor</span>
                  <span className="text-foreground">{colorLabels[configuration.exteriorColor]}</span>
                </li>
                <li className="flex justify-between">
                  <span>Interior</span>
                  <span className="text-foreground capitalize">{configuration.interiorColor.replace('-', ' ')}</span>
                </li>
                <li className="flex justify-between">
                  <span>Rodas</span>
                  <span className="text-foreground capitalize">{configuration.wheelType} Wheels</span>
                </li>
                {(configuration.optionals as unknown as string[])
                  .filter((opt) => opt in (OPTIONAL_PRICES as Record<string, number>))
                  .map((opt) => (
                    <li key={opt} className="flex justify-between">
                      <span>{(OPTIONAL_LABELS as Record<string, string>)[opt]}</span>
                      <span className="text-foreground">
                        + {formatPrice((OPTIONAL_PRICES as Record<string, number>)[opt])}
                      </span>
                    </li>
                  ))}
              </ul>
              <div className="border-t border-border mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total</span>
                  <span
                    data-testid="summary-total-price"
                    className="text-2xl font-display font-semibold"
                  >
                    {formatPrice(paymentMethod === 'financiamento' ? totalFinanced : totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Order;
