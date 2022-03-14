#!/usr/bin/env node
//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let univers
const net = require('net');
const repl = require('repl');

const mood = function () {
  const m = ['^__^', '-___-;', '>.<', '<_>'];
  return m[Math.floor(Math.random() * m.length)];
};

const say = function(text) {
  console.log('I say ', text)
  return "ok"
}



//
// let put1 = function(data = "test") {
//   // return univers.put(data)
//    let res = new Promise(resolve => {
//     univers.put(data, response => resolve(`${response}`));
//   });
//   console.log(res)
//   return res
//   //return "--put"
// }
//
// let get = function(data) {
// let res = new Promise(resolve => {
//     univers.get(data, response => resolve(`${response}`));
//   });
//   console.log(res)
//   return res
//    // return univers.get(data)
// }

// let consoleCallback =  function(err,data){
//   let result = `${JSON.stringify(data)}`
//   // console.log("àààààààà result", result)
//   if(err){
//     return err
//   }else{
//     return result
//   }

// }

let context = {
  "ls": "hum hum this should show",
  "cd": "should change dir",
  "say": say,
  // "put": put,
  // "get": get
}

// A remote node repl that you can telnet to!

export { Repl }

class Repl{
  constructor(options = {}) {
    Object.assign(context, options.context)
    univers = options.univers
    this.init()
    // return "---- done"
  }
  debug(){
    console.log(this)
  }

  init(){
    let module = this
    net
    .createServer(function (socket) {
      const remote = repl.start('node::remote> ', socket);
      module.defineCommands(remote)
      // Adding "mood" and "bonus" to the remote REPL's context.
      remote.context.mood = mood;
      remote.context.bonus = 'UNLOCKED';

    })
    .listen(5001);

    console.log('Remote REPL started on port 5001.');
    console.log('###try "mood()" or "bonus" from remote')
    console.log("###try '.sayhello Bob' . Be carefull : '.saybye' will close the app!")
    console.log("###try say('truc') ")

    // A "local" node repl with a custom prompt
    let local = this.local =  repl.start('node::local> ');
    this.defineCommands(local)

    // Exposing the function "mood" to the local REPL's context.
    local.context.mood = mood;

  }

  defineCommands(server){
    console.log(context)
    Object.assign(server.context, context)
    server.defineCommand('sayhello', {
      help: 'Say hello',
      action(name) {
        this.clearBufferedCommand();
        console.log(`Hello, ${name}!`);
        this.displayPrompt();
      }
    });
    server.defineCommand('saybye', function saybye() {
      console.log('Goodbye the server is closed!');
      this.close();
    });
    server.defineCommand('put', {
      help: 'Put',
      async action(data){
        console.log('put');
        let res = await univers.put()
        console.log('put  after', res)
        this.displayPrompt();
      }

    });
    server.defineCommand('get', {
      help: 'get',
      async action(data){
        console.log('get before');
        let res = await univers.put()
        console.log('get after', res);
        this.displayPrompt();
      }
    });


  }
  displayPrompt(){
    this.local.displayPrompt()
  }
}
