"use strict";

import Hook from "../hook";

export default function beforeEach(callback, context) {
  const { currentSuite } = context,
        hook = Hook.fromCallback(callback),
        beforeEachHook = hook;  ///

  currentSuite.addBeforeEachHook(beforeEachHook);
}
