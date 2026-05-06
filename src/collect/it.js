"use strict";

import Test from "../test";

export default function it(description, callback, context) {
  const { currentSuite } = context,
        test = Test.fromDescriptionAndCallabck(description, callback)

  currentSuite.addTest(test);
}
