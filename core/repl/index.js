#!/usr/bin/env node
//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

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

let context = {
  "ls": "hum hum this should show",
  "cd": "should change dir",
  "say" : say
}

// A remote node repl that you can telnet to!

export { Repl }

class Repl{
  constructor(options = {}) {

    this.init()
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
    console.log('try "mood()" or "bonus" from remote')
    console.log("try '.sayhello Bob' or '.saybye'")

    // A "local" node repl with a custom prompt
    const local = repl.start('node::local> ');
    this.defineCommands(local)

    // Exposing the function "mood" to the local REPL's context.
    local.context.mood = mood;

  }

  defineCommands(server){
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
