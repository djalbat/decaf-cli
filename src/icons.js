"use strict";

import { red, green, yellow, bold } from "./utilities/colour";

export const SUCCESS_ICON = bold(green("✓"));
export const FAILURE_ICON = bold(red("✖"));

export const PENDING_ICONS = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
                               .map((PENDING_ICON) => {
                                 return bold(yellow(PENDING_ICON));
                               });

export const PENDING_ICONS_LENGTH = PENDING_ICONS.length;
