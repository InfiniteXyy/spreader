import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import React from 'react';

export function Skeleton(props: { dark: boolean }) {
  return (
    <Placeholder Animation={Fade} style={{ marginTop: 20, opacity: props.dark ? 0.1 : 0.4 }}>
      <PlaceholderLine color="#8E8E93" height={20} width={75} />
      <PlaceholderLine color="#8E8E93" height={20} />
      <PlaceholderLine color="#8E8E93" height={20} width={70} />
      <PlaceholderLine color="#8E8E93" height={20} width={80} />
      <PlaceholderLine color="#8E8E93" height={20} style={{ marginTop: 20 }} />
      <PlaceholderLine color="#8E8E93" height={20} width={60} />
      <PlaceholderLine color="#8E8E93" height={20} width={80} />
      <PlaceholderLine color="#8E8E93" height={20} width={80} />
    </Placeholder>
  );
}
