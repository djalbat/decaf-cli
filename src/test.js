"use strict";

export default class Test {
  constructor(description, callback) {
    this.description = description;
    this.callback = callback;
  }

  getDescription() {
    return this.description;
  }

  getCallback() {
    return this.callback;
  }

  static fromDescriptionAndCallabck(description, callback) {
    const test = new Test(description, callback);

    return test;
  }
}
