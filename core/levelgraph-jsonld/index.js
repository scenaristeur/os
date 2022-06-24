//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { Template } from "../template/index.js"
export { LevelgraphJsonld }
let home = process.env.HOME
let path = home+"/.os/.universDB"
const { Level } = require('level')
const universDB     = new Level(path),
levelgraph = require('levelgraph'),
jsonld     = require('levelgraph-jsonld'),
opts       = { base: 'http://local/base' },
db         = jsonld(levelgraph(universDB), opts);


var modeleNew = {
  "@context": {
    "@vocab": "http://xmlns.com/foaf/0.1/",
    // "homepage": { "@type": "@id" },
    // "knows": { "@type": "@id" },
    // "based_near": { "@type": "@id" }
  },
  //"@id": "http://manu.sporny.org#person",
  "name": "Manu Sporny",
};


var manu = {
  "@context": {
    "@vocab": "http://xmlns.com/foaf/0.1/",
    "homepage": { "@type": "@id" },
    "knows": { "@type": "@id" },
    "based_near": { "@type": "@id" }
  },
  "@id": "http://manu.sporny.org#person",
  "name": "Manu Sporny",
  "homepage": "http://manu.sporny.org/",
  "knows": [{
    "@id": "https://my-profile.eu/people/deiu/card#me",
    "name": "Andrei Vlad Sambra",
    "based_near": "http://dbpedia.org/resource/Paris"
  }, {
    "@id": "http://melvincarvalho.com/#me",
    "name": "Melvin Carvalho",
    "based_near": "http://dbpedia.org/resource/Honolulu"
  }, {
    "@id": "http://bblfish.net/people/henry/card#me",
    "name": "Henry Story",
    "based_near": "http://dbpedia.org/resource/Paris"
  }, {
    "@id": "http://presbrey.mit.edu/foaf#presbrey",
    "name": "Joe Presbrey",
    "based_near": "http://dbpedia.org/resource/Cambridge"
  }]
};

var paris = 'http://dbpedia.org/resource/Paris';



let debug = true

class LevelgraphJsonld extends Template {
  constructor(options = {}) {
    super(options)
    this.type = "levelgraphJsonld"
    this.db = db
  }


  async onCommand(c){


    if(debug) console.log(c)

    switch (c.command) {
      case "put":
      this.put(c)
      break;
      case 'get':
      this.get(c)
      break;
      case 'search':
      this.search(c)
      break;
      case 'ls':
      this.ls(c)
      break;
      case 'test':
      await this.test(c)
      break;
      case 'find':
      this.find(c)
      break;
      case 'last':
      this.last(c)
      break;
      case 'add':
      this.add(c)
      break;
      case 'create':
      case 'new':
      this.new(c)
      break;
      default:
      console.log("unknown levelgraph command", c)
    }

  }


  ///////////////////////////////////////////////////////////////////////
  //QUERIES
  /////////////////////////////////////

  new(data){
    console.log("new", data)
    let name = data.array[1]
    console.log("new with name", name)
    let neurone = modeleNew
    neurone['@id'] = opts.base+'/'+name
    neurone.name = name
    this.db.jsonld.put(neurone, opts,  this.core.display.bind(this), function(err, obj) {
    // do something after the obj is inserted
    console.log("error",err)
    console.log("obj", obj)
  });
  }

  create(data){
    console.log("create",data)
      this.db.jsonld.put(data, opts,  this.core.display.bind(this), function(err, obj) {
      // do something after the obj is inserted
      console.log("error",err)
      console.log("obj", obj)
    });
  }



  add(data){
    console.log("command add", data)
    console.log(this.core.lastResponseObject,"\n",
    this.core.lastResponseObject,
    this.core.lastResponseObject['@id'])
    // let key = data.array[1]
    // let add_update = {"@id" : this.core.lastResponseObject['@id']}
    // add_update[data.array[1]] = data.array[2]

    var nested = {
      // "@context": {
      //   "name": "http://xmlns.com/foaf/0.1/name",
      //   "knows": "http://xmlns.com/foaf/0.1/knows"
      // },
      // "@id": "http://matteocollina.com",
      // "name": "Matteo",
      // "knows": [{
      //   "name": "Daniele"
      // }, {
      //   "name": "Lucio"
      // }]
    };
    nested['@context'] = manu['@context']
    nested['@id'] = this.core.lastResponseObject['@id']
    nested[data.array[1]] = data.array[2]
    console.log (nested)

    this.db.jsonld.put(nested, { '@context': manu['@context'] }, this.core.display.bind(this))


  }



  put(data){
    if(debug) console.log("on put jsonld", data)
  }
  get(data){

    if(debug) console.log("on get jsonld", data)
    if (data.subject == undefined ){
      console.log("error, no parameter data.subject for the get command", data)
    }else{

      this.db.jsonld.get(data.subject, { '@context': manu['@context'] }, this.core.display.bind(this))
    }
  }





  //////////////////////////
  //CLI : ls, find, search ...
  ///////////////////////////
  ls(data){
    if(debug) console.log(data)
    let module = this
    let db = this.db
    db.search([
      {
        subject: db.v('subject'),
        predicate: db.v('predicate'),
        object: db.v('object')
      },
    ], function(err, solution) {
      console.log(err),
      console.log(solution)
      module.core.displayList({header: "LS: ", list: solution})
    });
  }

  find(data){
    let module = this
    let db = this.db
    if(debug)  console.log(data)

    let term = data.what || data.array[1] // data.what pour commander.js / à corriger : data.array[1] dans prompt/command
    if(debug) console.log(term)
    db.search({
      subject: db.v('subject'),
      predicate: db.v('predicate'),
      object: db.v('object'),
      filter: function filter(triple) {
        return (triple.subject != undefined && triple.subject.includes(term) )
        || (triple.predicate!= undefined && triple.predicate.includes(term) )
        || (triple.object != undefined && triple.object.includes(term) );
      }
    }, function process(err, results) {

      module.core.displayList({header: "FINDING "+term, list: results})


      // results will not contain any triples that
      // have 'daniele' as object
    });
  }







  search(data){
    if(debug) console.log(data)
    let module = this
    let db = this.db
    db.search([
      {
        subject: manu['@id'],
        predicate: 'http://xmlns.com/foaf/0.1/knows',
        object: db.v('webid')
      },
      {
        subject: db.v('webid'),
        predicate: 'http://xmlns.com/foaf/0.1/based_near',
        object: paris
      }, {
        subject: db.v('webid'),
        predicate: 'http://xmlns.com/foaf/0.1/name',
        object: db.v('name')
      }
    ], function(err, results) {

      console.log(err),
      console.log(results)
      module.core.displayList({header: "SEARCH "+ "todo parametrized search", list: results})
      // solution contains
      // [{
      //   webid: 'http://bblfish.net/people/henry/card#me',
      //   name: '"Henry Story"'
      // }, {
      //   webid: 'https://my-profile.eu/people/deiu/card#me',
      //   name: '"Andrei Vlad Sambra"'
      // }]
    });
  }









  ////////////////////////
  // TEST
  //////////////////

  async test(data){
    await this.putmanu(data)
    await this.getmanu(data)
  }

  async getmanu (data){
    if(debug)  console.log("!!!GET", data)
    if(debug)  await this.db.jsonld.get(manu['@id'], { '@context': manu['@context'] }, this.core.display.bind(this))
  }
  async putmanu(data){
    if(debug)  console.log("!!!PUT", data)
    await this.db.jsonld.put(manu, this.core.display.bind(this))
  }



}
