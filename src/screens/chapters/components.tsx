import styled from 'styled-components/native';
import { Text } from '../../components';
import { colors } from '../../theme';

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
  align-items: center;
  background-color: ${props => props.theme.bgColor};
  padding: 0 20px;
  border-bottom-color: ${props => props.theme.dividerColor};
  border-bottom-width: 0.5px;
`;

export const ChapterPickerDropDown = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  background-color: ${props => props.theme.bgColor};
`;

export const ChapterPickerSmallBtn = styled.TouchableOpacity`
  border-radius: 5px;
  padding: 3px 5px;
  background-color: ${props => (props.theme.dark ? '#656565' : '#cccccc')};
`;

export const ChapterPickerSmallBtnText = styled.Text`
  font-weight: 500;
  color: ${props => (props.theme.dark ? colors.secondaryTextLight : '#FFF')};
`;

export const ChapterListItemContainer = styled.TouchableOpacity`
  height: 40px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
`;

export const ChapterListItemDot = styled.View`
  height: 6px;
  width: 6px;
  background-color: ${props => props.theme.tintColor};
  border-radius: 6px;
  position: absolute;
  left: 6px;
`;
