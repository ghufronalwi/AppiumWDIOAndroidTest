const { $ } = require('@wdio/globals')

class HomePage {
  get labelHelloUser () { return $('id:com.loginmodule.learning:id/textViewName'); }
}

module.exports = new HomePage();
