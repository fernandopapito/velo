import { cn } from '@/lib/utils';

interface ColorSwatchProps {
  color: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  testId: string;
}

export function ColorSwatch({ color, label, selected, onClick, testId }: ColorSwatchProps) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className="flex flex-col items-center gap-2 group"
    >
      <div
        className={cn(
          'w-12 h-12 rounded-full transition-all duration-200',
          'border-2 border-border',
          'group-hover:scale-110',
          selected && 'ring-2 ring-offset-2 ring-offset-background ring-primary'
        )}
        style={{ backgroundColor: color }}
      />
      <span
        className={cn(
          'text-sm transition-colors',
          selected ? 'text-foreground font-medium' : 'text-muted-foreground'
        )}
      >
        {label}
      </span>
    </button>
  );
}
