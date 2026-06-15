"use strict";

import { isResultPromise } from "../utilities/promise";
import { UNCAUGHT_EXCEPTION } from "../constants";
import { CALLBACK_CALLED_TWICE_MESSAGE } from "../messages";

export function failOrContinue(next, done, context) {
  let failedFast = false;

  const { error } = context;

  if (error) {
    const { failFast } = context;

    if (failFast) {
      failedFast = true;

      next();
    }
  }

  return failedFast;
}

export function executeCallback(callback, next, done, context) {
  let completed = false;

  const complete = (error) => {
    if (error) {
      console.error(error);
    }

    if (completed) {
      console.log(CALLBACK_CALLED_TWICE_MESSAGE);

      return;
    }

    process.removeListener(UNCAUGHT_EXCEPTION, uncaughtExceptionListener);

    completed = true;

    if (error) {
      const success = false;

      Object.assign(context, {
        success
      });

      const { error: existingError = null } = context;

      if (existingError === null) {
        Object.assign(context, {
          error
        });
      }
    }

    setImmediate(next);
  }

  const uncaughtExceptionListener = (error) => {
    complete(error);
  };

  process.addListener(UNCAUGHT_EXCEPTION, uncaughtExceptionListener);

  try {
    const length = callback.length;

    if (length > 0) {
      callback((error = null) => {
        complete(error);
      });

      return;
    }

    const result = callback(),
          resultPromise = isResultPromise(result);

    if (resultPromise) {
      result
        .then(() => {
          const error = null;

          complete(error);
        })
        .catch((error) => {
          complete(error);
        });

      return;
    }
  } catch (error) {
    complete(error);

    return;
  }

  const error = null;

  complete(error);
}
