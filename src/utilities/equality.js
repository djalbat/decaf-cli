"use strict";

import { typeOf } from "../utilities/type";
import { formatValue } from "../utilities/format";
import { ARRAY_TYPE, OBJECT_TYPE, PRIMITIVE_TYPE, FUNCTION_TYPE } from "../constants";

export function deepEqual(valueA, valueB) {
  if (valueA === valueB) {
    return;
  }

  const typeA = typeOf(valueA), ///
        typeB = typeOf(valueB); ///

  if (typeA !== typeB) {
    throw new Error(`The '${typeA}' type of the '${formatValue(valueA)}' value and the '${typeB}' type of the '${formatValue(valueB)}' value are not equal.`);
  }
  const type = typeA; ///

  if (type === PRIMITIVE_TYPE) {
    throw new Error(`The '${formatValue(valueA)}' and '${formatValue(valueB)}' primitives are not equal.`);
  }

  if (type === FUNCTION_TYPE) {
    throw new Error(`The '${formatValue(valueA)}' and '${formatValue(valueB)}' functions are not equal.`);
  }

  if (type === ARRAY_TYPE) {
    const arrayA = valueA,  ///
          arrayB = valueB,  ///
          arrayALength = arrayA.length,
          arrayBLength = arrayB.length;

    if (arrayALength !== arrayBLength) {
      throw new Error(`The '${arrayALength}' and '${arrayBLength}' array lengths are not equal.`);
    }

    const length = arrayA.length;

    for (let index = 0; index < length; index++) {
      const valueA = arrayA[index],
            valueB = arrayB[index];

      deepEqual(valueA, valueB);
    }

    return;
  }

  if (type === OBJECT_TYPE) {
    const objectA = valueA, ///
          objectB = valueB, ///
          keysA = Object.keys(objectA),
          keysB = Object.keys(objectB),
          keysALength = keysA.length,
          keysBLength = keysB.length;

    if (keysALength !== keysBLength) {
      throw new Error(`The '${keysALength}' and '${keysBLength}' keys lengths are not equal.`);
    }

    for (const keyA of keysA) {
      const keyB = keyA,  ///
            keyBPresent = Object.prototype.hasOwnProperty.call(objectB, keyB);

      if (!keyBPresent) {
        throw new Error(`The '${keyB}' key is missing.`);
      }

      const valueA = objectA[keyA],
            valueB = objectB[keyB];

      deepEqual(valueA, valueB);
    }

    return;
  }

  throw new Error(`Could not compare values.`);
}
