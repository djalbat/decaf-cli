"use strict";

export default function afterEach(callback, context) {
  const { currentSuite } = context,
        afterEachHook = callback;  ///

  currentSuite.addAfterEachHook(afterEachHook);
}