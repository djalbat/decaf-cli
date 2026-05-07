"use strict";

import { isResultPromise } from "../utilities/promise";
import { UNCAUGHT_EXCEPTION } from "../constants";
import { CALLBACK_CALLED_TWICE_MESSAGE } from "../messages";

export function failOrContinue(done, context) {
  let failedFast = false;

  const { success } = context;

  if (!success) {
    const { failFast } = context;

    if (failFast) {
      failedFast = true;

      done();
    }
  }

  return failedFast;
}

export function executeCallback(callback, next, context) {
  let completed = false;

  const complete = (success) => {
    if (completed) {
      console.log(CALLBACK_CALLED_TWICE_MESSAGE);

      return;
    }

    completed = true;

    process.removeListener(UNCAUGHT_EXCEPTION, uncaughtExceptionListener);

    let failed;

    ({ failed } = context);

    failed = failed || !success;  ///

    Object.assign(context, {
      failed,
      success
    });

    next();
  }

  const uncaughtExceptionListener = (error) => {
    const success = false;

    console.error(error);

    complete(success);
  };

  process.addListener(UNCAUGHT_EXCEPTION, uncaughtExceptionListener);

  const length = callback.length;

  try {
    if (length > 0) {
      callback((error) => {
        let success = true;

        if (error) {
          success = false;

          console.error(error);
        }

        complete(success);
      });

      return;
    }

    const result = callback(),
          resultPromise = isResultPromise(result);

    if (resultPromise) {
      result
        .then(() => {
          const success = true;

          complete(success);
        })
        .catch((error) => {
          const success = false;

          console.error(error);

          complete(success);
        });

      return;
    }
  } catch (error) {
    const success = false;

    console.error(error);

    complete(success);

    return;
  }

  const success = true;

  complete(success);
}
