"use strict";

import { pathToFileURL } from "node:url";

import { asynchronousUtilities } from "necessary";

import Suite from "../runnable/suite";

const { forEach } = asynchronousUtilities;

export default function collectRunnablesOperation(proceed, abort, context) {
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
    delete context.currentSuite;

    success ?
      proceed() :
        abort();
  }, context);
}

function importFile(filePath, next, done, context) {
  const filePathJavaScrioptPath = isFilePathJavaScriptFilePath(filePath);

  if (!filePathJavaScrioptPath) {
    next();

    return;
  }

  const path = filePath,  ///
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

const javaScriptFilePathRegularExpression = /\.(js|cjs|mjs)$/i;

function isFilePathJavaScriptFilePath(filePath) {
  const filePathJavaScrioptPath = javaScriptFilePathRegularExpression.test(filePath,);

  return filePathJavaScrioptPath;
}