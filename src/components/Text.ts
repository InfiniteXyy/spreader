import styled from 'styled-components/native';

type TextVariant = 'title' | 'subtitle' | 'body';

export interface IText {
  secondary?: boolean;
  variant?: TextVariant;
  bold?: boolean;
}

const styles: {
  [K in TextVariant]: { lineHeight: number; fontSize: number }
} = {
  title: {
    lineHeight: 28,
    fontSize: 20,
  },
  subtitle: {
    lineHeight: 20,
    fontSize: 16,
  },
  body: {
    lineHeight: 14,
    fontSize: 12,
  },
};

export const Text = styled.Text<IText>`
  color: ${props =>
    props.secondary ? props.theme.secondaryText : props.theme.primaryText};
  font-size: ${props => styles[props.variant || 'body'].fontSize}px;
  line-height: ${props => styles[props.variant || 'body'].lineHeight}px;
  font-weight: ${props => (props.bold ? '500' : '400')};
`;
