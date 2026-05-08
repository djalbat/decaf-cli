"use strict";

import { arrayUtilities } from "necessary";

import Runnable from "../runnable";

const { push } = arrayUtilities;

export default class Suite extends Runnable {
  constructor(error, parentSuite, description, skipped, focused, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks) {
    super(error, parentSuite);

    this.description = description;
    this.skipped = skipped;
    this.focused = focused;
    this.suites = suites;
    this.tests = tests;
    this.afterHooks = afterHooks;
    this.beforeHooks = beforeHooks;
    this.afterEachHooks = afterEachHooks;
    this.beforeEachHooks = beforeEachHooks;
  }

  getDescription() {
    return this.description;
  }

  isSkipped() {
    return this.skipped;
  }

  isFocused(focused = false, recursive = true) {
    if (recursive === false) {
      focused = this.focused;
    } else {
      focused = focused || this.focused;

      if (!focused) {
        this.suites.some((suite) => {
          focused = suite.isFocused(focused);

          if (focused) {
            return true;
          }
        });
      }

      if (!focused) {
        this.tests.some((test) => {
          focused = test.isFocused();

          if (focused) {
            return true;
          }
        });
      }
    }

    return focused;
  }

  getSuites() {
    return this.suites;
  }

  getTests(tests = [], recursive = false) {
    push(tests, this.tests);

    if (recursive) {
      this.suites.forEach((suite) => {
        suite.getTests(tests, recursive);
      });
    }

    return tests;
  }

  getAfterHooks() {
    return this.afterHooks;
  }

  getBeforeHooks() {
    return this.beforeHooks;
  }

  getAfterEachHooks(afterEachHooks = []) {
    push(afterEachHooks, this.afterEachHooks);

    const parentSuite = this.getParentSuite();

    if (parentSuite !== null) {
      parentSuite.getAfterEachHooks(afterEachHooks);
    }

    return afterEachHooks;
  }

  getBeforeEachHooks(beforeEachHooks = []) {
    const parentSuite = this.getParentSuite();

    if (parentSuite !== null) {
      parentSuite.getBeforeEachHooks(beforeEachHooks);
    }

    push(beforeEachHooks, this.beforeEachHooks);

    return beforeEachHooks;
  }

  isStrictlyFocused() {
    let strictlyFocused = false;

    const recursive = false;

    let focused = false;

    focused = this.isFocused(focused, recursive);

    if (focused) {
      strictlyFocused = true;
    }

    return strictlyFocused;
  }

  addSuite(suite) {
    this.suites.push(suite);
  }

  addTest(test) {
    this.tests.push(test);
  }

  addAfterHook(afterHook) {
    this.afterHooks.push(afterHook);
  }

  addBeforeHook(beforeHook) {
    this.beforeHooks.push(beforeHook);
  }

  addAfterEachHook(afterEachHook) {
    this.afterEachHooks.push(afterEachHook);
  }

  addBeforeEachHook(beforeEachHook) {
    this.beforeEachHooks.push(beforeEachHook);
  }

  static fromNothing() {
    const parentSuite = null,
          description = null,
          skipped = false,
          focused = false,
          suites = [],
          tests = [],
          afterHooks = [],
          beforeHooks = [],
          afterEachHooks = [],
          beforeEachHooks = [],
          suite = new Suite(parentSuite, description, skipped, focused, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks);

    return suite;
  }

  static fromParentSuiteAndDescription(parentSuite, description) {
    const error = null,
          skipped = false,
          focused = false,
          suites = [],
          tests = [],
          afterHooks = [],
          beforeHooks = [],
          afterEachHooks = [],
          beforeEachHooks = [],
          suite = new Suite(error, parentSuite, description, skipped, focused, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks);

    return suite;
  }

  static fromParentSuitDescriptionAndSkipped(parentSuite, description, skipped) {
    const error = null,
          focused = false,
          suites = [],
          tests = [],
          afterHooks = [],
          beforeHooks = [],
          afterEachHooks = [],
          beforeEachHooks = [],
          suite = new Suite(error, parentSuite, description, skipped, focused, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks);

    return suite;
  }

  static fromParentSuitDescriptionAndFocused(parentSuite, description, focused) {
    const error = null,
          skipped = false,
          suites = [],
          tests = [],
          afterHooks = [],
          beforeHooks = [],
          afterEachHooks = [],
          beforeEachHooks = [],
          suite = new Suite(error, parentSuite, description, skipped, focused, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks);

    return suite;
  }
}
