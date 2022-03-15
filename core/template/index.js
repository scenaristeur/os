import modele from './template.js'

export { Template }

class Template {
  constructor(options = {}) {
    Object.assign(this, modele);
    this.type = "template"
    Object.assign(this, options);
  }
  showdebug(){
    console.log(this)
  }
}
