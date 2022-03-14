
export { User }

class User {
  constructor(options = {}) {
    this.user =  process.env.USER
    this.lang = process.env.LANG
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
