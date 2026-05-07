"use strict";

import Hook from "../runnable/hook";

export default function afterEach(callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        hook = Hook.fromParentSuiteAndCallback(parentSuite, callback),
        afterEachHook = hook;  ///

  currentSuite.addAfterEachHook(afterEachHook);
}
