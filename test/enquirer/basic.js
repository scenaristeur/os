//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { Univers } from '../../core/levelgraph-jsonld/index.js';

const { prompt } = require('enquirer');

const response = await prompt({
  type: 'input',
  name: 'username',
  message: 'What is your username?'
});

console.log(response); // { username: 'jonschlinkert' }


const prompt = new Input({
  name: 'username',
  message: 'What is your username?'
});

prompt.run()
  .then(answer => console.log('Username:', answer))
  .catch(console.error);
