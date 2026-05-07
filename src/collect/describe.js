"use strict";

import Suite from "../suite";

export default function describe(description, callback, context) {
  let currentSuite;

  ({ currentSuite } = context);

  const parentSuite = currentSuite, ///
        suite = Suite.fromDescriptionAndParentSuite(description, parentSuite);

  currentSuite.addSuite(suite);

  currentSuite = suite;///

  Object.assign(context, {
    currentSuite
  })

  callback();

  currentSuite = parentSuite; ///

  Object.assign(context, {
    currentSuite
  });
}