import openEditor from 'open-editor';

openEditor([
	{
		file: 'readme.md',
		line: 10,
		column: 2,
	}
]);

openEditor([
	'unicorn.js:5:3',
]);
