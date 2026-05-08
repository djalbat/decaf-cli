"use strict";

import { deepEqual } from "./utilities/equality";
import { formatValue } from "./utilities/format";

import { OBJECT_OBJECT } from "./constants";
import { STRING_TYPE, NUMBER_TYPE, BOOLEAN_TYPE } from "./types";

export function equal(valueA, valueB) {
  if (valueA === valueB) {
    return;
  }

  throw new Error(`The '${formatValue(valueA)}' and '${formatValue(valueB)}' values are not equal.`);
}

export function throws(block) {
  try {
    block();
  } catch (error) {
    return;
  }

  throw new Error(`An exception was not thrown..`);
}

export function isTrue(value) {
  if (value === true) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not true.`);
}

export function isNaN(value) {
  if (Number.isNaN(value)) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not NaN.`);
}

export function isNull(value) {
  if (value === null) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not null.`);
}

export function isEmpty(array) {
  const arrayLength = array.length;

  if (arrayLength === 0) {
    return;
  }

  const value = array;  ///

  throw new Error(`The '${formatValue(value)}' array is not empty.`);
}

export function isArray(value) {
  if (Array.isArray(value)) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not an array.`);
}

export function isObject(value) {
  if (Object.prototype.toString.call(value) === OBJECT_OBJECT) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not an object.`);
}

export function isString(value) {
  if (typeof value === STRING_TYPE) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not a string.`);
}

export function isNumber(value) {
  if (typeof value === NUMBER_TYPE) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not a number.`);
}

export function isBoolean(value) {
  if (typeof value === BOOLEAN_TYPE) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not a boolean.`);
}

export function notEqual(valueA, valueB) {
  if (valueA !== valueB) {
    return;
  }

  throw new Error(`The '${formatValue(valueA)}' and '${formatValue(valueB)}' values are equal.`);
}

export function doesNotThrow(block) {
  try {
    block();
  } catch (error) {
    const { message } = error;

    throw new Error(`An exception was thrown with a '${message}' message..`);
  }
}

export function isFalse(value) {
  if (value === false) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is not false.`);
}

export function isNotNaN(value) {
  if (!Number.isNaN(value)) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is NaN.`);
}

export function isNotNull(value) {
  if (value !== null) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is null.`);
}

export function isNotEmpty(array) {
  const arrayLength = array.length;

  if (arrayLength !== 0) {
    return;
  }

  const value = array;  ///

  throw new Error(`The '${formatValue(value)}' array is empty.`);
}

export function isNotArray(value) {
  if (!Array.isArray(value)) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is an array.`);
}

export function isNotObject(value) {
  if (Object.prototype.toString.call(value) !== OBJECT_OBJECT) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is an object.`);
}

export function isNotString(value) {
  if (typeof value !== STRING_TYPE) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is a string.`);
}

export function isNotNumber(value) {
  if (typeof value !== NUMBER_TYPE) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is a number.`);
}

export function isNotBoolean(value) {
  if (typeof value !== BOOLEAN_TYPE) {
    return;
  }

  throw new Error(`The '${formatValue(value)}' value is a boolean.`);
}

export function lengthOf(array, length) {
  const arrayLength = array.length;

  if (arrayLength === length) {
    return;
  }

  const value = array;  ///

  throw new Error(`The '${arrayLength}' length of the '${formatValue(value)}' array is not the expected '${length}' length.`);
}

export function instanceOf(instance, Class) {
  if (instance instanceof Class) {
    return;
  }

  throw new Error(`The '${formatValue(instance)}' instance is not an instance of the '${formatValue(Class)}' class.`);
}

export default {
  equal,
  throws,
  isTrue,
  isNaN,
  isNull,
  isEmpty,
  isArray,
  isObject,
  isString,
  isNumber,
  isBoolean,
  notEqual,
  doesNotThrow,
  isFalse,
  isNotNaN,
  isNotNull,
  isNotEmpty,
  isNotArray,
  isNotObject,
  isNotString,
  isNotNumber,
  isNotBoolean,
  lengthOf,
  instanceOf,
  deepEqual
};
