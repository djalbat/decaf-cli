"use strict";

import Test from "../runnable/test";

export default function focusedTestDirective(description, callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        focused = true,
        test = Test.fromParentSuiteDescriptionFocusedAndCallback(parentSuite, description, focused, callback);

  currentSuite.addTest(test);
}
