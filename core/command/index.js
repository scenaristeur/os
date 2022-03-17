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
  onEnter(c){
    if(debug) console.log("on enter command", c)


    if(!(Number.isNaN(parseFloat(c.raw)))) { // check if float https://thispointer.com/check-if-string-is-a-number-in-javascript/
      c.array = c.raw.split('.')
      c.index = c.array[0]
      //if(debug) console.log("number", raw, c)
      this.core.choice(c)

    }else{
      c.full = c.raw
      c.array = c.raw.split(' ')
      c.command = c.array[0]
      //c.data = data




      if(debug) console.log(this.core.bases)

      // console.log("core commands ", this.core.core_commands, c.command, this.core.core_commands.includes(c.command))
      if(this.core.core_commands.includes(c.command)){
        // console.log(c.command , "is a core command")
        this.core.onCommand(c)
      }else{
        for (const b of Object.values(this.core.bases)){
          if(debug) console.log(b.active, b.type, b.name)
          if(b.active){
            //  b.test(data)
            b.onCommand(c)
          }
        }
      }
    }
  }
  onRaw(data){
    //  if(debug) console.log("on raw command", data)
  }
}
