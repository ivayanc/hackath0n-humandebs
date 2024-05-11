import type { RegionStat } from '@/components/molecules/RegionTable';
import RegionTable from '@/components/molecules/RegionTable';

export default function DashboardSection({
  listRegionData
}: {
  listRegionData: RegionStat[];
}) {
  return <RegionTable data={listRegionData} />;
}
