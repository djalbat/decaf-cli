"use strict";

import { arrayUtilities } from "necessary";

const { push } = arrayUtilities;

export default class Suite {
  constructor(description, parentSuite, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks) {
    this.description = description;
    this.parentSuite = parentSuite;
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

  getParentSuite() {
    return this.parentSuite;
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

  getAfterEachHooks(afterEachHooks = []) {
    push(afterEachHooks, this.afterEachHooks);

    if (this.parentSuite !== null) {
      this.parentSuite.getAfterEachHooks(afterEachHooks);
    }

    return afterEachHooks;
  }

  getBeforeEachHooks(beforeEachHooks = []) {
    if (this.parentSuite !== null) {
      this.parentSuite.getBeforeEachHooks(beforeEachHooks);
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
    const description = null,
          parentSuite = null,
          suites = [],
          tests = [],
          afterHooks = [],
          beforeHooks = [],
          afterEachHooks = [],
          beforeEachHooks = [],
          suite = new Suite(description, parentSuite, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks);

    return suite;
  }

  static fromDescriptionAndParentSuite(description, parentSuite) {
    const suites = [],
          tests = [],
          afterHooks = [],
          beforeHooks = [],
          afterEachHooks = [],
          beforeEachHooks = [],
          suite = new Suite(description, parentSuite, suites, tests, afterHooks, beforeHooks, afterEachHooks, beforeEachHooks);

    return suite;
  }
}
