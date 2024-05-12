'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import type { DataTableExpandedRows } from 'primereact/datatable';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';

import type { Checkpoint } from '@/lib/services /CheckpointService';
import { CheckpointService } from '@/lib/services /CheckpointService';
import type { HumanBackRequest } from '@/lib/services /HumanRequestService';
import { HumanRequestService } from '@/lib/services /HumanRequestService';

export default function Page({ params }: { params: { id: number } }) {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [expandedRows, setExpandedRows] = useState<
    any[] | DataTableExpandedRows
  >([]);
  const router = useRouter();

  const [selectedRequest, setSelectedRequest] =
    useState<HumanBackRequest | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('auth-tokens-development');
      if (!token) {
        router.push('/login');
      }
    };

    const fetchCheckpointsAndRequests = async () => {
      await checkLoginStatus();
      const checkpointData = await CheckpointService.getCheckpointsByRouteId({
        routeId: params.id
      });
      const checkpointsWithRequests = await Promise.all(
        checkpointData.data.map(async checkpoint => {
          const humanRequests = await HumanRequestService.getRequests({
            id: checkpoint.region.id
          });
          return { ...checkpoint, human_requests: humanRequests.data };
        })
      );
      setCheckpoints(checkpointsWithRequests);
    };

    fetchCheckpointsAndRequests();
  }, [router, params.id]);

  const containerStyle = {
    width: '200px',
    height: '200px'
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API || ''
  });
  const handleButtonDialogClick = (id: number) => {
    setDialogVisible(false);
    HumanRequestService.closeRequest({ id });
    router.refresh();
  };
  const dialogContent = selectedRequest ? (
    <div className="grid">
      <div className="m-3">
        <img
          src={selectedRequest.photo}
          alt="Фото людини"
          style={{ width: '200px', height: '200px' }}
        />
      </div>
      <div className="m-3">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: selectedRequest.last_location_latitude,
              lng: selectedRequest.last_location_longitude
            }}
            options={{
              zoomControl: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              draggable: false,
              streetViewControl: false,
              mapTypeControl: false
            }}
            zoom={10}
          >
            <Marker
              position={{
                lat: selectedRequest.last_location_latitude,
                lng: selectedRequest.last_location_longitude
              }}
            />
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
      <div className="flex-column align-itmes-start m-1 mb-3 flex text-start">
        <div className="mb-3">
          <strong>ПІБ:</strong> {selectedRequest.last_name}{' '}
          {selectedRequest.first_name} {selectedRequest.surname}
        </div>
        <div className="mb-3">
          <strong>Номер телефону:</strong> {selectedRequest.phone_number}
        </div>
        <div className="mb-3">
          <strong>Опис людини:</strong> {selectedRequest.description}
        </div>
        <div className="mb-3">
          <strong>Контактна особа:</strong> {selectedRequest.contact_last_name}{' '}
          {selectedRequest.contact_first_name} {selectedRequest.contact_surname}
        </div>
        <div className="mb-3">
          <strong>Контактна номер:</strong>{' '}
          {selectedRequest.contact_phone_number}
        </div>
        <div className="mb-3">
          <strong>Зроблені дії:</strong> {selectedRequest.completed_actions}
        </div>
        <Button
          label="Знайдений"
          onClick={() => handleButtonDialogClick(selectedRequest.id)}
        />
      </div>
    </div>
  ) : null;

  const onRowToggle = e => {
    setExpandedRows(e.data);
  };
  const openDialog = (request: HumanBackRequest) => {
    setSelectedRequest(request);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setSelectedRequest(null);
    setDialogVisible(false);
  };

  const searchBodyTemplate = (rowData: HumanBackRequest) => {
    return <Button icon="pi pi-search" onClick={() => openDialog(rowData)} />;
  };

  const rowExpansionTemplate = (data: Checkpoint) => (
    <div className="orders-subtable">
      <h5>Запити на пошук {data.region.region_name}</h5>
      <DataTable value={data.human_requests || []} responsiveLayout="scroll">
        <Column field="id" header="Id" sortable />
        <Column field="first_name" header="Імʼя" sortable />
        <Column field="last_name" header="Прізвище" sortable />
        <Column field="last_name" header="Побатькові" sortable />
        <Column field="phone_number" header="Номер телефону" sortable />
        <Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate} />
      </DataTable>
    </div>
  );

  const regionName = (rowData: Checkpoint) => (
    <Link href={rowData.google_map_url}>{rowData.region.region_name}</Link>
  );

  return (
    <div className="col-12">
      <div className="card">
        <h5>Список чекпоінтів</h5>
        <DataTable
          value={checkpoints}
          expandedRows={expandedRows}
          onRowToggle={onRowToggle}
          responsiveLayout="scroll"
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="id"
        >
          <Column expander style={{ width: '3em' }} />
          <Column field="position" header="Позиція" sortable />
          <Column header="Регіон" body={regionName} sortable />
        </DataTable>
      </div>
      <Dialog
        visible={dialogVisible}
        onHide={closeDialog}
        header="Детальна інформація"
        modal
        style={{ width: '50vw' }}
      >
        {dialogContent}
      </Dialog>
    </div>
  );
}
