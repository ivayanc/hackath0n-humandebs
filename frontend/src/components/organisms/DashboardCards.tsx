import type { InfoCardProps } from '@/components/molecules/InfoCard';
import InfoCard from '@/components/molecules/InfoCard';

export default function DashboardCards({ stats }: { stats: InfoCardProps[] }) {
  return (
    <>
      {stats.map(item => (
        <InfoCard key={item.label} props={item} />
      ))}
    </>
  );
}
