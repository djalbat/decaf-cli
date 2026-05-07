"use strict";

import Hook from "../hook";

export default function afterEach(callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        hook = Hook.fromCallbackAndParentSuite(callback, parentSuite),
        afterEachHook = hook;  ///

  currentSuite.addAfterEachHook(afterEachHook);
}
