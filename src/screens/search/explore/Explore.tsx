import React from 'react';
import { TagList } from './TagList';
import { TrendingList } from './TrendingList';

export function Explore(props: {}) {
  return (
    <>
      <TagList />
      <TrendingList />
    </>
  );
}
