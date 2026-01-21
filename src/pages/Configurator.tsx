import { CarStage } from '@/components/configurator/CarStage';
import { ConfigPanel } from '@/components/configurator/ConfigPanel';

const Configurator = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Car Stage - 70% */}
      <div className="lg:w-[70%] h-[50vh] lg:h-screen">
        <CarStage />
      </div>

      {/* Configuration Panel - 30% */}
      <div className="lg:w-[30%] h-[50vh] lg:h-screen border-l border-border">
        <ConfigPanel />
      </div>
    </div>
  );
};

export default Configurator;
