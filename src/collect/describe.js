"use strict";

import Suite from "../suite";

export default function describe(description, callback, context) {
  let depth

  ({ depth } = context);

  const suite = Suite.fromDepthAndDescription(depth, description);

  let currentSuite;

  ({ currentSuite } = context);

  currentSuite.addSuite(suite);

  const previousSuite = currentSuite; ///

  depth++;

  currentSuite = suite;///

  Object.assign(context, {
    depth,
    currentSuite
  })

  callback();

  currentSuite = previousSuite; ///

  depth--;

  Object.assign(context, {
    depth,
    currentSuite
  });
}