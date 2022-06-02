import { WheelPicker } from 'react-native-wheel-picker-android';
import React, { useContext } from 'react';
import { Platform, View } from 'react-native';
import { PickerIOS, PickerProps } from '@react-native-picker/picker';
import { ThemeContext } from 'styled-components/native';

interface IScrollPicker<T extends string | number> extends PickerProps {
  selectedValue: T;
  data: { label: string; value: T }[];
  mapValueToIndex(value: T): number;
}

export function ScrollPicker<T extends string | number>(props: IScrollPicker<T>) {
  const theme = useContext(ThemeContext);
  return Platform.select({
    android: (
      <View style={{ justifyContent: 'center', paddingVertical: 20 }}>
        <WheelPicker
          selectedItem={props.mapValueToIndex(props.selectedValue)}
          data={props.data.map((i) => i.label)}
          itemTextColor={theme.secondaryText}
          selectedItemTextColor={theme.primaryText}
          indicatorWidth={0.5}
          selectedItemTextSize={20}
          onItemSelected={(position: number) => {
            if (props.onValueChange) {
              props.onValueChange(props.data[position].value, position);
            }
          }}
        />
      </View>
    ),
    default: (
      <PickerIOS selectedValue={props.selectedValue} onValueChange={props.onValueChange}>
        {props.data.map((i) => {
          return <PickerIOS.Item color={theme.primaryText} key={i.value} label={i.label} value={i.value} />;
        })}
      </PickerIOS>
    ),
  });
}
