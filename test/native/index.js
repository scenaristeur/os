import { createRequire } from 'module';
const require = createRequire(import.meta.url)

const readline = require('readline');

function completer(line) {
  const completions = 'put get find search ls test .help .error .exit .quit .q'.split(' ');
  const hits = completions.filter((c) => c.startsWith(line));
  // Show all completions if none found
  return [hits.length ? hits : completions, line];
}

// // The completer function can be called asynchronously if it accepts two arguments:
//
// function completer(linePartial, callback) {
//   callback(null, [['123'], linePartial]);
// }


function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: completer
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }))
}



const level      = require('level'),
universDB     = level('./universDB'),
levelgraph = require('levelgraph'),
jsonld     = require('levelgraph-jsonld'),
db         = jsonld(levelgraph(universDB));


console.log(db)
const univers = db.jsonld

let lastResponseArray = null
let lastResponseObject = null


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

function search(data){
  console.log(data)
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
  ], function(err, solution) {

    console.log(err),
    console.log(solution)
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

function ls(data){
  console.log(data)
  db.search([
    {
      subject: db.v('subject'),
      predicate: db.v('predicate'),
      object: db.v('object')
    },
  ], function(err, solution) {
    console.log(err),
    console.log(solution)
  });
}


function find(data){
  console.log(data)
  let predicate_short = true
  let term = data.array[1]
  console.log(term)
  db.search({
    subject: db.v('subject'),
    predicate: db.v('predicate'),
    object: db.v('object'),
    filter: function filter(triple) {
      return triple.subject.includes(term) || triple.predicate.includes(term) || triple.object.includes(term);
    }
  }, function process(err, results) {
    lastResponseArray = results
    console.log("FINDING " , term, ": ", results)


    for (let i= 0; i < results.length ; i++){
      let r = results[i]
      let pred = predicate_short ? r.predicate.substring(r.predicate.lastIndexOf('/') + 1) :  r.predicate
      console.log(i,r.subject, "\t\t",i+.1, pred , "\t\t",i+.2, r.object )
    }
    // results will not contain any triples that
    // have 'daniele' as object
  });
}



function getmanu (data){
  console.log("!!!GET", data)
  univers.get(manu['@id'], { '@context': manu['@context'] }, display)
}
function putmanu(data){
  console.log("!!!PUT", data)
  univers.put(manu, display)
}

function test(){
  putmanu()
  getmanu()
}

function put(data){

}
function get(data){
  console.log("!!!GET", data)
  univers.get(data, { '@context': manu['@context'] }, display)

}


function choice(c){


  let subject = lastResponseArray[c.index].subject
  console.log(subject)
  console.log('todo get number after dot to to through le result')

  get(subject)


}


async function display(err, data){
  err ? console.log("\n-----ERROR",err) : console.log("\n-----RESULT",data)
  //  ans = await askQuestion("-----\nos> ");
}

let ans
while (true) {
  ans = await askQuestion("> ");
  console.log(ans)

  let c = {}


  if(!(Number.isNaN(parseFloat(ans)))) { // check if float https://thispointer.com/check-if-string-is-a-number-in-javascript/
    c.array = ans.split('.')
    c.index = c.array[0]
    console.log("number", ans, c)
    choice(c)

  }else{
    c.full = ans
    c.array = ans.split(' ')
    c.command = c.array[0]
    console.log(c)

    switch (c.command) {
      case "put":
      await put(c)
      break;
      case 'get':
      await get(c)
      break;
      case 'search':
      await search(c)
      break;
      case 'ls':
      await ls(c)
      break;
      case 'test':
      await test(c)
      break;
      case 'find':
      await find(c)
      break;
      default:
      console.log(" !!!! ERROR, command unknown", c)
    }
  }

}
