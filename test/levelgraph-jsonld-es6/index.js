//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const level      = require('level'),
universDB     = level('./universDB'),
levelgraph = require('levelgraph'),
jsonld     = require('levelgraph-jsonld'),
db         = jsonld(levelgraph(universDB));


console.log(db)
const univers = db.jsonld


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

univers.put(manu, function(err, obj) {
  err ? console.log(err) : console.log("--obj", obj)
  // do something after the obj is inserted
});



univers.get(manu['@id'], { '@context': manu['@context'] }, display)
//  {
//   err ? console.log(err) : console.log("REPONSE GET --obj", obj)
//   // do something after the obj is inserted
// });


function display(err, data){
  err ? console.log("ERROR",err) : console.log("RESULT",data)
}

// univers.put(data, function(err, obj) {
//   console.log("--data", obj)
//   // do something after the obj is inserted
// });
