import styled from 'styled-components/native';
import { Text } from '../../components';

export const CardWrapper = styled.TouchableOpacity`
  padding: 10px 20px;
  flex-direction: row;
`;

export const CardTitle = styled(Text).attrs({
  bold: true,
  variant: 'title',
})``;

export const CardSubTitle = styled(Text).attrs({
  secondary: true,
  variant: 'subtitle',
})``;

export const CardBody = styled(Text).attrs({
  variant: 'body',
})``;

export const CoverImg = styled.Image`
  width: 80px;
  height: 110px;
  border-radius: 4px;
  margin-right: 20px;
`;
