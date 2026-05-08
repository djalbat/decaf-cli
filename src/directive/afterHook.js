"use strict";

import Hook from "../runnable/hook";

export default function afterHookDirective(callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        hook = Hook.fromParentSuiteAndCallback(parentSuite, callback),
        afterHook = hook;  ///

  currentSuite.addAfterHook(afterHook);
}
