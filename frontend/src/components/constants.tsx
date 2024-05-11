import HumanAddInfoForm from '@/components/organisms/Form/HumanAddInfoForm';
import HumanBaseInfoForm from '@/components/organisms/Form/HumanBaseInfoForm';
import HumanContactInfoForm from '@/components/organisms/Form/HumanContactInfoForm';
import HumanSearchDoneThingsForm from '@/components/organisms/Form/HumanSearchDoneThingsForm';
import HumanSearchSummary from '@/components/organisms/HumanSearchSummary';
import { Steps } from '@/redux/slice/stepSlice';

const STEPS = [
  {
    number: 1,
    name: Steps.BASE,
    text: 'Your info',
    tab: <HumanBaseInfoForm />
  },
  {
    number: 2,
    name: Steps.ADDITIONAL,
    text: 'Select plan',
    tab: <HumanAddInfoForm />
  },
  {
    number: 3,
    name: Steps.SEARCH_DONE_THINGS,
    text: 'Add-ons',
    tab: <HumanSearchDoneThingsForm />
  },
  {
    number: 4,
    name: Steps.CONTACT,
    text: 'Summary',
    tab: <HumanContactInfoForm />
  },
  {
    number: 5,
    name: Steps.SUMMARY,
    text: 'Summary',
    tab: <HumanSearchSummary />
  }
];

export default STEPS;
