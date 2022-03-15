import { Template } from "../template/index.js"
export { Command }
let debug = true

class Command extends Template {
  constructor(options = {}) {
    super(options)
    this.type = "command"
  }
  onEnter(data){
    if(debug) console.log("on enter command", data)
  }
  onRaw(data){
  //  if(debug) console.log("on raw command", data)
  }
}
