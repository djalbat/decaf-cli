"use strict";

import { executeOperations } from "./utilities/operations";

export default function action(operations, callback, context) {
  executeOperations(operations, (completed) => {
    const success = completed;  ///

    callback(success);
  }, context);
}
