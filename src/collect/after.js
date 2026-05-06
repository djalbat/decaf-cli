"use strict";

export default function after(callback, context) {
  const { currentSuite } = context,
        afterHook = callback;  ///

  currentSuite.addAfterHook(afterHook);
}