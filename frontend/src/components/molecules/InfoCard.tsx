import Icon from '@/components/atoms/Icon';
import CardCounter from '@/components/atoms/Text';
import CardLabel from '@/components/atoms/Title';

export interface InfoCardProps {
  iconName: string;
  iconColor: string;
  label: string;
  count: number;
}

export default function InfoCard({ props }: { props: InfoCardProps }) {
  return (
    <div className="col-12 lg:col-6 xl:col-4">
      <div className="card mb-0">
        <div className="justify-content-between mb-3 flex">
          <div>
            <CardLabel label={props.label} />
            <CardCounter text={props.count.toString()} />
          </div>
          <div
            className="align-items-center justify-content-center border-round flex bg-blue-100"
            style={{ width: '2.5rem', height: '2.5rem' }}
          >
            <Icon iconColor={props.iconColor} iconName={props.iconName} />
          </div>
        </div>
      </div>
    </div>
  );
}
