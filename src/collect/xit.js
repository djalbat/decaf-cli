"use strict";

import Test from "../runnable/test";

export default function xit(description, callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        skipped = true,
        test = Test.fromParentSuiteDescriptionAndSkipped(parentSuite, description, skipped);

  currentSuite.addTest(test);
}
