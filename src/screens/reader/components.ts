import styled from 'styled-components/native';
import { Text } from '../../components';

export const StyledContent = styled.Text`
  font-size: 18px;
  line-height: 34px;
  margin-bottom: 12px;
  color: ${props => props.theme.primaryText};
`;

export const ReaderContainer = styled.View``;

export const ReaderScroll = styled.ScrollView`
  padding: 0 20px;
`;

export const ChapterTitle = styled(Text)`
  font-size: 22px;
  line-height: 40px;
  margin: 50px 0 10px 0;
  font-weight: bold;
`;
