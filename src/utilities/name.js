"use strict";

export function isNameHiddenName(name) {
  const nameHiddenName = /^\..+/.test(name);

  return nameHiddenName;
}
