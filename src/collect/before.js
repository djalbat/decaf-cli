"use strict";

export default function before(callback, context) {
  const { currentSuite } = context,
        beforeHook = callback;  ///

  currentSuite.addBeforeHook(beforeHook);
}