import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
const path = require('path')

const semver = require('semver');
const { Snippet } = require('enquirer');

let promptConfigFile

let conf = {}
// module.exports.config = config;
export async function config () {
  conf.user = process.env.USER
  conf.home = process.env.HOME
  conf.bases = {}
  conf.config_file = process.env.HOME+"/.os/.config.jsonld"
  await createConfigPrompt()
  await verifiyDataBase()
  return conf
};

async function createConfigPrompt(){
  let message = "Config file not found at "+conf.config_file+". Let's create it"
  promptConfigFile = new Snippet({
    name: 'config_file',
    message : message,
    required: true,
    fields: [
      {name: 'owner', message: 'Database Owner', initial: conf.user},
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
  if (fs.existsSync(conf.config_file)){
    let data = await fs.readFileSync(conf.config_file, 'utf-8')
    let local_conf = JSON.parse(data);
    conf.bases[local_conf.db_name] = local_conf
  }else{

    fs.mkdir(path.dirname(conf.config_file), { recursive: true }, (err) => {
      if (err) throw err;
    });
    await promptConfigFile.run()
    .then(async function(answer) {
      let data = JSON.stringify(answer.result, null, 2);
      fs.writeFileSync(conf.config_file, answer.result, 'utf-8');
      await verifiyDataBase()
    })
    .catch(console.error);
  }

}
