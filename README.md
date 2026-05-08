# Decaf-CLI

Caffeine free tests and assertions.

Decaf is inspired by [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).
It is simpler under the hoood, however, and therefore runs more quickly and has far fewer dependencies.

## Installation

You can install Decaf via [npm](https://www.npmjs.com/):
 
    npm install decaf-cli
    
There is no need to install it globally, the recommended approach is to run it by way of [npm sciprts](https://docs.npmjs.com/misc/scripts). 
If you do decide to install it globally, however, you may need to prepend [`sudo`](https://en.wikipedia.org/wiki/Sudo), depending on your setup.

If you would like to contribute or would simply like to have a look at the code, you can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/decaf-cli.git

...then install the dependencies with npm from within the project's root directory:

    npm install

## Usage

Decaf has the following commands and options:

```
  decaf [<options>] [<command>] [<argument>] 

Commands:

  help                                           Show this help

  version                                        Show the version
  
  test                                           Run the tests
  
Arguments:

  test-directory                                 The tests directory
  
Options:

  --version|-v                                   Show the version

  --help|-h                                      Show this help

  --fail-fast|-f                                 Exit on the first failure
```

There is really only one use case, namely running the tests.
In order to do so, run the following command:

    decaf test

Note that there is no need to specify the `test` command, the `test` here is the name of the test directory.

The only option to use when running tests is `fail-fast`, which will cause Decaf to exit the first time a test fails.

Note that Decaf will return a zero exit code upon success and a non-zero exit code upon failure.

## Contact

* james.smith@djalbat.com
