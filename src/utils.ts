export const PAGE_LENGTH = 50;
export function range(start: number, stop?: number, step?: number) {
  if (typeof stop == 'undefined') {
    stop = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  let result = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

export function getLastOf<T, R>(array: T[], pick: (t: T) => R, or: R): R {
  if (array.length === 0) return or;
  return pick(array[array.length - 1]);
}

export function getLast<T>(array: T[], or: T): T {
  if (array.length === 0) return or;
  return array[array.length - 1];
}

export const getPageTitle = (pageIndex: number, pageSize: number, maxLength: number, reversed: boolean) => {
  let [start, end] = getPageRange(pageIndex, pageSize, maxLength);
  let startIndex, endIndex;
  if (!reversed) {
    startIndex = start + 1;
    endIndex = end;
  } else {
    startIndex = end;
    endIndex = start + 1;
  }
  return `第 ${startIndex} - ${endIndex} 章`;
};

export const getPageRange = (pageIndex: number, pageSize: number, maxLength: number) => {
  return [pageIndex * pageSize, Math.min(pageIndex * pageSize + pageSize, maxLength)];
};

export function getReversedListIndex(pageIndex: number, count: number, pageSize: number = PAGE_LENGTH) {
  return Math.ceil(count / pageSize) - pageIndex - 1;
}

export function createPageItems<T>(
  items: T[],
  pageIndex: number,
  reverse: boolean,
  injected: T,
  pageSize: number = PAGE_LENGTH,
): T[] {
  if (items.length === 0) return [];
  const [start, end] = getPageRange(pageIndex, pageSize, items.length);
  const result = items.slice(start, end);
  if (reverse) result.reverse();
  return [injected, ...result];
}
