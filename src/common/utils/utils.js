import _ from 'lodash';

export function joinNonEmpty(arr, sep) {
  if (_.isEmpty(arr)) {
    return '';
  }

  const neArr = arr.filter((a) => !_.isEmpty(a));
  return _.join(neArr, ', ');
}
