"use strict";

export default class Test {
  constructor(description, parentSuite, callback) {
    this.description = description;
    this.parentSuite = parentSuite;
    this.callback = callback;
  }

  getDescription() {
    return this.description;
  }

  getParentSuite() {
    return this.parentSuite;
  }

  getCallback() {
    return this.callback;
  }

  static fromDescriptionParentSuiteAndCallback(description, parentSuite, callback) {
    const test = new Test(description, parentSuite, callback);

    return test;
  }
}
