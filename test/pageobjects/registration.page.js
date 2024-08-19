import allure from '@wdio/allure-reporter';
const { $ } = require('@wdio/globals')

class RegistrationPage {
  get inputName () { return $('id:com.loginmodule.learning:id/textInputEditTextName'); }
  get inputEmail () { return $('id:com.loginmodule.learning:id/textInputEditTextEmail'); }
  get inputPassword () { return $('id:com.loginmodule.learning:id/textInputEditTextPassword'); }
  get inputConfirmPassword () { return $('id:com.loginmodule.learning:id/textInputEditTextConfirmPassword'); }
  get btnRegister () { return $('id:com.loginmodule.learning:id/appCompatButtonRegister'); }
  get popupMessage () { return $('id:com.loginmodule.learning:id/snackbar_text'); }
  get alertInputName () { return $('-android uiautomator:new UiSelector().text(\"Enter Full Name\")'); }
  get alertInputEmail () { return $('-android uiautomator:new UiSelector().text(\"Enter Valid Email\")'); }
  get alertInputPassword () { return $('-android uiautomator:new UiSelector().text(\"Enter Password\")'); }
  get alertInputConfirmPassword () { return $('-android uiautomator:new UiSelector().text(\"Password Does Not Matches\")'); }
  get alertInputPasswordInvalidPolicy () { return $('-android uiautomator:new UiSelector().text(\"Invalid Password Policy\")'); } // This element doesn't exists, I just expect it to be exists
  
  async register (name, email, password, confirmPassword) {
    allure.addStep(`Input "${name}" to the name field`);
    await this.inputName.setValue(name);
    allure.addStep(`Input "${email}" to the email field`);
    await this.inputEmail.setValue(email);
    allure.addStep(`Input "${password}" to the password field`);
    await this.inputPassword.setValue(password);
    allure.addStep(`Input "${confirmPassword}" to the confirm password field`);
    await this.inputConfirmPassword.setValue(confirmPassword);
    allure.addStep(`Click Register button`);
    await this.btnRegister.click();
  }

  async clearAllField () {
    await this.inputName.clearValue();
    await this.inputEmail.clearValue();
    await this.inputPassword.clearValue();
    await this.inputConfirmPassword.clearValue();
  }
}

module.exports = new RegistrationPage();
