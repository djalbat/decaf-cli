"use strict";

import { isResultPromise } from "../utilities/promise";
import { UNCAUGHT_EXCEPTION } from "../constants";
import { CALLBACK_CALLED_TWICE_MESSAGE } from "../messages";

export function failOrContinue(done, context) {
  let failed = false;

  const { failFast } = context;

  if (failFast) {
    const { success } = context;

    if (!success) {
      failed = true;
    }
  }

  if (failed) {
    done();
  }

  return failed;
}

export function executeCallback(callback, next, done, context) {
  let completed = false;

  const complete = () => {
    if (completed) {
      const success = false;

      Object.assign(context, {
        success
      });

      console.log(CALLBACK_CALLED_TWICE_MESSAGE);

      done();

      return;
    }

    completed = true;

    process.removeListener(UNCAUGHT_EXCEPTION, uncaughtExceptionListener);

    const failed = failOrContinue(done, context);

    if (failed) {
      return;
    }

    next();
  }

  const uncaughtExceptionListener = (error) => {
    const success = false;

    Object.assign(context, {
      success
    });

    console.error(error);

    complete();
  };

  process.addListener(UNCAUGHT_EXCEPTION, uncaughtExceptionListener);

  const length = callback.length;

  try {
    if (length > 0) {
      callback((error) => {
        if (error) {
          const success = false;

          Object.assign(context, {
            success
          });

          console.error(error);
        }

        complete();
      });

      return;
    }

    const result = callback(),
          resultPromise = isResultPromise(result);

    if (resultPromise) {
      result
        .then(() => {
          complete();
        })
        .catch((error) => {
          const success = false;

          Object.assign(context, {
            success
          });

          console.error(error);

          complete();
        });

      return;
    }
  } catch (error) {
    const success = false;

    Object.assign(context, {
      success
    });

    console.error(error);

    complete();

    return;
  }

  complete();
}
