//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// import { Univers } from '../../core/levelgraph-jsonld/index.js';
//////////////////////////////////////:


const semver = require('semver');
const { Snippet } = require('enquirer');
const prompt = new Snippet({
  name: 'username',
  message: 'Fill out the fields in package.json',
  required: true,
  fields: [
    {
      name: 'author_name',
      message: 'Author Name'
    },
    {
      name: 'version',
      validate(value, state, item, index) {
        if (item && item.name === 'version' && !semver.valid(value)) {
          return prompt.styles.danger('version should be a valid semver value');
        }
        return true;
      }
    }
  ],
  template: `{
  "name": "\${name}",
  "description": "\${description}",
  "version": "\${version}",
  "homepage": "https://github.com/\${username}/\${name}",
  "author": "\${author_name} (https://github.com/\${username})",
  "repository": "\${username}/\${name}",
  "license": "\${license:ISC}"
}
`
});

prompt.run()
  .then(answer => console.log('Answer:', answer.result))
  .catch(console.error);
