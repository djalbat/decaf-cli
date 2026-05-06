"use strict";

import { pathToFileURL } from "node:url";

import { pathUtilities, asynchronousUtilities } from "necessary";

const { concatenatePaths } = pathUtilities;

const { forEach } = asynchronousUtilities;

export default function collectOperation(proceed, abort, context) {
  const { filePaths } = context,
        success = true;

  Object.assign(context, {
    success
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
