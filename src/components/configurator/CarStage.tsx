import { cn } from '@/lib/utils';
import { useConfiguratorStore, ExteriorColor, InteriorColor, WheelType } from '@/store/configuratorStore';

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

const INTERIOR_COLORS: Record<InteriorColor, { bg: string; accent: string; label: string }> = {
  'carbon-black': { bg: 'bg-neutral-900', accent: 'bg-neutral-700', label: 'Carbon Black' },
  'deep-blue': { bg: 'bg-blue-900', accent: 'bg-blue-700', label: 'Deep Blue' },
};

export function CarStage() {
  const { configuration, viewMode, setViewMode } = useConfiguratorStore();

  const exteriorColor = configuration?.exteriorColor || 'glacier-blue';
  const wheelType = configuration?.wheelType || 'aero';
  const interiorColor = configuration?.interiorColor || 'carbon-black';

  const currentExteriorImage = exteriorImages[exteriorColor]?.[wheelType] || glacierBlueAero;
  const interiorStyle = INTERIOR_COLORS[interiorColor] || INTERIOR_COLORS['carbon-black'];

  return (
    <div className="h-full stage-gradient flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
          Velô Motors
        </h2>
      </div>

      {/* Car Display */}
      <div className="flex-1 flex items-center justify-center relative px-8">
        {/* Car Image */}
        <div className="w-full max-w-4xl animate-scale-in">
          {viewMode === 'exterior' ? (
            <img
              key={`${exteriorColor}-${wheelType}`}
              src={currentExteriorImage}
              alt={`Velô Sprint - ${exteriorColor} with ${wheelType} wheels`}
              className="w-full h-auto object-contain animate-fade-in"
              data-testid="car-exterior-image"
            />
          ) : (
            <div
              key={interiorColor}
              className="w-full max-w-2xl mx-auto animate-fade-in"
              data-testid="car-interior-image"
            >
              <div className={cn("rounded-2xl p-8 aspect-video flex flex-col items-center justify-center", interiorStyle.bg)}>
                <div className="text-center space-y-4">
                  <div className={cn("w-24 h-24 rounded-full mx-auto", interiorStyle.accent)} />
                  <h3 className="text-2xl font-semibold text-white">{interiorStyle.label}</h3>
                  <p className="text-white/70 text-sm">Interior em couro premium</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
