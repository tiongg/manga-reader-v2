import _ from 'lodash';

/**
 * Orders items by expected order of ids
 * @param items - Base items to sort
 * @param getKey - Function to get key sorting key from item
 * @param expectedOrderIds - Expected order of item ids
 * @returns Copy of items sorted by expectedOrderIds
 */
export function orderWithReference<T>(
  items: T[],
  getKey: (item: T) => string,
  expectedOrderIds?: string[]
) {
  //No order, return default
  if (!expectedOrderIds || expectedOrderIds.length <= 0) return items;

  const orderMap: { [key: string]: number } = expectedOrderIds.reduce(
    (prev, current, index) => ({ ...prev, [current]: index }),
    {}
  );

  return _.sortBy(items, (item) => orderMap[getKey(item)]);
}
