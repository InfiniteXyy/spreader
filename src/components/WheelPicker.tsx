import { Picker, PickerProps } from '@react-native-picker/picker';
import React, { useContext } from 'react';
import { Platform, View, Text } from 'react-native';
import WheelPicker from 'react-native-wheel-scrollview-picker';
import { ThemeContext } from 'styled-components/native';

interface IScrollPicker extends PickerProps {
  selectedValue: number;
  data: { label: string; value: number }[];
  mapValueToIndex(value: number): number;
}

export function ScrollPicker(props: IScrollPicker) {
  const theme = useContext(ThemeContext);
  return Platform.select({
    ios: (
      <Picker selectedValue={props.selectedValue} onValueChange={props.onValueChange}>
        {props.data.map((i) => {
          return <Picker.Item color={theme?.primaryText} key={i.value} label={i.label} value={i.value} />;
        })}
      </Picker>
    ),
    default: (
      <View style={{ justifyContent: 'center', paddingVertical: 20, height: 200 }}>
        <WheelPicker
          selectedIndex={props.selectedValue}
          dataSource={props.data.map((i) => i.label)}
          wrapperBackground="#00000000"
          highlightColor={theme?.primaryColor}
          renderItem={(label, index, isSelected) => (
            <Text style={{ color: isSelected ? theme?.primaryText : theme?.secondaryText }}>{label}</Text>
          )}
          onValueChange={(label) => {
            const index = props.data.findIndex((i) => i.label === label);
            if (props.onValueChange) {
              props.onValueChange(props.data[index].value, index);
            }
          }}
        />
      </View>
    ),
  });
}
