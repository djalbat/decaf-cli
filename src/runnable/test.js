"use strict";

import Runnable from "../runnable";

export default class Test extends Runnable{
  constructor(error, parentSuite, description, skipped, focused, callback) {
    super(error, parentSuite);

    this.description = description;
    this.skipped = skipped;
    this.focused = focused;
    this.callback = callback;
  }

  getDescription() {
    return this.description;
  }

  isFocused() {
    return this.focused;
  }

  isSkipped() {
    return this.skipped;
  }

  getCallback() {
    return this.callback;
  }

  static fromParentSuiteDescriptionAndSkipped(parentSuite, description, skipped) {
    const error = null,
          focused = false,
          callback = null,
          test = new Test(error, parentSuite, description, skipped, focused, callback);

    return test;
  }

  static fromParentSuiteDescriptionAndCallback(parentSuite, description, callback) {
    const error = null,
          focused = false,
          skipped = false,
          test = new Test(error, parentSuite, description, skipped, focused, callback);

    return test;
  }

  static fromParentSuiteDescriptionFocusedAndCallback(parentSuite, description, focused, callback) {
    const error = null,
          skipped = false,
          test = new Test(error, parentSuite, description, skipped, focused, callback);

    return test;
  }
}
