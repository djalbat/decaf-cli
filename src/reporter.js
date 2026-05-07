"use strict";

export default class Reporter {
  suiteStarted(suite) {
    debugger
  }

  suiteFinished(suite) {
    debugger
  }

  testStarted(test) {
    debugger
  }

  testSuccessful(test) {
    debugger
  }

  testFailed(test, error) {
    debugger
  }

  static fromNothing() {
    const reporter = new Reporter();

    return reporter;
  }
}
