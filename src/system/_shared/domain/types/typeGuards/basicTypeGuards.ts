function isNumber(item: any): item is number {
  return !isNaN(item) && typeof item === 'number';
}

function isNumbers(items: any): items is number[] {
  if (!Array.isArray(items)) {
    return false;
  }

  for (const item of items) {
    if (!isNumber(item)) {
      return false;
    }
  }

  return true;
}

function isString(item: any): item is string {
  return typeof item === 'string';
}

function isStrings(items: any): items is string[] {
  if (!Array.isArray(items)) {
    return false;
  }

  for (const item of items) {
    if (!isString(item)) {
      return false;
    }
  }

  return true;
}

function isDict(item: any): item is Object {
  const truthy = item && item !== null && item !== undefined;
  const objNotArr = typeof item === 'object' && !Array.isArray(item);

  return truthy && objNotArr;
}

export {
  isDict,
  isNumber,
  isNumbers,
  isString,
  isStrings,
};
