"use strict";

import { packageUtilities } from "necessary";

import { DECAF_CLI } from "../constants";

const { getVersion } = packageUtilities;

export default function versionAction() {
  const version = getVersion(); ///

  console.log(`${DECAF_CLI} version ${version}`);
}
