"use strict";

import Reporter from "../reporter";

import { escape } from "../utilities/ide";
import { TEST_FAILED_EVENT_NAME,
         TEST_IGNORED_EVENT_NAME,
         TEST_STARTED_EVENT_NAME,
         TEST_FINISHED_EVENT_NAME,
         TEST_SUITE_STARTED_EVENT_NAME,
         TEST_SUITE_FINISHED_EVENT_NAME } from "../eventNames";

export default class IDEReporter extends Reporter {
  consoleLog(runnable, eventName) {
    const description = runnable.getDescription(),
          escapedDescription = escape(description);

    switch (eventName) {
      case TEST_FAILED_EVENT_NAME: {
        console.log(`##teamcity[${eventName} name='${escapedDescription}' message='Failed']`);

        eventName = TEST_FINISHED_EVENT_NAME; ///

        console.log(`##teamcity[${eventName} name='${escapedDescription}']`);

        break;
      }

      case TEST_IGNORED_EVENT_NAME: {
        console.log(`##teamcity[${eventName} name='${escapedDescription}' message='Skipped']`);

        break;
      }

      case TEST_STARTED_EVENT_NAME:
      case TEST_FINISHED_EVENT_NAME:
      case TEST_SUITE_STARTED_EVENT_NAME:
      case TEST_SUITE_FINISHED_EVENT_NAME: {
        console.log(`##teamcity[${eventName} name='${escapedDescription}']`);

        break;
      }
    }
  }

  simpleConsoleLog(message) {
    console.log(message);
  }

  static fromNothing() { return Reporter.fromNothing(IDEReporter); }
}
