import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';

export const SearchBarWrapper = styled(View)`
  flex: 1;
  background-color: rgba(227, 227, 227, 0.28);
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  height: 36px;
  margin: 20px 20px 16px 0;
  border-radius: 10px;
`;

export const SearchBarInput = styled(TextInput)`
  width: 100%;
  color: ${(props) => props.theme.primaryText};
`;
