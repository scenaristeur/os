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
jsonld     = require('levelgraph-jsonld');
// db         = jsonld(levelgraph(universDB), opts);

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

export { Univers }

class Univers{
  constructor(options = {}) {
    this.db = jsonld(levelgraph(universDB), opts);
    //super(options)
    //options['type'] == undefined ? this['type'] = "univers": ""
    // this.options = options
    // this.init()
  }
  debug(){
    console.log(this)
  }

  // init(){
  //   this.jsonld_base = db.jsonld
  //   console.log(dbName+" DB created")
  //   console.log(this.jsonld_base)
  //   return this.jsonld_base
  //

  async put(data){
    const myTimeout = setTimeout(this.myGreeting, 5000);


    // return await setTimeout(async function() {
    //   // await fn(par);
    //   console.log("waiti")
    // }, 3000/*, fn, par*/);
  }

  myGreeting() {
    console.log("Happy Birthday!")
  }
  async get(data){
    const myTimeout = setTimeout(this.myGreeting, 5000);


    // return await setTimeout(async function() {
    //   // await fn(par);
    //   console.log("waiti")
    // }, 3000/*, fn, par*/);
  }


  put(data, cb){
    // console.log("put ",data)
    // manu.name += Date.now()
    // this.db.put(manu, function(err, obj) {
    //   console.log(err)
    //   console.log(obj)
    // });
    let db = this.db

    return new Promise(resolve => {
      this.db.put(manu, response => resolve(response));
    });
    //return "- univers put"
  }

  get (data, cb){
    let db = this.db
    return new Promise(resolve => {
      db.get(manu['@id'], { '@context': manu['@context'] }, response => resolve(response));
    });

    // return
    // this.db.get(manu['@id'], { '@context': manu['@context'] }, function(err, obj) {
    //   // obj will be the very same of the manu object
    //   console.log(err)
    //   console.log(obj)
    // });
    // , async function(data){
    //   return  `${data}`
    // })
    //return "- univers get"
  }
  consoleCallback(err, data){


  }

}
