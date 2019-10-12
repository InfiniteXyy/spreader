import styled from 'styled-components/native';

export const StyledContent = styled.Text`
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 10px;
  color: ${props => props.theme.primaryText};
`;

export const ReaderContainer = styled.ScrollView`
  padding: 40px 20px;
`;
