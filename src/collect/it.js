"use strict";

import Test from "../test";

export default function it(description, callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        test = Test.fromDescriptionParentSuiteAndCallback(description, parentSuite, callback)

  currentSuite.addTest(test);
}
