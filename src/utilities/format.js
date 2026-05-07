"use strict";

import { inspect } from "node:util";

export function formatValue(value) {
  const depth = null,
        colors = false,
        options = {
          depth,
          colors
        },
        formattedValue = inspect(value, options);

  return formattedValue;
}
