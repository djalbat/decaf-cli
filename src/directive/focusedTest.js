"use strict";

import Test from "../runnable/test";

export default function focusedTestDirective(description, callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        focused = true,
        test = Test.fromParentSuiteDescriptionAndFocused(parentSuite, description, focused);

  currentSuite.addTest(test);
}
