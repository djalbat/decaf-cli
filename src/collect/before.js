"use strict";

import Hook from "../hook";

export default function before(callback, context) {
  const { currentSuite } = context,
        parentSuite = currentSuite, ///
        hook = Hook.fromCallbackAndParentSuite(callback, parentSuite),
        beforeHook = hook;  ///

  currentSuite.addBeforeHook(beforeHook);
}
