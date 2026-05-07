"use strict";

import Runnable from "../runnable";

export default class Test extends Runnable{
  constructor(parentSuite, description, callback) {
    super(parentSuite);

    this.description = description;
    this.callback = callback;
  }

  getDescription() {
    return this.description;
  }

  getCallback() {
    return this.callback;
  }

  static fromParentSuiteDescriptionAndCallback(parentSuite, description, callback) {
    const test = new Test(parentSuite, description, callback);

    return test;
  }
}
