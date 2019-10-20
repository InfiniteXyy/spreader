import styled from 'styled-components/native';
import { HStack } from '../../components';
import Icon from 'react-native-vector-icons/Feather';

export const FeedItemContainer = styled(HStack)`
  height: 90px;
  margin-top: 20px;
  padding: 0 0 10px 0;
`;

export const FeedItemImage = styled.Image`
  width: 65px;
  height: 100%;
  border-radius: 5px;
`;

export const FeedListIcon = styled(Icon).attrs({
  size: 14,
})`
  color: ${props => props.theme.tintColor};
`;
