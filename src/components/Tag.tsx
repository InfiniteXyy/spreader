import React from 'react';
import styled from 'styled-components/native';

import { colors } from '../theme';

interface ITagProps {
  title: string;
}
const TagWrapper = styled.View`
  border-radius: 2px;
  padding: 2px 3px;
  border: 0.5px solid ${(props) => (props.theme.dark ? '#eeeeee' : colors.primary.fill)};
  margin-left: 6px;
  align-items: center;
  justify-content: center;
`;

const TagText = styled.Text`
  font-size: 10px;
  color: ${(props) => (props.theme.dark ? '#eeeeee' : colors.primary.fill)};
`;

export function Tag(props: ITagProps) {
  return (
    <TagWrapper>
      <TagText>{props.title}</TagText>
    </TagWrapper>
  );
}
