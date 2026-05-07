"use strict";

import assert from "../assert";
import describe from "../collect/describe";
import fdescribe from "../collect/fdescribe";
import xdescribe from "../collect/xdescribe";
import it from "../collect/it";
import fit from "../collect/fit";
import xit from "../collect/xit";
import after from "../collect/after";
import before from "../collect/before";
import afterEach from "../collect/afterEach";
import beforeEach from "../collect/beforeEach";

import { SKIP,
         ONLY,
         ASSERT,
         DESCRIBE,
         FDESCRIBE,
         XDESCRIBE,
         IT,
         FIT,
         XIT,
         AFTER,
         BEFORE,
         AFTER_EACH,
         BEFORE_EACH } from "../properties";

export default function assignOperation(proceed, abort, context) {
  Object.assign(globalThis, {
    [ASSERT] : assert,
    [DESCRIBE] : (description, callback) => { describe(description, callback, context); },
    [FDESCRIBE] : (description, callback) => { fdescribe(description, callback, context); },
    [XDESCRIBE] : (description, callback) => { xdescribe(description, callback, context); },
    [IT] : (description, callback) => { it(description, callback, context); },
    [FIT] : (description, callback) => { fit(description, callback, context); },
    [XIT] : (description, callback) => { xit(description, callback, context); },
    [AFTER] : (callback) => { after(callback, context); },
    [BEFORE] : (callback) => { before(callback, context); },
    [AFTER_EACH] : (callback) => { afterEach(callback, context); },
    [BEFORE_EACH] : (callback) => { beforeEach(callback, context); },
  });

  globalThis[IT][SKIP] = globalThis[XIT];
  globalThis[IT][ONLY] = globalThis[FIT];

  globalThis[DESCRIBE][SKIP] = globalThis[XDESCRIBE];
  globalThis[DESCRIBE][ONLY] = globalThis[FDESCRIBE];

  proceed();
}
