import styled from 'styled-components/native';
import { colors } from '../theme';

type TextVariant = 'title' | 'subtitle' | 'body' | 'tip';
type TextColor = 'star' | 'pin' | 'colonel';
export interface IText {
  secondary?: boolean;
  variant?: TextVariant;
  bold?: boolean;
  colorType?: TextColor;
  color?: string;
}

const styles: { [K in TextVariant]: { lineHeight: number; fontSize: number } } = {
  title: {
    lineHeight: 28,
    fontSize: 20,
  },
  subtitle: {
    lineHeight: 20,
    fontSize: 16,
  },
  tip: {
    lineHeight: 17,
    fontSize: 14,
  },
  body: {
    lineHeight: 14,
    fontSize: 12,
  },
};

const textColors: { [K in TextColor]: string } = {
  pin: colors.warning.pin,
  star: colors.warning.star,
  colonel: colors.warning.colonel,
};

export const Text = styled.Text<IText>`
  color: ${props => {
    if (props.color) {
      return props.color;
    } else if (props.colorType) {
      return textColors[props.colorType];
    } else {
      return props.secondary ? props.theme.secondaryText : props.theme.primaryText;
    }
  }};
  font-size: ${props => styles[props.variant || 'body'].fontSize}px;
  line-height: ${props => styles[props.variant || 'body'].lineHeight}px;
  font-weight: ${props => (props.bold ? '500' : '400')};
`;
