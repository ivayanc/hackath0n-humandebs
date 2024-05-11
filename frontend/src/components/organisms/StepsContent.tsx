import STEPS from '@/components/constants';
import { useAppSelector } from '@/hooks/useApp';

const StepsContent = () => {
  const { activeStep } = useAppSelector(step => step.steps);

  return STEPS.filter(step => step.name === activeStep)[0].tab;
};

export default StepsContent;
