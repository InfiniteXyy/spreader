import { Slider, TouchableWithoutFeedback } from 'react-native';
import { TitleAlign } from '../../reducers/reader/reader.state';
import React, { useContext, useMemo } from 'react';
import { ReaderThemeContext } from './Editor';
import { Ellipse, HStack } from '../../components';
import Icon from 'react-native-vector-icons/Feather';
import { DefaultReaderThemes, ReaderTheme } from '../../model/Theme';
import { EditorItemContainer, EditorItemTitle } from './components';

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
  return (
    <EditorItemContainer>
      <EditorItemTitle>{label}</EditorItemTitle>
      <Slider
        value={value}
        onSlidingComplete={onChange}
        style={{ width: 170 }}
        minimumValue={start}
        maximumValue={end}
        minimumTrackTintColor="rgba(160,160,160,0.3)"
        maximumTrackTintColor="rgba(160,160,160,0.1)"
      />
    </EditorItemContainer>
  );
}

type AlignOption = { iconName: string; type: TitleAlign };
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
        {AlignOptions.map(i => (
          <Icon key={i.type} onPress={() => onChange(i.type)} style={iconStyle(i.type)} name={i.iconName} />
        ))}
      </HStack>
    </EditorItemContainer>
  );
}

export function ThemeOptionContainer(props: IEditorItem<ReaderTheme>) {
  const { label, value, onChange } = props;
  return (
    <EditorItemContainer>
      <EditorItemTitle>{label}</EditorItemTitle>
      <HStack center>
        {DefaultReaderThemes.map(i => (
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
