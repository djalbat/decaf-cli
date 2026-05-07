"use strict";

import Runnable from "../runnable";

export default class Test extends Runnable{
  constructor(parentSuite, description, skipped, callback) {
    super(parentSuite);

    this.description = description;
    this.skipped = skipped;
    this.callback = callback;
  }

  getDescription() {
    return this.description;
  }

  isSkipped() {
    return this.skipped;
  }

  getCallback() {
    return this.callback;
  }

  static fromParentSuiteDescriptionAndSkipped(parentSuite, description, skipped) {
    const callback = null,
          test = new Test(parentSuite, description, skipped, callback);

    return test;
  }

  static fromParentSuiteDescriptionAndCallback(parentSuite, description, callback) {
    const skipped = false,
          test = new Test(parentSuite, description, skipped, callback);

    return test;
  }
}
