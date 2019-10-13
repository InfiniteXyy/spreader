import styled from 'styled-components/native';
import { Text } from '../../components';

export const CardWrapper = styled.TouchableOpacity`
  padding: 10px 20px;
  flex-direction: row;
`;

export const CardTitle = styled(Text).attrs({
  bold: true,
  variant: 'subtitle',
})``;

export const CardSubTitle = styled(Text).attrs({
  secondary: true,
  variant: 'body',
})``;

export const CoverImg = styled.Image`
  width: 55px;
  height: 80px;
  border-radius: 2px;
  margin-right: 20px;
`;
