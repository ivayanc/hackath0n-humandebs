import InfoCard from '@/components/molecules/InfoCard';

export default function DashboardCards({
  closed_requests,
  active_requests,
  active_volunteers
}: {
  closed_requests: number;
  active_requests: number;
  active_volunteers: number;
}) {
  return (
    <>
      <InfoCard
        props={{
          iconName: 'pi-search-plus',
          iconColor: 'text-blue-500',
          label: 'Знайдені люди',
          count: closed_requests
        }}
      />
      <InfoCard
        props={{
          iconName: 'pi-question',
          iconColor: 'text-orange-500 bg-orange-100',
          label: 'Активні запити',
          count: active_requests
        }}
      />
      <InfoCard
        props={{
          iconName: 'pi-users',
          iconColor: 'text-green-500 bg-green-100',
          label: 'Активні волонтери',
          count: active_volunteers
        }}
      />
    </>
  );
}
