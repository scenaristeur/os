import { Template } from "../template/index.js"
export { Command }
let debug = false

class Command extends Template {
  constructor(options = {}) {
    super(options)
    this.type = "command"
  }
  onPrompt(data){
    switch (data.action) {
      case "exit":
      process.exit();
      break;
      case "enter":
      if (debug) console.log("from prompt enter", data.raw)
      this.onEnter(data)
      break;
      case "raw":
      if (debug) console.log(" from prompt raw", data.raw)
      this.onRaw(data)
      break;
      default:
      if (debug) console.log(" UNKNOWN from prompt", data)
    }
  }
  onEnter(data){
    if(debug) console.log("on enter command", data)
    if(debug) console.log(this.core.bases)


    if(data.raw == "last"){
      this.core.onCommand(data)
    }else{
      for (const b of Object.values(this.core.bases)){
        if(debug) console.log(b.active, b.type, b.name)
        if(b.active){
          //  b.test(data)
          b.onCommand(data)
        }
      }
    }
  }
  onRaw(data){
    //  if(debug) console.log("on raw command", data)
  }
}
