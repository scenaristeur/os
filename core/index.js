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
    console.log(this.command)
  }
  onPrompt(data){
    switch (data.action) {
      case "exit":
      process.exit();
      break;
      case "enter":
      if (debug) console.log("from prompt enter", data.raw)
      this.command.onEnter(data)
      break;
      case "raw":
      if (debug) console.log("from prompt raw", data.raw)
      this.command.onRaw(data)
      break;
      default:
      if (debug) console.log("UNKNOWN from prompt", data)
    }
  }
}
