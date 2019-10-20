import styled from 'styled-components/native';
import { Text } from '../../components';
import Icon from 'react-native-vector-icons/Feather';

export const CardWrapper = styled.TouchableOpacity`
  padding: 10px 20px;
  flex-direction: row;
  background-color: ${props => props.theme.bgColor};
`;

export const CardTitle = styled(Text).attrs({
  bold: true,
  variant: 'subtitle',
})``;

export const CardSubTitle = styled(Text).attrs({
  secondary: true,
  variant: 'body',
})`
  margin-top: 6px;
`;

export const CoverImg = styled.Image`
  width: 55px;
  height: 80px;
  border-radius: 2px;
  margin-right: 20px;
`;

export const MoreIcon = styled(Icon)`
  color: ${props => props.theme.tintColor};
  position: absolute;
  right: -20px;
  top: -10px;
  padding: 10px 20px 20px 20px;
  font-size: 20px;
`;
