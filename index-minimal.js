// minimal os tools
import { Univers } from './core/levelgraph-jsonld/index.js';
import { Repl } from './core/repl/index.js';

let univers = new Univers()
let repl = new Repl({context:{univers: univers}})

// console.log("univers", univers)
console.log("\n---------------------------- OS minimal is running\n")

console.log("use Ctrl+C two times to exit\n")
console.log("!!!!!!\n!!!!!!\n!!!!!! Press Enter to show the prompt if not available\n!!!!!!\n!!!!!!\n!!!!!!\n")
