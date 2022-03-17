#!/usr/bin/env node
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const { program } = require('commander');

program
.option('--first')
.option('-s, --separator <char>')
.showHelpAfterError();

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
try{
  console.log(program.args[0].split(options.separator, limit));
}catch(e)
{console.log(e)}
