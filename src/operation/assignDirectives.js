"use strict";

import assert from "../assert";
import testDirective from "../directive/test";
import suiteDirective from "../directive/suite";
import afterHookDirective from "../directive/afterHook";
import beforeHookDirective from "../directive/beforeHook";
import focusedTestDirective from "../directive/focusedTest";
import skippedTestDirective from "../directive/skippedTest";
import focusedSuiteDirective from "../directive/focusedSuite";
import skippedSuiteDirective from "../directive/skippedSuite";
import afterEachHookDirective from "../directive/afterEachHook";
import beforeEachHookDirective from "../directive/beforeEachHook";

export default function assignDirectivesOperation(proceed, abort, context) {
  const it = (description, callback) => { testDirective(description, callback, context); },
        fit = (description, callback) => { focusedTestDirective(description, callback, context); },
        xit = (description, callback) => { skippedTestDirective(description, callback, context); },
        after = (callback) => { afterHookDirective(callback, context); },
        before = (callback) => { beforeHookDirective(callback, context); },
        describe = (description, callback) => { suiteDirective(description, callback, context); },
        fdescribe = (description, callback) => { focusedSuiteDirective(description, callback, context); },
        xdescribe = (description, callback) => { skippedSuiteDirective(description, callback, context); },
        afterEach = (callback) => { afterEachHookDirective(callback, context); },
        beforeEach = (callback) => { beforeEachHookDirective(callback, context); };

  Object.assign(globalThis, {
    assert,
    it,
    fit,
    xit,
    after,
    before,
    describe,
    fdescribe,
    xdescribe,
    afterEach,
    beforeEach
  });

  it.skip = xit;
  it.only = fit;

  describe.skip = xdescribe;
  describe.only = fdescribe;

  proceed();
}
