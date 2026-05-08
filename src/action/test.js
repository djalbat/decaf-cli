"use strict";

import action from "../action";
import IDEReporter from "../reporter/ide";
import runOperation from "../operation/run";
import assignOperation from "../operation/assign";
import collectOperation from "../operation/collect";
import TerminalReporter from "../reporter/terminal";
import retrieveFilePathsOperation from "../operation/retrieveFilePaths";

import { TEST_RUN_FAILED_MESSAGE } from "../messages";

export default function testAction(testDirectoryName, failFast) {
  const Reporter = TerminalReporter,  ///
        operations = [
          retrieveFilePathsOperation,
          assignOperation,
          collectOperation,
          runOperation
        ],
        currentWorkingDirectoryPath = process.cwd(),
        context = {
          Reporter,
          failFast,
          testDirectoryName,
          currentWorkingDirectoryPath
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
