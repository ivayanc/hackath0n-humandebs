'use client';

import { useRouter } from 'next/navigation';
import { DataView } from 'primereact/dataview';
import type { DropdownChangeEvent } from 'primereact/dropdown';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';

import type { Route } from '@/lib/services /RouteService';
import { RouteService } from '@/lib/services /RouteService';
import formatDate from '@/utils/format-date';

export default function RouteList() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState<Route[] | null>(null);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState<0 | 1 | -1 | null>(null);
  const [sortField, setSortField] = useState('');

  const router = useRouter();
  const sortOptions = [
    { label: 'Від найдовших', value: '!route_time' },
    { label: 'Від найкоротших', value: 'route_time' }
  ];

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('auth-tokens-development');
      if (!token) {
        router.push('/login');
      }
    };

    checkLoginStatus().then();
  }, [router]);
  useEffect(() => {
    RouteService.getAllRoutes().then(data => setRoutes(data.data));
    setGlobalFilterValue('');
  }, []);

  const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setGlobalFilterValue(value);
    if (value.length === 0) {
      setFilteredRoutes(null);
    } else {
      const filtered = routes?.filter(route => {
        const locationName = route.route_location.toLowerCase();
        const searchValueLowercase = value.toLowerCase();
        return locationName.includes(searchValueLowercase);
      });

      setFilteredRoutes(filtered);
    }
  };

  const onSortChange = (event: DropdownChangeEvent) => {
    const { value } = event;

    if (value.indexOf('!') === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const dataViewHeader = (
    <div className="flex-column md:justify-content-between flex gap-2 md:flex-row">
      <Dropdown
        value={sortKey}
        options={sortOptions}
        optionLabel="label"
        placeholder="Sort By Price"
        onChange={onSortChange}
      />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onFilter}
          placeholder="Search by Name"
        />
      </span>
    </div>
  );

  const dataviewGridItem = (data: Route) => {
    return (
      <div className="col-12 lg:col-4">
        <div className="card border-1 surface-border m-3">
          <div className="flex-column align-items-center mb-3 flex text-center">
            <div className="text-2xl font-bold">{data.route_location}</div>
          </div>
          <div className="align-items-center justify-content-between flex">
            <span className="text-2l">{data.route_time} год.</span>
            <span className="text-2l">{formatDate(data.created_at)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Список маршрутів</h5>
          <DataView
            value={filteredRoutes || routes}
            layout="grid"
            paginator
            rows={9}
            sortOrder={sortOrder}
            sortField={sortField}
            itemTemplate={dataviewGridItem}
            header={dataViewHeader}
          />
        </div>
      </div>
    </div>
  );
}
