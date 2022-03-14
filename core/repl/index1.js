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

// A remote node repl that you can telnet to!
net
  .createServer(function (socket) {
    const remote = repl.start('node::remote> ', socket);
    // Adding "mood" and "bonus" to the remote REPL's context.
    remote.context.mood = mood;
    remote.context.bonus = 'UNLOCKED';
  })
  .listen(5001);

console.log('Remote REPL started on port 5001.');
console.log('try mood() or bonus from remote')

// A "local" node repl with a custom prompt
const local = repl.start('node::local> ');

// Exposing the function "mood" to the local REPL's context.
local.context.mood = mood;
