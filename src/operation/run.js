"use strict";

import { asynchronousUtilities } from "necessary";

import { executeCallback, failOrContinue } from "../utilities/callback";

const { sequence, forEach } = asynchronousUtilities;

export default function runOperation(proceed, abort, context) {
  const { rootSuite } = context,
        success = true,
        suite = rootSuite;  ///

  Object.assign(context, {
    success
  });

  runSuite(suite, () => {
    const { success } = context;

    delete context.success;

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

  const failed = failOrContinue(done, context);

  if (failed) {
    return;
  }

  const operations = [
    (next, done, context) => { executeBeforeHooks(suite, next, done, context); },
    (next, done, context) => { runTests(suite, next, done, context); },
    (next, done, context) => { runChildSuites(suite, next, done, context); },
    (next, done, context) => { executeAfterHooks(suite, next, done, context); }
  ];

  done = next;  ///

  sequence(operations, done, context);
}

function runTest(suite, test, next, done, context) {
  const failed = failOrContinue(done, context);

  if (failed) {
    return;
  }

  const operations = [
    (next, done, context) => { exectuteBeforeEachHooks(suite, next, done, context); },
    (next, done, context) => { executeTest(test, next, done, context); },
    (next, done, context) => { executeAfterEachHooks(suite, next, done, context); }
  ];

  sequence(operations, next, context);
}

function runChildSuites(suite, next, done, context) {
  const failed = failOrContinue(done, context);

  if (failed) {
    return;
  }

  const suites = suite.getSuites();

  done = next;  ///

  forEach(suites, (suite, next, done, context) => {
    runSuite(suite, next, done, context);
  }, done, context);
}

function runTests(suite, next, done, context) {
  const failed = failOrContinue(done, context);

  if (failed) {
    return;
  }

  const tests = suite.getTests();

  done = next;  ///

  forEach(tests, (test, next, done, context) => {
    runTest(suite, test, next, done, context);
  }, done, context);
}

function executeAfterHooks(suite, next, done, context) {
  const failed = failOrContinue(done, context);

  if (failed) {
    return;
  }

  const afterHooks = suite.getAfterHooks();

  done = next;  ///

  forEach(afterHooks, executeHook, done, context);
}

function executeBeforeHooks(suite, next, done, context) {
  const failed = failOrContinue(done, context);

  if (failed) {
    return;
  }

  const beforeHooks = suite.getBeforeHooks();

  done = next;  ///

  forEach(beforeHooks, executeHook, done, context);
}

function executeAfterEachHooks(suite, next, done, context) {
  const failed = failOrContinue(done, context);

  if (failed) {
    return;
  }

  const afterEachHooks = suite.getAfterEachHooks();

  done = next;  ///

  forEach(afterEachHooks, executeHook, done, context);
}

function exectuteBeforeEachHooks(suite, next, done, context) {
  const failed = failOrContinue(done, context);

  if (failed) {
    return;
  }

  const beforeEachHooks = suite.getBeforeEachHooks();

  done = next;  ///

  forEach(beforeEachHooks, executeHook, done, context);
}

function executeHook(hook, next, done, context) {
  const failed = failOrContinue(done, context);

  if (failed) {
    return;
  }

  const callback = hook.getCallback();

  executeCallback(callback, next, done, context);
}

function executeTest(test, next, done, context) {
  const failed = failOrContinue(done, context);

  if (failed) {
    return;
  }

  const callback = test.getCallback();

  executeCallback(callback, next, done, context)
}
