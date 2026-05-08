"use strict";

import action from "../action";
import runOperation from "../operation/run";
import TerminalReporter from "../reporter/terminal";
import collectRunnablesOperation from "../operation/collectRunnables";
import assignDirectivesOperation from "../operation/assignDirectives";
import retrieveFilePathsOperation from "../operation/retrieveFilePaths";

import { TEST_RUN_FAILED_MESSAGE } from "../messages";

export default function testAction(entryPath, failFast) {
  const Reporter = TerminalReporter,  ///
        operations = [
          retrieveFilePathsOperation,
          assignDirectivesOperation,
          collectRunnablesOperation,
          runOperation
        ],
        context = {
          Reporter,
          failFast,
          entryPath
        };

  action(operations, (success) => {
    let exitCode = 0;

    if (!success) {
      console.log(TEST_RUN_FAILED_MESSAGE);

      exitCode += 1;
    }

    Object.assign(process, {
      exitCode
    });
  }, context);
}
