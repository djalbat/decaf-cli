"use strict";

import { jsonTypes } from "necessary";

const { ARRAY_JSON_TYPE, OBJECT_JSON_TYPE, STRING_JSON_TYPE, NUMBER_JSON_TYPE, BOOLEAN_JSON_TYPE, PRIMITIVE_JSON_TYPE } = jsonTypes;

export const ARRAY_TYPE = ARRAY_JSON_TYPE;
export const OBJECT_TYPE = OBJECT_JSON_TYPE;
export const STRING_TYPE = STRING_JSON_TYPE;
export const NUMBER_TYPE = NUMBER_JSON_TYPE;
export const BOOLEAN_TYPE = BOOLEAN_JSON_TYPE;
export const PRIMITIVE_TYPE = PRIMITIVE_JSON_TYPE;
export const SYMBOL_TYPE = "symbol";
export const BIG_INT_TYPE = "bigint";
export const FUNCTION_TYPE = "function";
export const UNDEFINED_TYPE = "undefined";
