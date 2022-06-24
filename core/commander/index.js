// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const program = require('commander');
import { Template } from "../template/index.js"
import { program } from 'commander';
import {config_schema} from './schemas/config_schema.js'
import start from './lib/start.js'
import { ConfCommand } from './lib/config_command.js'

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
    .command('config')
    .alias('c')
    .description('Verify and edit config')
    .action(function () {
      let options = config_schema
      options.commander = commander
      let config_command = new ConfCommand(options);
    });



    program
    // .command('start')
    .alias('s')
    .description('Start os app')
    .action(function () {
      start({commander: commander});
    });

    // allow commander to parse `process.argv`
    program.parse(process.argv);

  }
}
