"use strict";

import Test from "../test";

export default function it(description, callback, context) {
  const { depth, currentSuite } = context,
        test = Test.fromDepthDescriptionAndCallabck(depth, description, callback)

  currentSuite.addTest(test);
}
