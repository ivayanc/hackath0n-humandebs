import React from 'react';

import DashboardCards from '@/components/organisms/DashboardCards';
import DashboardSection from '@/components/organisms/DashboardSection';
import StepsContent from '@/components/organisms/StepsContent';
import type { Region } from '@/lib/services /DashboardService';

const DashboardAndFormTemplate = ({
  closed_requests,
  active_volunteers,
  active_requests,
  listRegionData
}: {
  closed_requests: number;
  active_volunteers: number;
  active_requests: number;
  listRegionData: Region[];
}) => {
  return (
    <div className="grid">
      <DashboardCards
        active_requests={active_requests}
        closed_requests={closed_requests}
        active_volunteers={active_volunteers}
      />
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
