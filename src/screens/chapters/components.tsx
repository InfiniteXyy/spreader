import styled from 'styled-components/native';
import { HStack, Text } from '../../components';

export const BannerContainer = styled.View`
  padding: 0 20px;
`;

export const BannerImg = styled.Image`
  height: 140px;
  width: 100px;
  border-radius: 4px;
  margin-right: 20px;
`;

export const BannerTitle = styled(Text).attrs({
  variant: 'title',
})``;
export const BannerSubtitle = styled(Text).attrs({
  variant: 'subtitle',
})``;

export const ChapterPickerContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => props.theme.bgColor};
`;

export const ChapterPickerDropDown = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => props.theme.bgColor};
`;
