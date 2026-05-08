"use strict";

import { red, cyan, green } from "./utilities/effects";
import { TEST_FAILED_EVENT_NAME,
         TEST_IGNORED_EVENT_NAME,
         TEST_STARTED_EVENT_NAME,
         TEST_FINISHED_EVENT_NAME,
         TEST_SUITE_STARTED_EVENT_NAME,
         TEST_SUITE_FINISHED_EVENT_NAME } from "./eventNames";

export default class Reporter {
  constructor(failedCount, skippedCount, successfulCount) {
    this.failedCount = failedCount;
    this.skippedCount = skippedCount;
    this.successfulCount = successfulCount;
  }

  getFailedCount() {
    return this.failedCount;
  }

  getSkippedCount() {
    return this.skippedCount;
  }

  getSuccessCount() {
    return this.successfulCount;
  }

  suiteStarted(suite) {
    const description = suite.getDescription();

    if (description === null) {
      return;
    }

    const runnable = suite, ///
          eventName = TEST_SUITE_STARTED_EVENT_NAME;

    this.consoleLog(runnable, eventName);
  }

  suiteFinished(suite) {
    const description = suite.getDescription();

    if (description === null) {
      return;
    }

    const runnable = suite, ///
          eventName = TEST_SUITE_FINISHED_EVENT_NAME;

    this.consoleLog(runnable, eventName);
  }

  suiteSkipped(suite) {
    const runnable = suite, ///
          eventName = TEST_IGNORED_EVENT_NAME;

    this.consoleLog(runnable, eventName);

    const tests = suite.getTests(),
          suites = suite.getSuites();

    tests.forEach((test) => {
      this.testSkipped(test);
    });

    suites.forEach((suite) => {
      this.suiteSkipped(suite);
    });
  }

  testStarted(test) {
    const runnable = test, ///
          eventName = TEST_STARTED_EVENT_NAME;

    this.consoleLog(runnable, eventName);
  }

  testSuccessful(test) {
    const runnable = test, ///
          eventName = TEST_FINISHED_EVENT_NAME;

    this.successfulCount += 1;

    this.consoleLog(runnable, eventName);
  }

  testFailed(test) {
    const runnable = test, ///
          eventName = TEST_FAILED_EVENT_NAME;

    this.failedCount += 1;

    this.consoleLog(runnable, eventName);
  }

  testSkipped(test) {
    const runnable = test, ///
          eventName = TEST_IGNORED_EVENT_NAME;

    this.skippedCount += 1;

    this.consoleLog(runnable, eventName);
  }

  summarise() {
    const totalCount = this.failedCount + this.skippedCount + this.successfulCount;

    this.simpleConsoleLog(`A total of ${totalCount} tests ran with ${red(this.failedCount)} failures, ${cyan(this.skippedCount)} skipped and ${green(this.successfulCount)} successes.`);
  }

  consoleLog(runnable, eventName) {
    ///
  }

  simpleConsoleLog(message) {
    ///
  }

  static fromNothing(Class, ...remainingArguments) {
    const failedCount = 0,
          skippedCount = 0,
          successfulCount = 0,
          reporter = new Class(failedCount, skippedCount, successfulCount, ...remainingArguments);

    return reporter;
  }
}
