import React from 'react';

import DashboardCards from '@/components/organisms/DashboardCards';
import DashboardSection from '@/components/organisms/DashboardSection';
import StepsContent from '@/components/organisms/StepsContent';

const DashboardAndFormTemplate = ({ stats, listRegionData }) => {
  return (
    <div className="grid">
      <DashboardCards stats={stats} />
      <div className="col-12 xl:col-4">
        <DashboardSection listRegionData={listRegionData} />
      </div>

      <div className="col-12 xl:col-4" />
      <div className="col-12 xl:col-4">
        <StepsContent />
      </div>
    </div>
  );
};

export default DashboardAndFormTemplate;
