"use strict";

import Hook from "../hook";

export default function beforeEach(callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        hook = Hook.fromCallbackAndParentSuite(callback, parentSuite),
        beforeEachHook = hook;  ///

  currentSuite.addBeforeEachHook(beforeEachHook);
}
