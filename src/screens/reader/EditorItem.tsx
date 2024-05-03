import Icon from '@expo/vector-icons/Feather';
import React, { useContext, useMemo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';

import { EditorItemContainer, EditorItemTitle } from './components';
import { ReaderThemeContext } from './index';
import { Ellipse, HStack } from '../../components';
import { DefaultReaderThemes, ReaderTheme } from '../../model/Theme';
import { TitleAlign } from '../../reducers/reader/reader.state';

interface IEditorItem<T> {
  label: string;
  value: T;
  onChange(value: T): void;
}

interface IEditorSlider extends IEditorItem<number> {
  range: [number, number];
}

export function EditorSlider(props: IEditorSlider) {
  const { range, label, onChange, value } = props;
  const [start, end] = range;

  const progress = useSharedValue(value);
  const minimumValue = useSharedValue(start);
  const maximumValue = useSharedValue(end);

  const slider = (
    <Slider progress={progress} onSlidingComplete={onChange} minimumValue={minimumValue} maximumValue={maximumValue} />
  );
  return (
    <EditorItemContainer>
      <EditorItemTitle>{label}</EditorItemTitle>
      <View style={{ width: 170 }}>{slider}</View>
    </EditorItemContainer>
  );
}

type AlignOption = { iconName: React.ComponentProps<typeof Icon>['name']; type: TitleAlign };
const AlignOptions: AlignOption[] = [
  {
    type: 'flex-start',
    iconName: 'align-left',
  },
  {
    type: 'center',
    iconName: 'align-center',
  },
  {
    type: 'flex-end',
    iconName: 'align-right',
  },
];

export function AlignOptionContainer(props: IEditorItem<TitleAlign>) {
  const { label, value, onChange } = props;
  const theme = useContext(ReaderThemeContext);
  const iconStyle = useMemo(
    () => (curAlign: TitleAlign) => ({
      fontSize: 18,
      opacity: curAlign === value ? 1 : 0.3,
      color: theme.fontColor,
      paddingLeft: 20,
      paddingVertical: 5,
    }),
    [value, theme.fontColor],
  );

  return (
    <EditorItemContainer>
      <EditorItemTitle>{label}</EditorItemTitle>
      <HStack center>
        {AlignOptions.map((i) => (
          <Icon key={i.type} onPress={() => onChange(i.type)} style={iconStyle(i.type)} name={i.iconName} />
        ))}
      </HStack>
    </EditorItemContainer>
  );
}

export function ThemeOptionContainer(props: IEditorItem<ReaderTheme>) {
  const { label, onChange } = props;
  return (
    <EditorItemContainer>
      <EditorItemTitle>{label}</EditorItemTitle>
      <HStack center>
        {DefaultReaderThemes.map((i) => (
          <TouchableWithoutFeedback onPress={() => onChange(i)} key={i.name}>
            <Ellipse
              size={32}
              style={{
                backgroundColor: i.displayColor,
                marginLeft: 10,
                borderColor: 'rgba(122, 122, 122, 0.38)',
                borderWidth: 0.5,
              }}
            />
          </TouchableWithoutFeedback>
        ))}
      </HStack>
    </EditorItemContainer>
  );
}
