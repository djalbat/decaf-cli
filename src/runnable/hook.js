"use strict";

import Runnable from "../runnable";

export default class Hook extends Runnable {
  constructor(error, parentSuite, callback) {
    super(error, parentSuite);

    this.callback = callback;
  }

  getCallback() {
    return this.callback;
  }

  static fromParentSuiteAndCallback(parentSuite, callback) {
    const error = null,
          hook = new Hook(error, parentSuite, callback);

    return hook;
  }
}
