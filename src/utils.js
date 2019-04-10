import { Dimensions, Platform } from 'react-native'

export function range(start, stop, step) {
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
export function createPages(length, pageSize) {
  if (pageSize >= length) return [[0, length]];
  if (pageSize <= 0) pageSize = 1;
  let pageCount = Math.ceil(length / pageSize);
  let result = [];
  for (let i = 0; i < pageCount; i++) {
    result.push([i * pageSize, Math.min(i * pageSize + pageSize, length)]);
  }
  return result;
}

export const getPageTitle = (pageIndex, pageSize, maxLength, reversed) => {
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

export const getPageRange = (pageIndex, pageSize, maxLength) => {
  return [
    pageIndex * pageSize,
    Math.min(pageIndex * pageSize + pageSize, maxLength)
  ];
};

export const ios = Platform.OS !== 'android';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const isIphoneX =
  (D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
  (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT);

export function statusBarOffset(offset = 0) {
  if (ios) {
    if (isIphoneX) return offset + 44;
    return offset + 20;
  }
  return offset;
}
