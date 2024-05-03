import Icon from '@expo/vector-icons/Entypo';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';

import { Button, Text, VStack } from '../../components';

export default function (props: { onPress(): void }) {
  const theme = useContext(ThemeContext);
  return (
    <VStack center style={{ padding: 40 }}>
      <Icon name="dropbox" size={130} color={theme?.dividerColor} />
      <Text variant="subtitle" bold>
        空空如也
      </Text>
      <Text variant="tip" secondary style={{ marginVertical: 15, textAlign: 'center', lineHeight: 20 }}>
        点击"搜索栏"或者下边按钮，去添加你的第一本小说吧～
      </Text>
      <Button title="前往添加" variant="primary" onPress={props.onPress} />
    </VStack>
  );
}
