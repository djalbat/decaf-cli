"use strict";

import { deepEqual } from "./utilities/equality";
import { formatValue } from "./utilities/format";

export function equal(valueA, valueB) {
  if (valueA === valueB) {
    return;
  }

  throw new Error(`The '${formatValue(valueA)}' and '${formatValue(valueB)}' values are not equal.`);
}

export function isNull(value) {
  if (value === null) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not null.`);
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

export function isEmpty(array) {
  const arrayLength = array.length;

  if (arrayLength === 0) {
    return;
  }

  const value = array;  ///

  throw new Error(`The '${arrayLength}' length of the '${formatValue(value)}' array is not zero.`);
}

export function lengthOf(array, length) {
  const arrayLength = array.length;

  if (arrayLength === length) {
    return;
  }

  const value = array;  ///

  throw new Error(`The '${arrayLength}' length of the '${formatValue(value)}' array is not the expected '${length}' length.`);
}

export default {
  equal,
  isNull,
  isTrue,
  isFalse,
  isEmpty,
  lengthOf,
  deepEqual
};
