import { cn } from '@/lib/utils';
import { formatPrice, WheelType } from '@/store/configuratorStore';
import { Circle } from 'lucide-react';

interface WheelOptionProps {
  type: WheelType;
  label: string;
  price: number;
  selected: boolean;
  onClick: () => void;
  testId: string;
}

export function WheelOption({ type, label, price, selected, onClick, testId }: WheelOptionProps) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-lg border-2 transition-all duration-200 text-left',
        'flex items-center justify-between',
        selected
          ? 'border-primary bg-secondary'
          : 'border-border bg-card hover:border-muted-foreground'
      )}
    >
      <div className="flex items-center gap-3">
        <Circle
          className={cn(
            'w-5 h-5 transition-colors',
            selected ? 'text-primary fill-primary' : 'text-muted-foreground'
          )}
        />
        <div>
          <p className={cn('font-medium', selected ? 'text-foreground' : 'text-muted-foreground')}>
            {label}
          </p>
          <p className="text-sm text-muted-foreground capitalize">{type}</p>
        </div>
      </div>
      <span className={cn('font-medium', selected ? 'text-foreground' : 'text-muted-foreground')}>
        {price === 0 ? 'Incluso' : `+ ${formatPrice(price)}`}
      </span>
    </button>
  );
}
