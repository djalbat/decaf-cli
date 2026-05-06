"use strict";

import { pathUtilities, fileSystemUtilities } from "necessary";

import { isNameHiddenName } from "../utilities/name";

const { concatenatePaths } = pathUtilities,
      { readDirectory, isEntryDirectory } = fileSystemUtilities;

export default function retrieveFilePathsOperation(proceed, abort, context) {
  const { testDirectoryName } = context,
        currentWorkingDirectoryPath = process.cwd(),
        filePaths = retrieveFilePaths(testDirectoryName, currentWorkingDirectoryPath);

  Object.assign(context, {
    filePaths
  });

  proceed();
}

function retrieveFilePaths(testDirectoryName, currentWorkingDirectoryPath) {
  const filePaths = [],
        relateivePath = testDirectoryName;  ///

  filePathsFromRelativeDirectoryPath(filePaths, relateivePath, currentWorkingDirectoryPath);

  return filePaths;
}

function filePathsFromRelativeDirectoryPath(filePaths, relativePath, currentWorkingDirectoryPath) {
  const absoluteDirectoryPath = concatenatePaths(currentWorkingDirectoryPath, relativePath),
        subEntryNames = readDirectory(absoluteDirectoryPath);

  subEntryNames.forEach((subEntryName) => {
    const subEntryNameHiddenName = isNameHiddenName(subEntryName);

    if (!subEntryNameHiddenName) {
      const path = concatenatePaths(relativePath, subEntryName),
            absolutePath = concatenatePaths(currentWorkingDirectoryPath, path),
            entryDirectory = isEntryDirectory(absolutePath);

      if (entryDirectory) {
        const relativePath = path; ///

        filePathsFromRelativeDirectoryPath(filePaths, relativePath, currentWorkingDirectoryPath); ///
      } else {
        const filePath = path;  ///

        filePaths.push(filePath);
      }
    }
  });
}
