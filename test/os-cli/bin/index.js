#!/usr/bin/env node
const program = require('commander');

// import menus
const config = require('../lib/config');
const init = require('../lib/init');
// const topics = require('../lib/topics');
const browse = require('../lib/browse');
const neurone = require('../lib/neurone');
const start = require('../lib/start');


// print topic menu
// program
// .command('init')
// .alias('i')
// .description('Init levelgraph-jsonld database')
// .action(function () {
//   init();
// });

program
.description('Init levelgraph-jsonld database')
.action(async function () {
  let conf = await config();
  console.log("my config", conf)
  await init()
});



// program
//   .command('topics')
//   .alias('t')
//   .description('All topics')
//   .action(function () {
//     topics();
//   });

// print browse menu
program
.command('browse')
.alias('b')
.description('Browse a topic')
.action(function () {
  browse();
});

program
.command('neurone')
.alias('n')
.description('Create a neurone')
.action(function () {
  neurone();
});

program
.command('start')
.alias('s')
.description('Start os app')
.action(function () {
  start();
});

// allow commander to parse `process.argv`
program.parse(process.argv);
