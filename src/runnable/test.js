"use strict";

export default class Test {
  constructor(parentSuite, description, callback) {
    this.parentSuite = parentSuite;
    this.description = description;
    this.callback = callback;
  }

  getParentSuite() {
    return this.parentSuite;
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
