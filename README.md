# erreur dependance obsolete
-     "levelgraph-jsonld": "scenaristeur/levelgraph-jsonld#patch-1"

# worlds / brains / neurones
- neurones are the most small entities of intelligences.
- brains are groups of neurones
- in a world we can find some brains and a lot of other things

# basic commands
- some common command `ls` `mv` `cd` `man`
- https://www.google.com/search?q=man+linux

# install globaly

```
npm install
sudo npm install -gs ./

#then just run
os  

```


# levelgraph-jsonld commands
```
put :
get :
search :
ls : list objects
test :
find : (example : find lulu or find henry)
last :  get last objects
```

# adding a property known by the @ context : exemple name


```

try 'test' then 'ls' or 'find henry' and '2' for selecting

ls // we list all

------------
LS:  

------------

0 https://my-profile.eu/people/deiu/card#me 		 0.1 name 		 0.2 "Andrei Vlad Sambra"
1 _:3d339be0-a54d-11ec-a55f-3d486699ec24 		 1.1 name 		 1.2 "Daniele"
2 _:6656eb80-a54d-11ec-b48c-0d182fd00ed5 		 2.1 name 		 2.2 "Daniele"
[...]
11 http://melvincarvalho.com/#me 		 11.1 name 		 11.2 "Melvin Carvalho"
[...]
------------

11 // we select 11


------------------------RESULT - 1647451512645
{
  '@context': {
    '@vocab': 'http://xmlns.com/foaf/0.1/',
    homepage: { '@type': '@id' },
    knows: { '@type': '@id' },
    based_near: { '@type': '@id' }
    },
    '@id': 'http://melvincarvalho.com/#me',
    based_near: 'http://dbpedia.org/resource/Honolulu',
    homepage: 'http://lojkkujhye',
    name: 'Melvin Carvalho'
  }
  ========================RESULT


  add name test  // we add name test

  ls // list all

  ------------
  LS:  

  ------------

  0 https://my-profile.eu/people/deiu/card#me 		 0.1 name 		 0.2 "Andrei Vlad Sambra"
  1 _:3d339be0-a54d-11ec-a55f-3d486699ec24 		 1.1 name 		 1.2 "Daniele"
  2 _:6656eb80-a54d-11ec-b48c-0d182fd00ed5 		 2.1 name 		 2.2 "Daniele"
  [...]
  11 http://melvincarvalho.com/#me 		 11.1 name 		 11.2 "Melvin Carvalho"
  12 http://bblfish.net/people/henry/card#me 		 12.1 name 		 12.2 "Tchou"
  13 http://bblfish.net/people/henry/card#me 		 13.1 name 		 13.2 "blop"
  14 http://melvincarvalho.com/#me 		 14.1 name 		 14.2 "test"                // name test has been added

  [...]

  ------------

  11 // we select the number 11

  ------------------------RESULT - 1647451530902
  {
    '@context': {
      '@vocab': 'http://xmlns.com/foaf/0.1/',
      homepage: { '@type': '@id' },
      knows: { '@type': '@id' },
      based_near: { '@type': '@id' }
      },
      '@id': 'http://melvincarvalho.com/#me',
      based_near: 'http://dbpedia.org/resource/Honolulu',
      homepage: 'http://lojkkujhye',
      name: [ 'Melvin Carvalho', 'test' ]
    }
    ========================RESULT

    ```



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
      - modules using needing require/common need to start with
      ```
      //https://nodejs.org/api/module.html#module_module_createrequire_filename
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
      ```

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


      # for user interaction : repl or enquirer ? both in paralel ? see test folder


      # some repl commands
      - https://nodejs.org/api/repl.html#javascript-expressions
      .editor .load

      # or enquirer
      - https://www.npmjs.com/package/enquirer

      # levelgraph-jsonld
      - https://github.com/levelgraph/levelgraph-jsonld
      - playground https://wileylabs.github.io/levelgraph-playground/


      # using repl .editor to store data

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

          # basic system
          - every minute / debrayable : anticipe/propose/attends/reponse
          - prompt listen rawstdin stream -> autocomplete -> command --> db


          # json editor
          - https://github.com/josdejong/jsoneditor

          # json server
          - https://bestofjs.org/projects/json-server

          # ipfs notificatio realtime
          - https://docs.ipfs.io/how-to/create-simple-chat-app/
          - https://github.com/TheDiscordian/browser-ipfs-chat

          https://medium.com/simpleid-dev-tools/tutorial-how-to-build-an-ipfs-text-notification-app-d7e1a89c784b
          - https://docs.libp2p.io/concepts/publish-subscribe/

          - ipfs pubsub room
          - https://www.npmjs.com/package/ipfs-pubsub-room

          # remove all node_modules
          - https://stackoverflow.com/questions/42950501/delete-node-modules-folder-recursively-from-a-specified-path-using-command-line


          find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
