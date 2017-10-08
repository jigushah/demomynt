import React from 'react';
import { Picker } from 'react-native';

const PickerComponent = ({selected, list, action, meta, input: { onChange, onBlur, ...restInput }}) => {
  const onValueChange = (val) => {
    if (action && typeof action === 'function') {
      onChange(val); // Sets value in vehicleReducer
      action(val)  // Sets value for formReducer
    }
  }

  const type = (restInput.name.charAt(0).toUpperCase() + restInput.name.slice(1));
  const label = `Select A ${type}`;

  return (
    <Picker
        itemStyle={{fontSize: 16, textAlign: 'center', backgroundColor: '#fff'}}
        selectedValue={restInput.value}
        onValueChange={onValueChange}>
        <Picker.Item label={label} value={''} />
        {list}
    </Picker>
  )
}

export {PickerComponent};
