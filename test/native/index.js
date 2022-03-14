import { createRequire } from 'module';
const require = createRequire(import.meta.url)

const readline = require('readline');

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
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



function get (data){
  console.log("!!!GET", data)
  univers.get(manu['@id'], { '@context': manu['@context'] }, display)
}
function put(data){
  console.log("!!!PUT", data)
  univers.put(manu, display)
  // {
  //   err ? console.log(err) : console.log("--obj", obj)
  // });
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
    default:
    console.log(" !!!! ERROR, command unknown", c)
  }


}
