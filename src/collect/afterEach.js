"use strict";

import Hook from "../hook";

export default function afterEach(callback, context) {
  const { currentSuite } = context,
        hook = Hook.fromCallback(callback),
        afterEachHook = hook;  ///

  currentSuite.addAfterEachHook(afterEachHook);
}
