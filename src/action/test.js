"use strict";

import action from "../action";
import runOperation from "../operation/run";
import assignOperation from "../operation/assign";
import collectOperation from "../operation/collect";
import retrieveFilePathsOperation from "../operation/retrieveFilePaths";

import { TEST_RUN_FAILED_MESSAGE } from "../messages";

export default function testAction(testDirectoryName, failFast) {
  const failed = false,
        operations = [
          retrieveFilePathsOperation,
          assignOperation,
          collectOperation,
          runOperation
        ],
        currentWorkingDirectoryPath = process.cwd(),
        context = {
          failed,
          failFast,
          testDirectoryName,
          currentWorkingDirectoryPath
        };

  action(operations, () => {
    let exitCode = 0;

    const { failed } = context;

    if (failed) {
      console.log(TEST_RUN_FAILED_MESSAGE);

      exitCode += 1;
    }

    Object.assign(process, {
      exitCode
    });
  }, context);
}
