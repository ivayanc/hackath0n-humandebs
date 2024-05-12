import React from 'react';

import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import type { Region } from '@/lib/services /DashboardService';

export default function RegionTable({ data }: { data: Region[] }) {
  return (
    <div className="card">
      <div className="justify-content-between align-items-center mb-5 flex">
        <h5>Статистика по регіонах</h5>
      </div>
      <ul className="m-0 list-none p-0">
        {data.map(item => (
          <li
            key={item.region_name}
            className="flex-column md:align-items-center md:justify-content-between mb-4 flex md:flex-row"
          >
            <div>
              <Text text={item.region_name} />
            </div>
            <div className="align-items-center mt-2 flex md:mt-0">
              <Title label={item.open_requests.toString()} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
