import axios from 'axios';
import pkg from 'jsonld';
const { JsonLdProcessor: jsonld } = pkg;


import { Template } from "../template/index.js"
export { CommunitySolidServer }
let home = process.env.HOME
let host = "http://localhost:3000"
let db = "test"

axios.defaults.baseURL = host;

// console.log(jsonld.compact)

const context = {
    "@vocab": "http://xmlns.com/foaf/0.1/",
    "homepage": { "@type": "@id" },
    "knows": { "@type": "@id" },
    "based_near": { "@type": "@id" }
}

// const doc = {
//     "http://schema.org/name": "Manu Sporny",
//     "http://schema.org/url": {"@id": "http://manu.sporny.org/"},
//     "http://schema.org/image": {"@id": "http://manu.sporny.org/images/manu.png"}
//   };
//   const context = {
//     "name": "http://schema.org/name",
//     "homepage": {"@id": "http://schema.org/url", "@type": "@id"},
//     "image": {"@id": "http://schema.org/image", "@type": "@id"}
//   };

//   // compact a document according to a particular context
// const compacted = await jsonld.compact(doc, context);
// console.log(JSON.stringify(compacted, null, 2));
/* Output:
{
  "@context": {...},
  "name": "Manu Sporny",
  "homepage": "http://manu.sporny.org/",
  "image": "http://manu.sporny.org/images/manu.png"
}
*/



// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers.common['Accept'] = 'application/ld+json';
axios.defaults.headers.post['Content-Type'] = 'application/ld+json';

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

class CommunitySolidServer extends Template {
    constructor(options = {}) {
        super(options)
        this.type = "CommunitySolidServer"
        this.db = db
        this.history = { folders: [], files: [] }
    }


    async onCommand(c) {


        if (debug) console.log(c)

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

    new(data) {
        console.log("new", data)
        let name = data.array[1]
        console.log("new with name", name)
        let neurone = modeleNew
        neurone['@id'] = opts.base + '/' + name
        neurone.name = name
        this.db.jsonld.put(neurone, opts, this.core.display.bind(this), function (err, obj) {
            // do something after the obj is inserted
            console.log("error", err)
            console.log("obj", obj)
        });
    }

    create(data) {
        console.log("create", data)
        this.db.jsonld.put(data, opts, this.core.display.bind(this), function (err, obj) {
            // do something after the obj is inserted
            console.log("error", err)
            console.log("obj", obj)
        });
    }



    add(data) {
        console.log("command add", data)
        console.log(this.core.lastResponseObject, "\n",
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
        console.log(nested)

        this.db.jsonld.put(nested, { '@context': manu['@context'] }, this.core.display.bind(this))


    }



    async put(url, data, cb) {
        if (debug) console.log("on put jsonld", data)

        //   curl -X PUT -H "Content-Type: text/turtle" \
        //   -d "<ex:s> <ex:p> <ex:o>." \
        //   http://localhost:3000/myfile.ttl
        // axios.get('/user?ID=12345')
        // .then(function (response) {
        //   // handle success
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   // handle error
        //   console.log(error);
        // })
        // .finally(function () {
        //   // always executed
        // });
        axios({
            method: 'put',
            url: url,
            data: data
        })
            .then(function (response) {
                // handle success
                console.log(response);
                cb()
                return response
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return error
            })
            .finally(function () {
                console.log("done")
                // always executed
            });

    }
    get(url, cb) {
        console.log("/n################/nGET/n")
        if (debug) console.log("on get jsonld", url)
        if (url == undefined) {
            console.log("error, no parameter url for the get command", url)
        } else {

            return axios({
                method: 'get',
                url: url,
                //data: data
            })
                .then(function (response) {
                    // handle success
                    console.log("get", response.data);
                    cb()
                    return response.data
                })
                // .then(function (json) {
                //     // handle success
                //     console.log(json);
                //     return json
                // })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    return error
                })
            // .finally(function () {
            //     console.log("done")
            //     // always executed
            // });

            // this.db.jsonld.get(data.subject, { '@context': manu['@context'] }, this.core.display.bind(this))
        }
    }
    async jsonld_compact(url, cb) {
        // const doc = {
        //     "http://schema.org/name": "Manu Sporny",
        //     "http://schema.org/url": {"@id": "http://manu.sporny.org/"},
        //     "http://schema.org/image": {"@id": "http://manu.sporny.org/images/manu.png"}
        //   };
        //   const context = {
        //     "name": "http://schema.org/name",
        //     "homepage": {"@id": "http://schema.org/url", "@type": "@id"},
        //     "image": {"@id": "http://schema.org/image", "@type": "@id"}
        //   };


        const compacted = await jsonld.compact(url, context);
        console.log("compacted!!!!!!!!!!!!!!!!!!!!!!!!!!!!", compacted)
        console.log("stringified!!!!!!!!!!!!!!!!!!!!!!!!!!", JSON.stringify(compacted, null, 2));
        cb()
    }





    //////////////////////////
    //CLI : ls, find, search ...
    ///////////////////////////
    async ls(data) {
        if (debug) console.log(data)
        let current = this.history.folders.pop() || host
        this.history.folders.push(current)
        console.log("current", current)
        const compacted = await jsonld.compact(current, context);

        console.log("compacted!!!!!!!!!!!!!!!!!!!!!!!!!!!!", compacted)
        //  console.log("stringified!!!!!!!!!!!!!!!!!!!!!!!!!!", JSON.stringify(compacted, null, 2));
        this.core.display.bind(compacted)

        // let module = this
        // let db = this.db
        // db.search([
        //     {
        //         subject: db.v('subject'),
        //         predicate: db.v('predicate'),
        //         object: db.v('object')
        //     },
        // ], function (err, solution) {
        //     console.log(err),
        //         console.log(solution)
        //     module.core.displayList({ header: "LS: ", list: solution })
        // });
    }

    find(data) {
        let module = this
        let db = this.db
        if (debug) console.log(data)

        let term = data.what || data.array[1] // data.what pour commander.js / à corriger : data.array[1] dans prompt/command
        if (debug) console.log(term)
        db.search({
            subject: db.v('subject'),
            predicate: db.v('predicate'),
            object: db.v('object'),
            filter: function filter(triple) {
                return (triple.subject != undefined && triple.subject.includes(term))
                    || (triple.predicate != undefined && triple.predicate.includes(term))
                    || (triple.object != undefined && triple.object.includes(term));
            }
        }, function process(err, results) {

            module.core.displayList({ header: "FINDING " + term, list: results })


            // results will not contain any triples that
            // have 'daniele' as object
        });
    }







    search(data) {
        if (debug) console.log(data)
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
        ], function (err, results) {

            console.log(err),
                console.log(results)
            module.core.displayList({ header: "SEARCH " + "todo parametrized search", list: results })
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

    async test(data) {
        // axios put & get
        //await this.putmanu("http://localhost:3000/manu.jsonld",data)
        //await this.getmanu(data)
        //jsonld lib
        let doc = "http://localhost:3000/manu.jsonld"
        await this.jsonld_compact(doc, this.core.display.bind(this))
    }

    async getmanu(data) {
        if (debug) console.log("!!!GET", data)
        // if(debug)  await this.db.jsonld.get(manu['@id'], { '@context': manu['@context'] }, this.core.display.bind(this))
        if (debug) await this.get("http://localhost:3000/manu.jsonld", this.core.display.bind(this))

    }
    async putmanu(path, data) {
        if (debug) console.log("!!!PUT", data)
        //await this.db.jsonld.put(manu, this.core.display.bind(this))
        await this.put(path, manu, this.core.display.bind(this))
    }



}