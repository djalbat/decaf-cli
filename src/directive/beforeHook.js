"use strict";

import Hook from "../runnable/hook";

export default function beforeHookDirective(callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        hook = Hook.fromParentSuiteAndCallback(parentSuite, callback),
        beforeHook = hook;  ///

  currentSuite.addBeforeHook(beforeHook);
}
