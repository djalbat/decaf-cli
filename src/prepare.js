"use strict";

import { DEFAULT_HELP, DEFAULT_VERSION } from "./defaults";
import { HELP_COMMAND, TEST_COMMAND, VERSION_COMMAND } from "./commands";

export default function prepare(command, argument, options, main) {
  const { help = DEFAULT_HELP, version = DEFAULT_VERSION } = options;

  if (false) {
    ///
  } else if (help) {
    command = HELP_COMMAND;
  } else if (version) {
    command = VERSION_COMMAND;
  }

  if (argument === null) {
    argument = command; ///

    command = TEST_COMMAND;
  }

  main(command, argument, options);
}
