"use strict";

import Reporter from "../reporter";

import { offsetConsoleLog } from "../utilities/terminal";
import { cyan, strikethrough } from "../utilities/effects";
import { DOUBLE_SPACE, PENDING_DELAY } from "../constants";
import { SUCCESS_ICON, FAILURE_ICON, PENDING_ICONS, PENDING_ICONS_LENGTH } from "../icons";
import { TEST_FAILED_EVENT_NAME,
         TEST_PENDING_EVENT_NAME,
         TEST_IGNORED_EVENT_NAME,
         TEST_STARTED_EVENT_NAME,
         TEST_FINISHED_EVENT_NAME,
         TEST_SUITE_STARTED_EVENT_NAME,
         TEST_SUITE_FINISHED_EVENT_NAME } from "../eventNames";

export default class TerminalReporter extends Reporter {
  constructor(failedCount, skippedCount, successfulCount, index, interval) {
    super(failedCount, skippedCount, successfulCount);

    this.index = index;
    this.interval = interval;
  }

  getIndex() {
    return this.index;
  }

  getInterval() {
    return this.interval;
  }

  suiteFinished(suite) {
    ///
  }

  testStarted(test) {
    super.testStarted(test);

    this.pendingStart(test);
  }

  testSuccessful(test) {
    this.pendingStop();

    super.testSuccessful(test);
  }

  testFailed(test) {
    this.pendingStop();

    super.testFailed(test);
  }

  pendingStart(test) {
    const delay = PENDING_DELAY;

    this.index = 0;

    this.interval = setInterval(() => {
      this.pendingUpdate(test);
    }, delay);
  }

  pendingStop() {
    clearInterval(this.interval);

    this.interval = null;
  }

  pendingUpdate(test) {
    const runnable = test, ///
          eventName = TEST_PENDING_EVENT_NAME;

    this.consoleLog(runnable, eventName);

    this.index += 1;

    this.index %= PENDING_ICONS_LENGTH;
  }

  paddingFromRunnable(runnable) {
    const depth = runnable.getDepth(),
          padding = DOUBLE_SPACE.repeat(depth);

    return padding;
  }

  descriptiontFromRunnableAndEventName(runnable, eventName) {
    let description = runnable.getDescription();

    switch (eventName) {
      case TEST_IGNORED_EVENT_NAME: {
        description = cyan(strikethrough(description))

        break;
      }

      case TEST_FAILED_EVENT_NAME:
      case TEST_PENDING_EVENT_NAME:
      case TEST_STARTED_EVENT_NAME:
      case TEST_FINISHED_EVENT_NAME:
      case TEST_SUITE_STARTED_EVENT_NAME:
      case TEST_SUITE_FINISHED_EVENT_NAME: {
        ///

        break;
      }
    }

    return description;
  }

  offsetFromEventName(eventName) {
    let offset;

    switch (eventName) {
      case TEST_IGNORED_EVENT_NAME:
      case TEST_STARTED_EVENT_NAME:
      case TEST_SUITE_STARTED_EVENT_NAME:
      case TEST_SUITE_FINISHED_EVENT_NAME: {
        offset = 0;

        break;
      }

      case TEST_PENDING_EVENT_NAME:
      case TEST_FAILED_EVENT_NAME:
      case TEST_FINISHED_EVENT_NAME: {
        offset = 1;

        break;
      }

    }

    return offset;
  }

  iconFromEventName(eventName) {
    let icon;

    switch (eventName) {
      case TEST_FAILED_EVENT_NAME: {
        icon = FAILURE_ICON;

        break;
      }

      case TEST_PENDING_EVENT_NAME: {
        icon = PENDING_ICONS[this.index];

        break;
      }

      case TEST_FINISHED_EVENT_NAME: {
        icon = SUCCESS_ICON;

        break;
      }

      case TEST_IGNORED_EVENT_NAME:
      case TEST_STARTED_EVENT_NAME:
      case TEST_SUITE_STARTED_EVENT_NAME:
      case TEST_SUITE_FINISHED_EVENT_NAME: {
        icon = null;

        break;
      }
    }

    return icon;
  }

  consoleLog(runnable, eventName) {
    const description = this.descriptiontFromRunnableAndEventName(runnable, eventName),
          padding = this.paddingFromRunnable(runnable),
          offset = this.offsetFromEventName(eventName),
          icon = this.iconFromEventName(eventName),
          message = (icon !== null) ?
                     `${padding}${description} ${icon}` :
                       `${padding}${description}`;

    (offset === 1) ?
      offsetConsoleLog(message, offset) :
        this.simpleConsoleLog(message);
  }

  simpleConsoleLog(message) {
    console.log(message);
  }

  static fromNothing() {
    const index = 0,
          interval = null,
          terminalReporter = Reporter.fromNothing(TerminalReporter, index, interval);

    return terminalReporter;
  }
}
