"use strict";

import action from "../action";
import runTestsOperation from "../operation/runTests";
import retrieveFilePathsOperation from "../operation/retrieveFilePaths";

import { TEST_RUN_FAILED_MESSAGE } from "../messages";

export default function testAction(testDirectoryName) {
  const operations = [
          retrieveFilePathsOperation,
          runTestsOperation
        ],
        context = {
          testDirectoryName
        };

  action(operations, (success) => {
    if (!success) {
      console.log(TEST_RUN_FAILED_MESSAGE);
    }

    process.exit(); ///
  }, context);
}
