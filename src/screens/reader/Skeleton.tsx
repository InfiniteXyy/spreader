import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import React from 'react';

export function Skeleton() {
  return (
    <Placeholder Animation={Fade} style={{ marginTop: 20 }}>
      <PlaceholderLine height={20} width={75} />
      <PlaceholderLine height={20} />
      <PlaceholderLine height={20} width={70} />
      <PlaceholderLine height={20} width={80} />
      <PlaceholderLine height={20} style={{ marginTop: 20 }} />
      <PlaceholderLine height={20} width={60} />
      <PlaceholderLine height={20} width={80} />
      <PlaceholderLine height={20} width={80} />
    </Placeholder>
  );
}
