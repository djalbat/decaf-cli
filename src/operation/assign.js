"use strict";

import it from "../collect/it";
import xit from "../collect/xit";
import describe from "../collect/describe";
import xdescribe from "../collect/xdescribe";
import after from "../collect/after";
import before from "../collect/before";
import afterAll from "../collect/afterAll";
import beforeAll from "../collect/beforeAll";
import afterEach from "../collect/afterEach";
import beforeEach from "../collect/beforeEach";

export default function assignOperation(proceed, abort, context) {
  Object.assign(globalThis, {
    "it" : (description, testFunction) => { it(description, testFunction, context); },
    "xit" : (description, testFunction) => { xit(description, testFunction, context); },
    "describe" : (description, testFunction) => { describe(description, testFunction, context); },
    "xdescribe" : (description, testFunction) => { xdescribe(description, testFunction, context); },
    "after" : (description) => { after(description, context); },
    "before" : (description) => { before(description, context); },
    "afterAll" : (description) => { afterAll(description, context); },
    "beforeAll" : (description) => { beforeAll(description, context); },
    "afterEach" : (description) => { afterEach(description, context); },
    "beforeEach" : (description) => { beforeEach(description, context); },
  });

  proceed();
}
