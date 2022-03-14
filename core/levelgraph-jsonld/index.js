//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let dbPath = 'universDB'
let dbName = 'univers'
let hostname= process.env.HOSTNAME || 'local'
let opts   = { base: hostname }

const level= require('level'),
universDB  = level('./'+dbPath),
levelgraph = require('levelgraph'),
jsonld     = require('levelgraph-jsonld'),
db         = jsonld(levelgraph(universDB), opts);

export { Univers }

class Univers{
  constructor(options = {}) {

    //super(options)
    //options['type'] == undefined ? this['type'] = "univers": ""
    // this.options = options
    this.init()
  }
  debug(){
    console.log(this)
  }

  init(){
    this.jsonld_base = db.jsonld
    console.log(dbName+" DB created")
    console.log(this.jsonld_base)
    return this.jsonld_base

  }
}
