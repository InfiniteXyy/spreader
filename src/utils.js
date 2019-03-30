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
