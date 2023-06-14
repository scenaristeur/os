#!/usr/bin/env node

// minimal os tools
let debug = true
// import './bin/index.js';
import { Core } from '../core/index.js';
import { CommunitySolidServer } from '../core/community-solid-server/index.js';
let communitySolidServer = new CommunitySolidServer({name: "base de test", active: true})

let core = new Core({bases: {communitySolidServer : communitySolidServer}})

// console.log("try 'test' then 'ls' or 'find henry' and '2' for selecting")
