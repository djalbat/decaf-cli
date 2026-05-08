"use strict";

import Hook from "../runnable/hook";

export default function beforeEachHookDirective(callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        hook = Hook.fromParentSuiteAndCallback(parentSuite, callback),
        beforeEachHook = hook;  ///

  currentSuite.addBeforeEachHook(beforeEachHook);
}
