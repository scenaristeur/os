# worlds / brains / neurones
- neurones are the most small entities of intelligences.
- brains are groups of neurones
- in a world we can find some brains and a lot of other things

# basic commands
- some common command `ls` `mv` `cd` `man`
- https://www.google.com/search?q=man+linux


# CRUD commands
- for each entities, we can use CRUD commands (CREATE, READ, UPDATE, DELETE)
- for example `create world toto`+Enter will create a world named "toto"
- then you can `cd toto`+Enter
- and `create brain special_brain`+Enter will create a brain  named "special_brain" in the "toto" world
- `cd sp`+Tab key should autocomplete to `cd special_brain` then you can press Enter

# shortcuts
- for each CRUD of world, brain & neurone, a shortcut exist
- `cw toto` for "create world toto" -> cw, rw, uw, dw / cb, rb, ub, db / cn, rn, un, dn

# hierarchy
- all worlds & brains are extension of neurones in a Object Oriented Programming way `World extends Neurone` `Brain extends Neurone` https://www.google.com/search?q=programmation+orient%C3%A9e+objet
- all Neurones and Brains & Worlds are Agents in a MultiAgents Oriented Programming way https://www.google.com/search?q=multiagents
- this app is a Neurone too

# neurones are jsonld
the code for creating a Neurone see [/test/basic_neurone/index.js](https://github.com/scenaristeur/os/blob/main/test/basic_neurone/index.js) file

```
import {Neurone} from '../../experiments/neurone-factory/index.js';
let neurone = new Neurone()
console.log("neurone", neurone)
```

should give you something like  

```
~/dev/os/test/basic_neurone$ node .
neurone Neurone {
  '@context': {
    as: 'https://www.w3.org/ns/activitystreams#',
    ve: 'https://scenaristeur.github.io/verse#',
    id: '@id',
    type: '@type',
    name: 've:name',
    age: 've:age',
    url: 've:url',
    privacy: 've:privacy',
    properties: 've:properties',
    links: 've:links',
    synapses: 've:synapses',
    created: 've:created',
    updated: 've:updated',
    synchronized: 've:synchronized'
    },
    id: '138dc1d5-ab70-4520-b0e1-2c844b68d73f',
    name: '',
    age: 0,
    url: '',
    privacy: 'private',
    type: 'neurone',
    properties: [],
    links: [],
    synapses: [],
    created: 1647252979841,
    updated: null,
    synchronized: null
  }
```


# modules
  - modules are nodejs ES6 modules
  - modules need `"type": "module",` in the package.json otherwise you got a message like


  ```
  ~/dev/os/experiments$ node .
  (node:25733) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
  (Use `node --trace-warnings ...` to show where the warning was created)
  /home/smag/dev/os/experiments/index.js:2
  import {Neurone} from './neurone-factory';
  ^^^^^^

  SyntaxError: Cannot use import statement outside a module

  ```

# some repl commands
.editor .load
# using .editor to store data

```
node::local> .editor
// Entering editor mode (Ctrl+D to finish, Ctrl+C to cancel)
let data = {
  "@context": {
    "@vocab": "http://xmlns.com/foaf/0.1/"
  },
  "@id": "http://bigbluehat.com/#",
  "name": "BigBlueHat",
  "knows": [
    {
      "@id": "http://manu.sporny.org#person",
      "name": "Manu Sporny",
      "homepage": "http://manu.sporny.org/"
    }
  ]
}
undefined

node::local> console.log(data)
{
  '@context': { '@vocab': 'http://xmlns.com/foaf/0.1/' },
  '@id': 'http://bigbluehat.com/#',
  name: 'BigBlueHat',
  knows: [
    {
      '@id': 'http://manu.sporny.org#person',
      name: 'Manu Sporny',
      homepage: 'http://manu.sporny.org/'
    }
  ]
}
undefined

node::local> .editor
// Entering editor mode (Ctrl+D to finish, Ctrl+C to cancel)
univers.put(data, function(err, obj) {
  console.log("--data", obj)
  // do something after the obj is inserted
});
undefined

node::local> --data {
  '@context': { '@vocab': 'http://xmlns.com/foaf/0.1/' },
  '@id': 'http://bigbluehat.com/#',
  name: 'BigBlueHat',
  knows: [
    {
      '@id': 'http://manu.sporny.org#person',
      name: 'Manu Sporny',
      homepage: 'http://manu.sporny.org/'
    }
  ]
}
--data {
  '@context': { '@vocab': 'http://xmlns.com/foaf/0.1/' },
  '@id': 'http://bigbluehat.com/#',
  name: 'BigBlueHat',
  knows: [
    {
      '@id': 'http://manu.sporny.org#person',
      name: 'Manu Sporny',
      homepage: 'http://manu.sporny.org/'
    }
  ]
}
```
