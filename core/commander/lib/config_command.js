

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Conf = require('conf');

export { ConfCommand }
class ConfCommand extends Conf {
  constructor(options) {
    options = {
      name: 'config',
      ...options
    };
    super(options)
    console.log(this.options)

    this.set('user.unicorn', '🦄');
    this.set('user.name', process.env.USER || null)
    this.set('user.home', process.env.HOME || null)
    this.set('user.editor', process.env.EDITOR || 'nano' )
    // /etc/alternatives/editor ? atom ? nano ?

    // Use dot-notation to access nested properties
    // this.set('foo.bar', true);
    // console.log(this.get('foo'));
    //
    // this.set('boo.bi.bap', 12);
    //=> {bar: true}

    // this.delete('unicorn');
    // console.log(this.get('unicorn'));


    console.log('-- Config :',this.store)
    console.log("-- stored at ",this.path)
  }
}
