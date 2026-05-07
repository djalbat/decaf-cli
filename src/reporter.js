"use strict";

import { offsetConsoleLog } from "./utilities/terminal";
import { DOUBLE_SPACE, PENDING_DELAY } from "./constants";
import { SUCCESS_ICON, FAILURE_ICON, PENDING_ICONS, PENDING_ICONS_LENGTH } from "./icons"

export default class Reporter {
  constructor(index, interval, failedCount, successfulCount) {
    this.index = index;
    this.interval = interval;
    this.failedCount = failedCount;
    this.successfulCount = successfulCount;
  }

  getIndex() {
    return this.index;
  }

  getInterval() {
    return this.interval;
  }

  getFailedCount() {
    return this.failedCount;
  }

  getSuccessCount() {
    return this.successfulCount;
  }

  suiteStarted(suite) {
    const depth = suite.getDepth(),
          description = suite.getDescription();

    if (description === null) {
      return;
    }

    this.consoleLog(description, depth);
  }

  suiteFinished(suite) {
    ///
  }

  testStarted(test) {
    this.pendingStart(test);
  }

  testSuccessful(test) {
    const icon = SUCCESS_ICON,
          depth = test.getDepth(),
          description = test.getDescription();

    this.successfulCount += 1;

    this.pendingStop()

    this.offsetConsoleLog(description, depth, icon);
  }

  testFailed(test) {
    const icon = FAILURE_ICON,
          depth = test.getDepth(),
          description = test.getDescription();

    this.failedCount += 1;

    this.pendingStop()

    this.offsetConsoleLog(description, depth, icon);
  }

  pendingUpdate(test, initial = false) {
    const icon = PENDING_ICONS[this.index],
          depth = test.getDepth(),
          description = test.getDescription();

    initial ?
      this.consoleLog(description, depth, icon) :
        this.offsetConsoleLog(description, depth, icon);

    this.index += 1;

    this.index %= PENDING_ICONS_LENGTH;
  }

  pendingStart(test) {
    const delay = PENDING_DELAY,
          initial = true;

    this.pendingUpdate(test, initial);

    this.interval = setInterval(() => {
      this.pendingUpdate(test);
    }, delay);
  }

  pendingStop() {
    clearInterval(this.interval);

    this.index = 0;

    this.interval = null;
  }

  summarise() {
    const totalCount = this.failedCount + this.successfulCount;

    console.log();

    console.log(`A total of ${totalCount} tests ran with ${this.failedCount} failures and ${this.successfulCount} successes.`);
  }

  consoleLog(description, depth, icon = null) {
    const padding = paddingFromDepth(depth);

    (icon !== null) ?
      console.log(`${padding}${description} ${icon}`) :
        console.log(`${padding}${description}`);
  }

  offsetConsoleLog(description, depth, icon) {
    const offset = 1,
          padding = paddingFromDepth(depth);

    offsetConsoleLog(`${padding}${description} ${icon}`, offset);
  }

  static fromNothing() {
    const index = 0,
          interval = null,
          failedCount = 0,
          successfulCount = 0,
          reporter = new Reporter(index, interval, failedCount, successfulCount);

    return reporter;
  }
}

function paddingFromDepth(depth) {
  const padding = DOUBLE_SPACE.repeat(depth);

  return padding;
}
