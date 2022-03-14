//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let dbPath = 'universDB'
let dbName = 'univers'

const level= require('level'),
universDB  = level('./'+dbPath),
levelgraph = require('levelgraph'),
jsonld     = require('levelgraph-jsonld'),
db         = jsonld(levelgraph(universDB));

export { Univers }

class Univers{
  constructor(options = {}) {

    //super(options)
    //options['type'] == undefined ? this['type'] = "univers": ""
    // this.options = options
    return this.init()
  }

  init(){
    const univers = db.jsonld
    console.log(dbName+" DB created")

    return univers
  }
}
