import { Picker, PickerProps } from '@react-native-picker/picker';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';

interface IScrollPicker<T extends string | number> extends PickerProps {
  selectedValue: T;
  data: { label: string; value: T }[];
  mapValueToIndex(value: T): number;
}

export function ScrollPicker<T extends string | number>(props: IScrollPicker<T>) {
  const theme = useContext(ThemeContext);
  return (
    <Picker selectedValue={props.selectedValue} onValueChange={props.onValueChange}>
      {props.data.map((i) => {
        return <Picker.Item color={theme?.primaryText} key={i.value} label={i.label} value={i.value} />;
      })}
    </Picker>
  );
}
