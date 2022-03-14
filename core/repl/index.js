#!/usr/bin/env node
//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let db
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

var manu = {
  "@context": {
    "name": "http://xmlns.com/foaf/0.1/name",
    "homepage": {
      "@id": "http://xmlns.com/foaf/0.1/homepage",
      "@type": "@id"
    }
  },
  "@id": "http://manu.sporny.org#person",
  "name": "Manu Sporny",
  "homepage": "http://manu.sporny.org/"
};


let put = function() {
  // let date = Date.now()
  manu.name += Date.now()
  // var triple = { subject: "a", predicate: "b", subject: date}
  db.put(manu, function(err, obj){
    console.log("PUT OBJ", obj)
    //return err || "put done"
    //console.log("put done")
    // return "triple inserted"
  })
  return "put done"
}

let get = function() {
  //let res = "oho"
  db.get(manu['@id'], { '@context': manu['@context'] }, consoleCallback)

  //
  // , function(err, obj) {
  //   console.log(obj)
  //   return  obj
  //   // obj will be the very same of the manu object
  //   //console.log("#########################\n YOU GOT IT ! \n", obj)
  //   //  return obj
  // });
  // return "OK MAN "+`${res}`
  return "get done"
}

let consoleCallback = function(err,data){
  console.log("BIP IS ", data)
  return data
}

let context = {
  "ls": "hum hum this should show",
  "cd": "should change dir",
  "say": say,
  "put": put,
  "get": get
}

// A remote node repl that you can telnet to!

export { Repl }

class Repl{
  constructor(options = {}) {
    Object.assign(context, options.context)
    this.db = db = options.db
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
    const local = repl.start('node::local> ');
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


  }
}
