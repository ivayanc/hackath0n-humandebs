export default function Icon({
  iconName,
  iconColor
}: {
  iconName: string;
  iconColor: string;
}) {
  return (
    <div
      className={`align-items-center justify-content-center border-round flex ${iconColor}`}
      style={{ width: '2.5rem', height: '2.5rem' }}
    >
      <i className={`pi ${iconName} border-round text-xl`} />
    </div>
  );
}
