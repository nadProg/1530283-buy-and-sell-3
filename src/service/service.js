'use strict';

const {Cli} = require(`./cli`);
const {
  DEFAULT_COMMAND,
  ExitCode
} = require(`../constants`);

const [,, ...userArguments] = process.argv;
const [userCommand, ...commandParameters] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.SUCCESS);
}

Cli[userCommand].run(commandParameters);
