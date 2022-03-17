// const prompt = require('enquirer');
// const colors = require('colors');
// const pad = require('pad');
// const data = require('../lib/data');
// const open = require('open');

const { Confirm , input, autocomplete } = require('enquirer');
const yosay = require('yosay');

// const prompt = new Confirm({
//   name: 'question',
//   message: 'Did you like enquirer?'
// });

const prompt2 = () => input({
  name: 'username',
  message: 'Give it a name: '
});
//
// let answer

const prompt = () => autocomplete({
  header: yosay('What can I do for you？'),
  message: '=>',
  choices: ['neurone', 'brain', 'world', 'other', 'quit']
});

// const prompt2 = () => autocomplete({
//   name: 'Options',
//   message: '=>',
//   choices: ['BACK']
// });

function loop_root() {
  prompt().then(answer => {
    if (answer != 'quit') {
      prompt2().then(name => {
        console.log('with name',name)
        // if (answer1 === 'BACK') {
          // TODO can not work?
          loop_root();
        // }
      }).catch(console.error);
    }
  }).catch(err => console.log('ERROR:', err));
}


module.exports = async function () {
  // let answer = await prompt.run()
  // console.log('Answer:', answer)
  //
  // if (answer != "exit"){
  //   start()
  // }
  loop_root();
};
