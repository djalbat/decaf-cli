"use strict";

export default class Runnable {
  constructor(parentSuite) {
    this.parentSuite = parentSuite;
  }

  getParentSuite() {
    return this.parentSuite;
  }

  getDepth() {
    let depth;

    if (this.parentSuite !== null) {
      depth = this.parentSuite.getDepth();

      depth++;
    } else {
      depth = 0;
    }

    return depth;
  }
}