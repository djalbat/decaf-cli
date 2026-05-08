"use strict";

import { pathUtilities, fileSystemUtilities } from "necessary";

import { isNameHiddenName } from "../utilities/name";

const { concatenatePaths } = pathUtilities,
      { readDirectory, isEntryDirectory } = fileSystemUtilities;

export default function retrieveFilePathsOperation(proceed, abort, context) {
  const { entryPath } = context,
        currentWorkingDirectoryPath = process.cwd();

  Object.assign(context, {
    currentWorkingDirectoryPath
  });

  const filePaths = retrieveFilePaths(entryPath, context);

  Object.assign(context, {
    filePaths
  });

  delete context.currentWorkingDirectoryPath;

  proceed();
}

function retrieveFilePaths(entryPath, context) {
  const filePaths = [],
        relateivePath = entryPath;  ///

  filePathsFromRelativeDirectoryPath(filePaths, relateivePath, context);

  return filePaths;
}

function filePathsFromRelativeDirectoryPath(filePaths, relativePath, context) {
  const { currentWorkingDirectoryPath } = context,
        absolutePath = concatenatePaths(currentWorkingDirectoryPath, relativePath),
        entryDirectory = isEntryDirectory(absolutePath);

  if (entryDirectory) {
    const directoryPath = absolutePath, ///
          subEntryNames = readDirectory(directoryPath);

    subEntryNames.forEach((subEntryName) => {
      const subEntryNameHiddenName = isNameHiddenName(subEntryName);

      if (!subEntryNameHiddenName) {
        const path = concatenatePaths(relativePath, subEntryName);

        if (entryDirectory) {
          const relativePath = path; ///

          filePathsFromRelativeDirectoryPath(filePaths, relativePath, context); ///
        } else {
        }
      }
    });
  } else {
    const filePath = absolutePath;  ///

    filePaths.push(filePath);
  }
}
