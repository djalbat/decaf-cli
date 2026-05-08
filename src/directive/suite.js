"use strict";

import Suite from "../runnable/suite";

export default function suiteDirective(description, callback, context) {
  let currentSuite;

  ({ currentSuite } = context);

  const parentSuite = currentSuite, ///
        suite = Suite.fromParentSuiteAndDescription(parentSuite, description);

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