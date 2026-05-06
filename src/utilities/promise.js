"use strict";

import { FUNCTION } from "../constants";

export function isResultPromise(result) {
  let resultPromise = false;

  if ((result !== null) && (result !== undefined)) {
    const { then } = result,
          thenFunction = (typeof then === FUNCTION);

    if (thenFunction) {
      resultPromise = true;
    }
  }

  return resultPromise;
}
