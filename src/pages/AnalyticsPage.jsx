import Header from "../components/common/Header";
import { useState } from "react";

import OverviewCards from "../components/analytics/OverviewCards";
import EnvironmentalImpactChart from "../components/analytics/EnvironmentalImpactChart";
import SatelliteMonitoring from "../components/analytics/SatelliteMonitoring";
import MaterialUsage from "../components/analytics/MaterialUsage";
import WasteProduction from "../components/analytics/WasteProduction";
import SatelliteList from "../components/analytics/SatelliteList";

const AnalyticsPage = () => {
  const [selectedSatellite, setSelectedSatellite] = useState(null);

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
      <Header title={"Centro de Control Aeroespacial"} subtitle="Monitoreo ambiental y de satélites" />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <OverviewCards />
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          <SatelliteList 
            onSelectSatellite={setSelectedSatellite} 
            selectedSatellite={selectedSatellite}
          />
          <SatelliteMonitoring satellite={selectedSatellite} />
        </div>

        <EnvironmentalImpactChart />
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          <MaterialUsage />
          <WasteProduction />
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;