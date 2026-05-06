"use strict";

export default function beforeEach(callback, context) {
  const { currentSuite } = context,
        beforeEachHook = callback;  ///

  currentSuite.addBeforeEachHook(beforeEachHook);
}