//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { Univers } from '../../core/levelgraph-jsonld/index.js';
//////////////////////////////////////:


const { Snippet } = require('enquirer');
const prompt = new Snippet({
  name: 'username',
  message: 'Fill out the fields in youy profile',
  required: true,
  fields: [
    // {
    //   name: 'author_name',
    //   message: 'Author Name'
    // },
    {
      name: 'webId',
      message: 'your webId like http://bigbluehat.com/#'
    },
    {
      name: 'friend_webId',
      message: "your friend's webId like http://manu.sporny.org#person"
    },
    {
      name: 'friend_name',
      message: "your friend's name like Manu Sporny"
    },
    {
      name: 'friend_homepage',
      message: "friend's homepage like http://manu.sporny.org/"
    },

    // {
    //   name: 'version',
    //   validate(value, state, item, index) {
    //     if (item && item.name === 'version' && !semver.valid(value)) {
    //       return prompt.styles.danger('version should be a valid semver value');
    //     }
    //     return true;
    //   }
    // }
  ],
  //   template: `{
  //   "name": "\${name}",
  //   "description": "\${description}",
  //   "version": "\${version}",
  //   "homepage": "https://github.com/\${username}/\${name}",
  //   "author": "\${author_name} (https://github.com/\${username})",
  //   "repository": "\${username}/\${name}",
  //   "license": "\${license:ISC}"
  // }
  // `,
  template: `{
    "@context": {
      "@vocab": "http://xmlns.com/foaf/0.1/"
    },
    "@id": "\${webId}",
    "name": "\${name}",
    "knows": [
      {
        "@id": "\${friend_webId}",
        "name": "\${friend_name}",
        "homepage": "\${friend_homepage}"
      }
    ]
  }`
});

prompt.run()
.then(answer => console.log('Answer:', answer.result))
.catch(console.error);
