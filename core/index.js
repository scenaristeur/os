
export { Core }

class Core {
  constructor(options = {}) {
    this.pwd =  process.env.PWD
    this.lang = process.env.LANG
    this.language = process.env.LANGUAGE
    // // this['ve:type'] = "base"
    // // loading modele
    // Object.assign(this, modele);
    // // update basic props
    // this.id = uuidv4()
    // this['type'] = "base"
    // this["created"] = Date.now()
    // // updating with options
    // Object.assign(this, options);
    // // this.options = options
    //
    // // ...
  }
  debug(){
      console.log(this)
  }
}
