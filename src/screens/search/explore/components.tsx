import { ImageBackground, View } from 'react-native';
import styled from 'styled-components/native';

export const SectionContainer = styled(View)`
  padding: 20px 0 0 0;
`;

export const TopicCardContainer = styled(ImageBackground)`
  height: 140px;
  width: 90px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;
