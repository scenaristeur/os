import { Template } from "../template/index.js"

var show_unicode = false
var show_history = true
var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );
export { Prompt }

class Prompt extends Template{
  constructor(options = {}) {
    super(options)
    this.todo = "display prompt invite"
    this.history = []
    this.raw = ""
    this.init()
  }

  init(){
    let module = this
    stdin.on( 'data', function( key ){
      if (show_unicode)  console.log(module.toUnicode(key))
      switch (key) {
        case '\u000D': //enter
        if(module.raw.length > 0) module.history.unshift(module.raw)
        if(show_history) console.log('\n'+module.history+'\n')
        module.sendToCore({action: "enter", raw: module.raw, history: module.history})
        module.raw = ""
        break;
        case '\u001B\u005B\u0041':
        process.stdout.write('up');
        break;
        case '\u001B\u005B\u0042':
        process.stdout.write('down');
        break;
        case '\u001B\u005B\u0043':
        process.stdout.write('right');
        break;
        case '\u001B\u005B\u0044':
        process.stdout.write('left');
        break;
        case '\x7F':
        process.stdout.write('\noups not implemented backspace yet \n');
        break;
        case '\u0003': // ctrl-c
        module.sendToCore({action: "exit", raw: module.raw, history: module.history})
        break;
        default:
        // write the key to stdout all normal like
        process.stdout.write( key )
        module.raw+=key
        module.sendToCore({action: "raw",raw: module.raw, history: module.history})
      }

    });
  }

  sendToCore(data){
    this.core.onPrompt(data)
  }
  //  prompt(){
  //   process.stdout.write( '\n' )
  //   process.stdout.clearLine();  // clear current text
  //
  //   process.stdout.write( '-->' )
  //   process.stdout.cursorTo(3);  // move cursor to beginning of line
  // }
  toUnicode(theString) {
    // https://stackoverflow.com/questions/17470554/how-to-capture-the-arrow-keys-in-node-js
    var unicodeString = '';
    for (var i=0; i < theString.length; i++) {
      var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
      while (theUnicode.length < 4) {
        theUnicode = '0' + theUnicode;
      }
      theUnicode = '\\u' + theUnicode;
      unicodeString += theUnicode;
    }
    return unicodeString;
  }
}
