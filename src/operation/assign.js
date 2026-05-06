"use strict";

import assert from "../assert";
import describe from "../collect/describe";
import xdescribe from "../collect/xdescribe";
import it from "../collect/it";
import xit from "../collect/xit";
import after from "../collect/after";
import before from "../collect/before";
import afterEach from "../collect/afterEach";
import beforeEach from "../collect/beforeEach";

export default function assignOperation(proceed, abort, context) {
  Object.assign(globalThis, {
    "assert" : assert,
    "describe" : (description, callback) => { describe(description, callback, context); },
    "xdescribe" : (description, callback) => { xdescribe(description, callback, context); },
    "it" : (description, callback) => { it(description, callback, context); },
    "xit" : (description, callback) => { xit(description, callback, context); },
    "after" : (callback) => { after(callback, context); },
    "before" : (callback) => { before(callback, context); },
    "afterEach" : (callback) => { afterEach(callback, context); },
    "beforeEach" : (callback) => { beforeEach(callback, context); },
  });

  proceed();
}
