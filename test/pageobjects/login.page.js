import allure from '@wdio/allure-reporter';
const { $ } = require('@wdio/globals')

class LoginPage {
  get inputEmail () { return $('id:com.loginmodule.learning:id/textInputEditTextEmail'); }
  get inputPassword () { return $('id:com.loginmodule.learning:id/textInputEditTextPassword'); }
  get btnLogin () { return $('id:com.loginmodule.learning:id/appCompatButtonLogin'); }
  get linkRegister () { return $('id:com.loginmodule.learning:id/textViewLinkRegister'); }
  get popupMessage () { return $('id:com.loginmodule.learning:id/snackbar_text'); }
  get alertInputEmail () { return $('-android uiautomator:new UiSelector().text(\"Enter Valid Email\")'); }
  get alertInputPassword () { return $('-android uiautomator:new UiSelector().text(\"Enter Valid Password\")'); } // This element doesn't exists, I just expect it to be exists

  async login (email, password) {
    allure.addStep(`Input "${email}" to the email field`);
    await this.inputEmail.setValue(email);
    allure.addStep(`Input "${password}" to the password field`);
    await this.inputPassword.setValue(password);
    allure.addStep(`Click Login button`);
    await this.btnLogin.click();
  }

  async goToRegistrationPage () {
    await this.linkRegister.click();
  }
}

module.exports = new LoginPage();
