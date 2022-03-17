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
    this.core_commands = ['cp', 'paste', 'last']
    this.pwd =  process.env.PWD
    this.lang = process.env.LANG
    this.language = process.env.LANGUAGE
    this.prompt = new Prompt({core: this})
    this.command = new Command({core: this})
    this.lastResponseArray = null
    this.lastResponseObject = null
    this.clipboard = []
    this.objectsHistory = []
    this.populateBaseWithCore()
  }
  populateBaseWithCore(){
    for (const b of Object.values(this.bases)){
      b.core = this
    }
  }

  onCommand(data){
    let raw = data.raw
    let c = {}


    if(!(Number.isNaN(parseFloat(raw)))) { // check if float https://thispointer.com/check-if-string-is-a-number-in-javascript/
      c.array = raw.split('.')
      c.index = c.array[0]
      //if(debug) console.log("number", raw, c)
      this.choice(c)

    }else{
      c.full = raw
      c.array = raw.split(' ')
      c.command = c.array[0]
      if(debug) console.log(c)

      switch (c.command) {
        case 'last':
        this.last(c)
        break;
        case 'cp':
        this.cp(c)
        break;
        default:
        console.log("unknown", c)
      }
    }
  }


  choice(c){
    if(this.lastResponseArray[c.index] != undefined){
      let subject = this.lastResponseArray[c.index].subject || this.lastResponseArray[c.index]['@id'] // to catch displayIdList results
      if(debug)console.log("choice",subject)
      if(debug)console.log('todo get number after dot to to through le result')
      //this.get(subject)
      this.command.onEnter({raw: 'get', subject: subject})
    }else{
      console.log("no subject at "+c.index)
    }
  }


  onPrompt(data){
    if (data.action == 'exit'){
      process.exit()
    }
    else{
      this.command.onPrompt(data)
    }
  }
  log(data){
    let date = Date.now()
    console.log("\n------------------------"+data.message+" -", date,"\n",data.data,"\n========================"+data.message+"\n\n")
  }
  last(data){
    console.log("HISTORY", this.objectsHistory)
    this.lastResponseArray = this.objectsHistory
    this.displayIdList(this.objectsHistory)
  }

  cp(data){
    let param = data.array[1]
    let p = param.split('.')
    console.log(p)
    console.log(this.lastResponseArray[p[0]])
    let triple = this.lastResponseArray[p[0]]
    let val = triple.subject
    if(p[1] != undefined){
      if (p[1] == 1) val = triple.predicate
      if (p[1] == 2) val = triple.object
      //val = Object.entries(triple).map(x=> x[p[1]])
    }
    console.log("copied", val)
    this.clipboard.unshift(val)
    console.log("clipboard", this.clipboard)
  }


  /////////////////////////////////////////////
  //DISPLAY
  //////////////////////////////////////////////
  display(err, data){

    if(err){
      console.log("\n-----ERROR\n",err)
    }else{
      this.core.log({message: "RESULT", data: data})
    }
    this.core.lastResponseObject = data
    this.core.objectsHistory.unshift(this.core.lastResponseObject)
    // console.log("history", this.objectsHistory)
  }



  displayIdList(data){
    this.lastResponseArray = data
    for (let i= 0; i < data.length; i++){
      console.log(i, data[i]['@id'])
    }
  }


  displayList(data){
    this.lastResponseArray = data.list
    let list  = data.list.map(function(x, index){

      let l =
      {
        //  id: index,
        subject: x.subject,
        p_id: index+.1,
        predicate: x.predicate.substring(x.predicate.lastIndexOf('/') + 1),
        o_id: index+.2,
        object: x.object
      }
      return l

    })
    // let list  = data.list.map((x, index) => Object.assign({}, x,
    //   {
    //     id: index,
    //     predicate: index+".1"+x.predicate.substring(x.predicate.lastIndexOf('/') + 1),
    //     object: index+.2+x.object
    //   }))
    console.table(list)
  }
  displayList1(data){
    console.clear()
    let predicate_short = true
    this.lastResponseArray = data.list
    if(data.header)console.log("------------\n",data.header,"\n")
    console.log("------------\n")
    for (let i= 0; i < data.list.length ; i++){
      let r = data.list[i]
      if(r.subject != undefined && r.predicate != undefined && r.subject != undefined)
      {
        let pred = predicate_short ? r.predicate.substring(r.predicate.lastIndexOf('/') + 1) :  r.predicate
        console.log(i,r.subject, "\t\t",i+.1, pred , "\t\t",i+.2, r.object )
      } else{
        console.log(r)
      }

    }
    console.log("\n------------\n")
  }



}
