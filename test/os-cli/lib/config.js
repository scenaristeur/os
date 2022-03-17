const fs = require('fs');
const path = require('path')

const semver = require('semver');
const { Snippet } = require('enquirer');

let promptConfigFile

let config = {}
module.exports = async function () {
  config.user = process.env.USER
  config.home = process.env.HOME
  config.bases = {}
  config.config_file = process.env.HOME+"/.os/.config.jsonld"
  await createConfigPrompt()
  await verifiyDataBase()
  return config
};

async function createConfigPrompt(){
  let message = "Config file not found at "+config.config_file+". Let's create it"
  promptConfigFile = new Snippet({
    name: 'config_file',
    message : message,
    required: true,
    fields: [
      {name: 'owner', message: 'Database Owner', initial: config.user},
      {name: 'db_name', message: 'Database Name', initial: 'Universe'},
      {name: 'db_path', message: 'Database Path', initial: process.env.HOME+"/.os/UniverseDb"},
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
      },
      {
        name: 'base_opts',
        initial: "{ base: 'http://local/base' }",
        message: "base options like { base: 'http://local/base' }"
      }
    ],
    template: `{
      "db_name": "\${db_name}",
      "db_path": "\${db_path}",
      "description": "\${description}",
      "version": "\${version}",
      "owner": "\${owner}",
      "base_opts": "\${base_opts}"
    }
    `
  });
}

async function verifiyDataBase(){
  if (fs.existsSync(config.config_file)){
    let data = await fs.readFileSync(config.config_file, 'utf-8')
    let local_conf = JSON.parse(data);
    config.bases[local_conf.db_name] = local_conf
  }else{

    fs.mkdir(path.dirname(config.config_file), { recursive: true }, (err) => {
      if (err) throw err;
    });
    await promptConfigFile.run()
    .then(async function(answer) {
      let data = JSON.stringify(answer.result, null, 2);
      fs.writeFileSync(config.config_file, answer.result, 'utf-8');
      await verifiyDataBase()
    })
    .catch(console.error);
  }

}
