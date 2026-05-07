"use strict";

import { deepEqual } from "./utilities/equality";
import { formatValue } from "./utilities/format";

export function equal(valueA, valueB) {
  if (valueA === valueB) {
    return;
  }

  throw new Error(`The '${formatValue(valueA)}' and '${formatValue(valueB)}' values are not equal.`);
}

export function isTrue(value) {
  if (value === true) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not true.`);
}

export function isFalse(value) {
  if (value === false) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not false.`);
}

export function lengthOf(array, length) {
  const arrayLength = array.length;

  if (arrayLength === length) {
    return;
  }

  throw new Error(`The '${arrayLength}' array length is not the expected '${length}' length.`);
}

export default {
  equal,
  isTrue,
  isFalse,
  lengthOf,
  deepEqual
};
