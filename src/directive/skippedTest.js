"use strict";

import Test from "../runnable/test";

export default function skippedTestDirective(description, callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        skipped = true,
        test = Test.fromParentSuiteDescriptionAndSkipped(parentSuite, description, skipped);

  currentSuite.addTest(test);
}
