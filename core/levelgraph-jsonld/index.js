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


// console.log(db)
try{
  const univers = db.jsonld
  console.log(dbName+" DB created")
}catch(e){
  console.log(e)
}

// var manu = {
//   "@context": {
//     "name": "http://xmlns.com/foaf/0.1/name",
//     "homepage": {
//       "@id": "http://xmlns.com/foaf/0.1/homepage",
//       "@type": "@id"
//     }
//   },
//   "@id": "http://manu.sporny.org#person",
//   "name": "Manu Sporny",
//   "homepage": "http://manu.sporny.org/"
// };
//
// univers.put(manu, function(err, obj) {
//   console.log("--obj", obj)
//   // do something after the obj is inserted
// });
