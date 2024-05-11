import { Checkbox } from 'primereact/checkbox';

import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { addCanBeDied } from '@/redux/slice/humanAddInfoSlice';

export default function IsCanBeDied() {
  const { canBeDied } = useAppSelector(state => state.addInfo); // Select the state from Redux store
  const dispatch = useAppDispatch();

  const onChange = e => {
    // Dispatch action to update the canBeDied status in your Redux store
    dispatch(addCanBeDied(e.checked));
  };

  return (
    <div className="field-checkbox">
      <Checkbox
        inputId="canDie"
        checked={canBeDied} // Bind the checked state to your Redux state
        onChange={onChange} // Use the correct handler to update the state
      />
      <label htmlFor="canDie">Можливо мертвий</label>
    </div>
  );
}
