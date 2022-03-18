// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const program = require('commander');
import { Template } from "../template/index.js"
import { program } from 'commander';

import start from './lib/start.js'




export { Commander }

class Commander extends Template{
  constructor(options = {}) {
    super(options)
    this.history = []
    this.raw = ""
    this.init()
  }
  init(){
    let commander = this
    program
    .command('start')
    .alias('s')
    .description('Start os app')
    .action(function () {
      start({commander: commander});
    });

    // allow commander to parse `process.argv`
    program.parse(process.argv);

  }
}
