"use strict";

import helpAction from "./action/help";
import testAction from "./action/test";
import versionAction from "./action/version";

import { HELP_COMMAND, TEST_COMMAND, VERSION_COMMAND } from "./commands";
import { NO_COMMAND_GIVEN_MESSAGE, COMMAND_NOT_RECOGNISED_MESSAGE } from "./messages";

export default function main(command, argument, options) {
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
      const testDirectoryName = argument; ///

      testAction(testDirectoryName);

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
