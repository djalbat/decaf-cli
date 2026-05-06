"use strict";

import Suite from "../suite";

export default function describe(description, callback, context) {
  const suite = Suite.fromDescription(description);

  let currentSuite;

  ({ currentSuite } = context);

  currentSuite.addSuite(suite);

  const previousSuite = currentSuite; ///

  currentSuite = suite;///

  Object.assign(context, {
    currentSuite
  })

  callback();

  currentSuite = previousSuite; ///

  Object.assign(context, {
    currentSuite
  });
}