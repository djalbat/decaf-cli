"use strict";

import Suite from "../runnable/suite";

export default function focusedSuiteDirective(description, callback, context) {
  let currentSuite;

  ({ currentSuite } = context);

  const parentSuite = currentSuite, ///
        focused = true,
        suite = Suite.fromParentSuitDescriptionAndFocused(parentSuite, description, focused);

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