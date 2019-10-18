import styled from 'styled-components/native';

export const SettingItemContainer = styled.View`
  height: 50px;
  border-bottom-color: ${props => props.theme.dividerColor};
  border-bottom-width: 0.5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
