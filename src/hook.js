"use strict";

export default class Hook {
  constructor(callback) {
    this.callback = callback;
  }

  getCallback() {
    return this.callback;
  }

  static fromCallback(callback) {
    const hook = new Hook(callback);

    return hook;
  }
}
