export default function Icon({
  iconName,
  iconColor
}: {
  iconName: string;
  iconColor: string;
}) {
  return <i className={`pi ${iconName} text-xl ${iconColor}`} />;
}
