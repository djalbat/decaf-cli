"use strict";

import Reporter from "../reporter";

import { escape } from "../utilities/ide";

export default class IDEReporter extends Reporter {
  consoleLog(runnable, eventName) {
    const description = runnable.getDescription(),
          escapedDescription = escape(description);

    console.log(`##teamcity[testSuiteStarted name='${escapedDescription}']`);
  }

  simpleConsoleLog(message) {
    console.log(message);
  }

  static fromNothing() { return Reporter.fromNothing(IDEReporter); }
}
