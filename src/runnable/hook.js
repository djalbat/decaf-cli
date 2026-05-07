"use strict";

import Runnable from "../runnable";

export default class Hook extends Runnable {
  constructor(parentSuite, callback) {
    super(parentSuite);

    this.callback = callback;
  }

  getCallback() {
    return this.callback;
  }

  static fromParentSuiteAndCallback(parentSuite, callback) {
    const hook = new Hook(parentSuite, callback);

    return hook;
  }
}
