//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { Template } from "../template/index.js"
export { LevelgraphJsonld }

const level      = require('level'),
universDB     = level('./universDB'),
levelgraph = require('levelgraph'),
jsonld     = require('levelgraph-jsonld'),
db         = jsonld(levelgraph(universDB));



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


  onCommand(data){
    let raw = data.raw
    let c = {}

    if(!(Number.isNaN(parseFloat(raw)))) { // check if float https://thispointer.com/check-if-string-is-a-number-in-javascript/
      c.array = raw.split('.')
      c.index = c.array[0]
      //if(debug) console.log("number", raw, c)
      this.core.choice(c)

    }else{
      c.full = raw
      c.array = raw.split(' ')
      c.command = c.array[0]
      c.data = data
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
        this.test(c)
        break;
        case 'find':
        this.find(c)
        break;
        case 'last':
        this.last(c)
        break;
        default:
        console.log("unknown", c)
      }
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

    let term = data.array[1]
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






  ///////////////////////////////////////////////////////////////////////
  //QUERIES
  /////////////////////////////////////

  put(data){
    if(debug) console.log("on put jsonld", data)
  }
  get(data){

  if(debug) console.log("on get jsonld", data)
  if (data.data.subject == undefined ){
    console.log("error, no parameter data.data.subject for the get command", data)
  }else{

    this.db.jsonld.get(data.data.subject, { '@context': manu['@context'] }, this.core.display.bind(this))
  }
  }




  ////////////////////////
  // TEST
  //////////////////

  test(data){
    this.putmanu(data)
    this.getmanu(data)
  }

  getmanu (data){
    if(debug)  console.log("!!!GET", data)
    if(debug)  this.db.jsonld.get(manu['@id'], { '@context': manu['@context'] }, this.core.display)
  }
  putmanu(data){
    if(debug)  console.log("!!!PUT", data)
    this.db.jsonld.put(manu, this.core.display)
  }



}
