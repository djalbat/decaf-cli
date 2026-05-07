"use strict";

import { arrayUtilities } from "necessary";

import Runnable from "../runnable";

const { push } = arrayUtilities;

export default class Suite extends Runnable {
  constructor(parentSuite, description, skipped, focused, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks) {
    super(parentSuite);

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

  isFocused() {
    return this.focused;
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
    const skipped = false,
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

  static fromParentSuitDescriptionAndSkipped(parentSuite, description, skipped) {
    const focused = false,
          suites = [],
          tests = [],
          afterHooks = [],
          beforeHooks = [],
          afterEachHooks = [],
          beforeEachHooks = [],
          suite = new Suite(parentSuite, description, skipped, focused, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks);

    return suite;
  }

  static fromParentSuitDescriptionAndFocused(parentSuite, description, focused) {
    const skipped = false,
          suites = [],
          tests = [],
          afterHooks = [],
          beforeHooks = [],
          afterEachHooks = [],
          beforeEachHooks = [],
          suite = new Suite(parentSuite, description, skipped, focused, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks);

    return suite;
  }
}
