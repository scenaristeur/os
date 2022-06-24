const Conf = require('conf');

const schema = {
	foo: {
		type: 'number',
		maximum: 100,
		minimum: 1,
		default: 50
	},
	bar: {
		type: 'string',
		format: 'url'
	}
};

const config = new Conf({schema});

console.log(config.get('foo'));
//=> 50
// try{
// config.set('foo', '1');
// }catch(e){console.log(e)}
