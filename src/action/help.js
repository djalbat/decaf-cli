"use strict";

export default function helpAction() {
  console.log(`Usage: 
  
  decaf [<options>] [<command>] [<argument>] 

Commands:

  help                                           Show this help

  version                                        Show the version
  
  test                                           Run the tests
  
Arguments:

  test-directory                                 The root directory of the tests
  
Options:

  --version|-v                                   Show the version

  --help|-h                                      Show this help
  
Further information:

Please see the readme file on GitHub:

  https://github.com/djalbat/decaf-cli
`);
}
