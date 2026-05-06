"use strict";

import Hook from "../hook";

export default function after(callback, context) {
  const { currentSuite } = context,
        hook = Hook.fromCallback(callback),
        afterHook = hook;  ///

  currentSuite.addAfterHook(afterHook);
}
