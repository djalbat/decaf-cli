"use strict";

import { jsonUtilities } from "necessary";

const { typeOf, isNull, isArray, isString, isNumber, isBoolean, isPrimitive: isJSONPrimitive } = jsonUtilities;

function isUndefined(value) {
  const _undefined = (value === undefined);

  return _undefined;
}

export function isObject(json) {
  const array = isArray(json),
        primitive = isPrimitive(json),
        object = (!array && !primitive);

  return object;
}

function isPrimitive(value) {
  const jsonPrimitive = isJSONPrimitive(value),
        _undefined = isUndefined(value),
        primitive = (_undefined || jsonPrimitive);

  return primitive;
}

export function areEqual(valudA, valueB) {

}