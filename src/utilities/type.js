"use strict";

import { jsonUtilities } from "necessary";
import { ARRAY_TYPE, OBJECT_TYPE, SYMBOL_TYPE, BIG_INT_TYPE, FUNCTION_TYPE, UNDEFINED_TYPE, PRIMITIVE_TYPE } from "../types";

const { isNull, isArray, isObject, isString, isNumber, isBoolean } = jsonUtilities;

export function typeOf(value) {
  let type;

  const array = isArray(value),
        object = isObject(value),
        primitive = isPrimitive(value),
        _function = isFunction(value);

  if (false) {
    ///
  } else if (array) {
    type = ARRAY_TYPE;
  } else if (object) {
    type = OBJECT_TYPE;
  } else if (primitive) {
    type = PRIMITIVE_TYPE;
  }else if (_function) {
    type = FUNCTION_TYPE;
  }

  return type;
}

function isSymbol(value) {
  const symbol = (typeof value === SYMBOL_TYPE);

  return symbol;
}

function isBigInt(value) {
  const bigInt = (typeof value === BIG_INT_TYPE);

  return bigInt;
}

function isFunction(value) {
  const _function = (typeof value === FUNCTION_TYPE);

  return _function;
}

function isUndefined(value) {
  const _undefined = (typeof value === UNDEFINED_TYPE);

  return _undefined;
}

function isPrimitive(value) {
  const _null = isNull(value),
        string = isString(value),
        number = isNumber(value),
        boolean = isBoolean(value),
        symbol = isSymbol(value),
        bigInt = isBigInt(value),
        _undefined = isUndefined(value),
        primitive = (_null || string || number || boolean || symbol || bigInt || _undefined);

  return primitive;
}
