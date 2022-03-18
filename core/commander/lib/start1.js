// const prompt = require('enquirer');
// const colors = require('colors');
// const pad = require('pad');
// const data = require('../lib/data');
// const open = require('open');

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { Confirm , input, autocomplete } = require('enquirer');
const yosay = require('yosay');

// import { Core } from '../../../core/index.js';
// import { LevelgraphJsonld } from '../../../core/levelgraph-jsonld/index.js';
// let levelgraphJsonld = new LevelgraphJsonld({name: "base de test", active: true})
//
// let core = new Core({bases: {levelgraphJsonld : levelgraphJsonld}})

// const prompt = new Confirm({
//   name: 'question',
//   message: 'Did you like enquirer?'
// });

const prompt2 = () => input({
  name: 'name',
  message: 'Give it a name: '
});
//
// let answer

const prompt = () => autocomplete({
  header: yosay('What can I do for you？\n\
  - neurone is the most basic intelligent entity\n\
  - brain is a group of neurone\n\
  - in a world there are brains and a lot of other things.'),
  message: '=>',
  hint: 'Enter by class or by action',
  choices: ['test', 'neurone', 'brain', 'world', 'other', 'create', 'read', 'update', 'delete', 'quit']
});

// const prompt2 = () => autocomplete({
//   name: 'Options',
//   message: '=>',
//   choices: ['BACK']
// });

function loop_root() {
  prompt().then(type => {
    if (type != 'quit') {
      prompt2().then(name => {
        console.log('creating a '+type+' with name',name)
        // if (answer1 === 'BACK') {
        // TODO can not work?
        loop_root();
        // }
      }).catch(console.error);
    }
  }).catch(err => console.log('ERROR:', err));
}


export default async function start() {
  // let answer = await prompt.run()
  // console.log('Answer:', answer)
  //
  // if (answer != "exit"){
  //   start()
  // }
  loop_root();
};
