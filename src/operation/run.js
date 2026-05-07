"use strict";

import { asynchronousUtilities } from "necessary";

import Reporter from "../reporter";

import { executeCallback, failOrContinue } from "../utilities/callback";

const { sequence, forEach } = asynchronousUtilities;

export default function runOperation(proceed, abort, context) {
  const { rootSuite } = context,
        suite = rootSuite,  ///
        success = true,
        reporter = Reporter.fromNothing();

  Object.assign(context, {
    success,
    reporter
  });

  runSuite(suite, () => {
    const { success } = context;

    reporter.summarise();

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

  const skipped = suite.isSkipped();

  if (skipped) {
    const { reporter } = context;

    reporter.suiteSkipped(suite);

    next();

    return;
  }

  const operations = [
    (next, done, context) => { executeBeforeHooks(suite, next, done, context); },
    (next, done, context) => { runTests(suite, next, done, context); },
    (next, done, context) => { runChildSuites(suite, next, done, context); },
    (next, done, context) => { executeAfterHooks(suite, next, done, context); }
  ];

  const { reporter } = context;

  reporter.suiteStarted(suite);

  sequence(operations, () => {
    reporter.suiteFinished(suite);

    next();
  }, context);
}

function runTest(suite, test, next, done, context) {
  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  const skipped = test.isSkipped();

  if (skipped) {
    const { reporter } = context;

    reporter.testSkipped(test);

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

  const { reporter } = context;

  reporter.testStarted(test);

  sequence(operations, () => {
    const { success } = context;

    success ?
      reporter.testSuccessful(test) :
        reporter.testFailed(test);

    next();
  }, context);
}

function runTests(suite, next, done, context) {
  const failedFast = failOrContinue(next, done, context);

  if (failedFast) {
    return;
  }

  const tests = suite.getTests();

  done = next;  ///

  forEach(tests, (test, next, done, context) => {
    runTest(suite, test, next, done, context);
  }, done, context);
}

function runChildSuites(suite, next, done, context) {
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

