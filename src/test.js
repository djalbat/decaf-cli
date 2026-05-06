"use strict";

export default class Test {
  constructor(depth, description, callback) {
    this.depth = depth;
    this.description = description;
    this.callback = callback;
  }

  getDepth() {
    return this.depth;
  }

  getDescription() {
    return this.description;
  }

  getCallback() {
    return this.callback;
  }

  static fromDepthDescriptionAndCallabck(depth, description, callback) {
    const test = new Test(depth, description, callback);

    return test;
  }
}
