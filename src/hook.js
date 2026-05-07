"use strict";

export default class Hook {
  constructor(callback, parentSuite) {
    this.callback = callback;
    this.parentSuite = parentSuite;
  }

  getCallback() {
    return this.callback;
  }

  getParentSuite() {
    return this.parentSuite;
  }

  static fromCallbackAndParentSuite(callback, parentSuite) {
    const hook = new Hook(callback, parentSuite);

    return hook;
  }
}
