"use strict";

import Hook from "../hook";

export default function before(callback, context) {
  const { currentSuite } = context,
        hook = Hook.fromCallback(callback),
        beforeHook = hook;  ///

  currentSuite.addBeforeHook(beforeHook);
}
