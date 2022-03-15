// minimal os tools
import { Template } from "./template/index.js"
import { Prompt } from './prompt/index.js';
import { Command } from './command/index.js';

let debug = false

export { Core }

class Core extends Template{
  constructor(options = {}) {
    super(options)
    this.type = "core"
    this.pwd =  process.env.PWD
    this.lang = process.env.LANG
    this.language = process.env.LANGUAGE
    this.prompt = new Prompt({core: this})
    this.command = new Command({core: this})
  }
  onPrompt(data){
    if (data.action == 'exit'){
      process.exit()
    }
    else{
      this.command.onPrompt(data)
    }
  }
}
