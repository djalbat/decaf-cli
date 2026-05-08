"use strict";

export default class Runnable {
  constructor(error, parentSuite) {
    this.error = error;
    this.parentSuite = parentSuite;
  }

  getError() {
    return this.error;
  }

  getParentSuite() {
    return this.parentSuite;
  }

  getMessage() {
    let message = null;

    if (this.error !== null) {
      ({ message } = this.error)
    }

    return message;
  }

  getDetails() {
    let details = null;

    if (this.error !== null) {
      const { stack } = this.error;

      details = stack;  ///
    }

    return details;
  }

  getDepth() {
    let depth;

    if (this.parentSuite !== null) {
      depth = this.parentSuite.getDepth();

      depth++;
    } else {
      depth = 0;
    }

    return depth;
  }

  setError(error) {
    this.error = error;
  }

  setParentSuite(parentSuite) {
    this.parentSuite = parentSuite;
  }
}
