const fs = require('fs');

const semver = require('semver');
const { Snippet } = require('enquirer');
const promptConfigFile = new Snippet({
  name: 'username',
  message: 'Fill out the fields in package.json',
  required: true,
  fields: [
    {
      name: 'description',
      initial: 'A cool jsonld database for storing my thoughts',
      message: "Description"
    },

    {
      name: 'version',
      initial: '0.0.1',
      validate(value, state, item, index) {
        if (item && item.name === 'version' && !semver.valid(value)) {
          return promptConfigFile.styles.danger('version should be a valid semver value');
        }
        return true;
      }
    }
  ],
  template: `{
    "base_name": "\${base_name}",
    "base_path"; "\${base_path}",
    "description": "\${description}",
    "version": "\${version}"
  }
  `
  //,
  // "homepage": "https://github.com/\${username}/\${name}",
  // "author": "\${author_name} (https://github.com/\${username})",
  // "repository": "\${username}/\${name}",
  // "license": "\${license:ISC}"
});

let config = {}
module.exports = async function () {

  config.user = process.env.USER
  config.home = process.env.HOME
  config.bases = {}
  config.config_file = process.env.HOME+"/.os/.config.jsonld"
  promptConfigFile.fields.push({name: 'base_name', message: 'Base Name', initial: 'Universe'})
  promptConfigFile.fields.push({name: 'base_path', initial: process.env.HOME+"/.os/UniverseDb"})
  console.log(promptConfigFile.fields)
  await verifiyDataBase()
  console.log(config)
  return config
};

async function verifiyDataBase(){
  if (fs.existsSync(config.config_file)){
    console.log("config_file found at",config.config_file)
  }else{
    console.log("config_file not found at",config.config_file,". Creating it")
    await promptConfigFile.run()
    .then(answer => {
      console.log('Answer:', answer.result)
    })
    .catch(console.error);
  }
  // let rawdata = fs.readFileSync(config.config_file, (err, data) => {
  //   if (err) {
  //     // throw err;
  //     console.log("no config file at ",config.config_file,". Do you want that i create it ?")
  //   }else{
  //     let local_conf = JSON.parse(data);
  //     console.log(local_conf);
  //   }
  // });
}
