// const prompt = require('enquirer');
// const colors = require('colors');
// const pad = require('pad');
// const data = require('../lib/data');
// const open = require('open');

const { Confirm , Input } = require('enquirer');

// const prompt = new Confirm({
//   name: 'question',
//   message: 'Did you like enquirer?'
// });

const prompt = new Input({
    name: 'username',
    message: 'What is your username?'
  });

// const questions = [
//   {
//     type: 'input',
//     name: 'name',
//     message: 'What is your name?'
//   },
//   {
//     type: 'input',
//     name: 'username',
//     message: 'What is your username?'
//   }
// ];

module.exports = async function () {
  prompt.run()
  .then(answer => console.log('Answer:', answer));
  // let reponses = await prompt(questions)
  // console.log(reponses)
  // .then(function (answers) {
  //
  //   // get topic slug from topics array
  //   var getTopicArry = data.topics.filter(t => t.name == answers.topic);
  //   var getSlug = getTopicArry[0]['slug'];
  //   var topicUrl = 'https://shouts.dev/topics/' + getSlug;
  //
  //   // print answers
  //   console.log('\n');
  //   console.log('YOUR ANSWERS');
  //   console.log('------------------');
  //
  //   console.log(pad(colors.grey('Topic: '), 30), answers.topic);
  //   console.log(pad(colors.grey('Topic URL: '), 30), topicUrl);
  //   console.log(pad(colors.grey('Open in browser: '), 30), answers.openInBrowser);
  //
  //   // open topic in browser
  //   if(answers.openInBrowser) {
  //     (async () => {
  //       // opens in the default browser
  //       await open(topicUrl);
  //     })();
  //   }
  //
  // });
};
