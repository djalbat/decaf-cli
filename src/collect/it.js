"use strict";

import Test from "../runnable/test";

export default function it(description, callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        test = Test.fromParentSuiteDescriptionAndCallback(parentSuite, description, callback);

  currentSuite.addTest(test);
}
