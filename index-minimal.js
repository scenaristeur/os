// minimal os tools
let debug = true
import { Core } from './core/index.js';
import { User } from './core/user/index.js';

import { Univers } from './core/levelgraph-jsonld/index.js';
import { Repl } from './core/repl/index.js';

let core = new Core()
let user = new User()




let _univers = new Univers()
let jlb = _univers.jsonld_base // jsonld_base
let repl = new Repl({db: jlb})

if (debug == true){
  core.debug()
  user.debug()
  _univers.debug()
  repl.debug()
}

// console.log("univers", univers)
console.log("\n---------------------------- OS minimal is running\n")

console.log("use Ctrl+C two times to exit\n")
console.log("!!!!!!\n!!!!!!\n!!!!!! Press Enter to show the prompt if not available\n!!!!!!\n!!!!!!\n!!!!!!\n")
