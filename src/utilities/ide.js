"use strict";

export function escape(text) {
  return text
    .replace(/\|/g, "||")
    .replace(/'/g, "|'")
    .replace(/\n/g, "|n")
    .replace(/\r/g, "|r")
    .replace(/\[/g, "|[")
    .replace(/]/g, "|]");
}
