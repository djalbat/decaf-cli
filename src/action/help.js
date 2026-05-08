"use strict";

export default function helpAction() {
  console.log(`Usage: 
  
  decaf [<options>] [<command>] [<argument>] 

Commands:

  help                                           Show this help

  version                                        Show the version
  
  test                                           Run the tests
  
Arguments:

  entry                                          The entry point, either a file or a directory
  
Options:

  --version|-v                                   Show the version

  --help|-h                                      Show this help

  --fail-fast|-f                                 Exit on the first failure
  
Further information:

Please see the readme file on GitHub:

  https://github.com/djalbat/decaf-cli
`);
}
