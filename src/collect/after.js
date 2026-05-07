"use strict";

import Hook from "../hook";

export default function after(callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        hook = Hook.fromCallbackAndParentSuite(callback, parentSuite),
        afterHook = hook;  ///

  currentSuite.addAfterHook(afterHook);
}
