"use strict";

import { pathToFileURL } from "node:url";

import { pathUtilities, asynchronousUtilities } from "necessary";

import Suite from "../suite";

const { concatenatePaths } = pathUtilities;

const { forEach } = asynchronousUtilities;

export default function collectOperation(proceed, abort, context) {
  const { filePaths } = context,
        suite = Suite.fromNothing(),
        success = true,
        rootSuite = suite,  ///
        currentSuite = rootSuite;  ///

  Object.assign(context, {
    success,
    rootSuite,
    currentSuite
  });

  forEach(filePaths, importFile, () => {
    const { success } = context;

    delete context.success;

    success ?
      proceed() :
        abort();
  }, context);
}

function importFile(filePath, next, done, context) {
  const { currentWorkingDirectoryPath } = context,
        absoluteFilePath = concatenatePaths(currentWorkingDirectoryPath, filePath),
        path = absoluteFilePath,  ///
        fileUrl = pathToFileURL(path),
        { href } = fileUrl,
        specifier = href; ///

  new Function("specifier", "return import(specifier)")(specifier)
    .then(next)
    .catch((error) => {
      const success = false;

      Object.assign(context, {
        success
      });

      console.log(error);

      done();
    });
}
