// let { date } = await import('quasar') // module under node_modules, or your own one, etc.
import moment from 'moment';

//https://stackoverflow.com/questions/54784608/how-can-i-import-an-es-module-in-the-node-js-repl
// need   "type": "module", in package.json
console.log("need nodejs > v16.9.1")


moment.locale('de');
  console.log(moment().format('LLLL')); // 'Freitag, 24. Juni 2016 01:42'

  moment.locale('fr');
    console.log(moment().format('LLLL')); // Lundi...
