"use strict";

import { pathUtilities, fileSystemUtilities } from "necessary";

import { isNameHiddenName } from "../utilities/name";

const { concatenatePaths } = pathUtilities,
      { readDirectory, isEntryDirectory } = fileSystemUtilities;

export default function retrieveFilePathsOperation(proceed, abort, context) {
  const { testDirectoryName } = context,
        filePaths = retrieveFilePaths(testDirectoryName, context);

  Object.assign(context, {
    filePaths
  });

  proceed();
}

function retrieveFilePaths(testDirectoryName, context) {
  const filePaths = [],
        relateivePath = testDirectoryName;  ///

  filePathsFromRelativeDirectoryPath(filePaths, relateivePath, context);

  return filePaths;
}

function filePathsFromRelativeDirectoryPath(filePaths, relativePath, context) {
  const { currentWorkingDirectoryPath } = context,
        absoluteDirectoryPath = concatenatePaths(currentWorkingDirectoryPath, relativePath),
        subEntryNames = readDirectory(absoluteDirectoryPath);

  subEntryNames.forEach((subEntryName) => {
    const subEntryNameHiddenName = isNameHiddenName(subEntryName);

    if (!subEntryNameHiddenName) {
      const path = concatenatePaths(relativePath, subEntryName),
            absolutePath = concatenatePaths(currentWorkingDirectoryPath, path),
            entryDirectory = isEntryDirectory(absolutePath);

      if (entryDirectory) {
        const relativePath = path; ///

        filePathsFromRelativeDirectoryPath(filePaths, relativePath, context); ///
      } else {
        const filePath = path;  ///

        filePaths.push(filePath);
      }
    }
  });
}
