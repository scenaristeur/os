#!/usr/bin/env node

// minimal os tools
let debug = true
// import './bin/index.js';
import { Core } from '../core/index.js';
import { LevelgraphJsonld } from '../core/levelgraph-jsonld/index.js';
let levelgraphJsonld = new LevelgraphJsonld({name: "base de test", active: true})

let core = new Core({bases: {levelgraphJsonld : levelgraphJsonld}})

// console.log("try 'test' then 'ls' or 'find henry' and '2' for selecting")
