"use strict";

import { pathToFileURL } from "node:url";

import { pathUtilities, asynchronousUtilities } from "necessary";

import Suite from "../suite";

const { concatenatePaths } = pathUtilities;

const { forEach } = asynchronousUtilities;

export default function collectOperation(proceed, abort, context) {
  const { filePaths } = context,
        depth = 0,
        suite = Suite.fromDepth(depth),
        success = true,
        rootSuite = suite,  ///
        currentSuite = rootSuite;  ///

  Object.assign(context, {
    depth,
    success,
    rootSuite,
    currentSuite
  });

  forEach(filePaths, importFile, () => {
    const { success } = context;

    delete context.depth;
    delete context.success;
    delete context.currentSuite;

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

      console.error(error);

      done();
    });
}
