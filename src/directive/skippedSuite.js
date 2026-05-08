"use strict";

import Suite from "../runnable/suite";

export default function skippedSuiteDirective(description, callback, context) {
  let currentSuite;

  ({ currentSuite } = context);

  const parentSuite = currentSuite, ///
        skipped = true,
        suite = Suite.fromParentSuitDescriptionAndSkipped(parentSuite, description, skipped);

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