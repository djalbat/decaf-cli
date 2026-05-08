"use strict";

import { asynchronousUtilities } from "necessary";

import { hideCursor, showCursor } from "../utilities/terminal";
import { executeCallback, failOrContinue } from "../utilities/callback";

const { sequence, forEach } = asynchronousUtilities;

export default function runOperation(proceed, abort, context) {
  const { rootSuite, Reporter } = context,
        suite = rootSuite,  ///
        success = true,
        focused = rootSuite.isFocused(),
        reporter = Reporter.fromNothing();

  Object.assign(context, {
    success,
    focused,
    reporter
  });

  hideCursor();

  runSuite(suite, () => {
    const { success } = context;

    reporter.summarise();

    delete context.success;
    delete context.focused;
    delete context.reporter;

    showCursor();

    success ?
      proceed() :
        abort();
  }, context);
}

function runSuite(suite, next, done, context) {
  if (context === undefined) {
    context = done; ///

    done = next;  ///
  }

  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  const { reporter } = context,
        suiteSkipped = suite.isSkipped();

  if (suiteSkipped) {
    const { focused } = context;

    if (!focused) {
      reporter.suiteSkipped(suite);
    }

    next();

    return;
  }

  const { focused } = context;

  if (focused) {
    const suiteFocused = suite.isFocused();

    if (!suiteFocused) {
      next();

      return;
    } else {
      const suiteStricltyFocused = suite.isStrictlyFocused();

      if (suiteStricltyFocused) {
        const focused = false;  ///

        Object.assign(context, {
          focused
        });
      }
    }
  }

  const operations = [
    (next, done, context) => { executeBeforeHooks(suite, next, done, context); },
    (next, done, context) => { runTests(suite, next, done, context); },
    (next, done, context) => { runSuites(suite, next, done, context); },
    (next, done, context) => { executeAfterHooks(suite, next, done, context); }
  ];

  reporter.suiteStarted(suite);

  sequence(operations, () => {
    reporter.suiteFinished(suite);

    Object.assign(context, {
      focused
    });

    next();
  }, context);
}

function runTests(suite, next, done, context) {
  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  let tests = suite.getTests();

  const { focused } = context;

  if (focused) {
    const suiteFocused = suite.isFocused();

    if (!suiteFocused) {
      next();

      return;
    } else {
      const focusedTest = tests.find((test) => {
        const testFocused = test.isFocused();

        if (testFocused) {
          return true;
        }
      }) || null;

      if (focusedTest !== null) {
        const test = focusedTest; ///

        tests = [
          test
        ];
      }
    }
  }

  done = next;  ///

  forEach(tests, (test, next, done, context) => {
    runTest(suite, test, next, done, context);
  }, done, context);
}

function runTest(suite, test, next, done, context) {
  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  const { reporter } = context,
        testSkipped = test.isSkipped();

  if (testSkipped) {
    const { focused } = context;

    if (!focused) {
      reporter.testSkipped(test);
    }

    next();

    return;
  }

  const success = true;

  Object.assign(context, {
    success
  });

  const operations = [
    (next, done, context) => { executeBeforeEachHooks(suite, next, done, context); },
    (next, done, context) => { executeTest(test, next, done, context); },
    (next, done, context) => { executeAfterEachHooks(suite, next, done, context); }
  ];

  reporter.testStarted(test);

  sequence(operations, () => {
    const { success } = context;

    success ?
      reporter.testSuccessful(test) :
        reporter.testFailed(test);

    next();
  }, context);
}

function runSuites(suite, next, done, context) {
  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  const suites = suite.getSuites();

  done = next;  ///

  forEach(suites, (suite, next, done, context) => {
    runSuite(suite, next, done, context);
  }, done, context);
}

function executeAfterHooks(suite, next, done, context) {
  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  const afterHooks = suite.getAfterHooks();

  done = next;  ///

  forEach(afterHooks, executeHook, done, context);
}

function executeBeforeHooks(suite, next, done, context) {
  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  const beforeHooks = suite.getBeforeHooks();

  done = next;  ///

  forEach(beforeHooks, executeHook, done, context);
}

function executeAfterEachHooks(suite, next, done, context) {
  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  const afterEachHooks = suite.getAfterEachHooks();

  done = next;  ///

  forEach(afterEachHooks, executeHook, done, context);
}

function executeBeforeEachHooks(suite, next, done, context) {
  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  const beforeEachHooks = suite.getBeforeEachHooks();

  done = next;  ///

  forEach(beforeEachHooks, executeHook, done, context);
}

function executeHook(hook, next, done, context) {
  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  const callback = hook.getCallback();

  executeCallback(callback, next, done, context);
}

function executeTest(test, next, done, context) {
  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  const callback = test.getCallback();

  executeCallback(callback, next, done, context)
}

