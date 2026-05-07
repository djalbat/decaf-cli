"use strict";

import Test from "../runnable/test";

export default function xit(description, callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        focused = true,
        test = Test.fromParentSuiteDescriptionAndFocused(parentSuite, description, focused);

  currentSuite.addTest(test);
}
