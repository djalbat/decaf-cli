"use strict";

import action from "../action";
import assignOperation from "../operation/assign";
import collectOperation from "../operation/collect";
import retrieveFilePathsOperation from "../operation/retrieveFilePaths";

import { TEST_RUN_FAILED_MESSAGE } from "../messages";

export default function testAction(testDirectoryName) {
  const operations = [
          retrieveFilePathsOperation,
          assignOperation,
          collectOperation
        ],
        currentWorkingDirectoryPath = process.cwd(),
        context = {
          testDirectoryName,
          currentWorkingDirectoryPath
        };

  action(operations, (success) => {
    if (!success) {
      console.log(TEST_RUN_FAILED_MESSAGE);
    }

    process.exit(); ///
  }, context);
}
