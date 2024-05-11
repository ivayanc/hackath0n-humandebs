import { Checkbox } from 'primereact/checkbox';

import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { addMilitary } from '@/redux/slice/humanAddInfoSlice';

export default function IsMilitary() {
  const { military } = useAppSelector(state => state.addInfo);
  const dispatch = useAppDispatch();

  const onChange = e => {
    dispatch(addMilitary(e.checked));
  };

  return (
    <div className="field-checkbox">
      <Checkbox
        inputId="military"
        checked={military} // Bind the checked state to your Redux state
        onChange={onChange} // Use the correct handler to update the state
      />
      <label htmlFor="military">Військовий</label>
    </div>
  );
}
