"use strict";

export default class Suite {
  constructor(depth,description, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks) {
    this.depth = depth;
    this.description = description;
    this.suites = suites;
    this.tests = tests;
    this.afterHooks = afterHooks;
    this.beforeHooks = beforeHooks;
    this.afterEachHooks = afterEachHooks;
    this.beforeEachHooks = beforeEachHooks;
  }

  getDepth() {
    return this.depth;
  }

  getDescription() {
    return this.description;
  }

  getSuites() {
    return this.suites;
  }

  getTests() {
    return this.tests;
  }

  getAfterHooks() {
    return this.afterHooks;
  }

  getBeforeHooks() {
    return this.beforeHooks;
  }

  getAfterEachHooks() {
    return this.afterEachHooks;
  }

  getBeforeEachHooks() {
    return this.beforeEachHooks;
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

  static fromDepth(depth) {
    const description = null,
          suites = [],
          tests = [],
          afterHooks = [],
          beforeHooks = [],
          afterEachHooks = [],
          beforeEachHooks = [],
          suite = new Suite(depth, description, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks);

    return suite;
  }

  static fromDepthAndDescription(depth, description) {
    const suites = [],
          tests = [],
          afterHooks = [],
          beforeHooks = [],
          afterEachHooks = [],
          beforeEachHooks = [],
          suite = new Suite(depth, description, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks);

    return suite;
  }
}
