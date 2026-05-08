"use strict";

import helpAction from "./action/help";
import testAction from "./action/test";
import versionAction from "./action/version";

import { DEFAULT_FAIL_FAST } from "./defaults";
import { HELP_COMMAND, TEST_COMMAND, VERSION_COMMAND } from "./commands";
import { NO_COMMAND_GIVEN_MESSAGE, COMMAND_NOT_RECOGNISED_MESSAGE, NO_TEST_DIRECTORY_SPECIFIED_MESSAGE } from "./messages";

export default function main(command, argument, options) {
  const { failFast = DEFAULT_FAIL_FAST} = options;

  switch (command) {
    case null: {
      console.log(NO_COMMAND_GIVEN_MESSAGE);

      break;
    }

    case HELP_COMMAND: {
      helpAction();

      break;
    }

    case TEST_COMMAND: {
      if (argument === null) {
        console.log(NO_TEST_DIRECTORY_SPECIFIED_MESSAGE);

        break;
      }

      const testDirectoryName = argument; ///

      testAction(testDirectoryName, failFast);

      break;
    }

    case VERSION_COMMAND: {
      versionAction();

      break;
    }

    default: {
      console.log(COMMAND_NOT_RECOGNISED_MESSAGE);

      break;
    }
  }
}
