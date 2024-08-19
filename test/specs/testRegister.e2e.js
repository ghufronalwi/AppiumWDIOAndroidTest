import allure from '@wdio/allure-reporter';
const LoginPage = require('../pageobjects/login.page');
const RegistrationPage = require('../pageobjects/registration.page');
const HomePage = require('../pageobjects/home.page');
const { generateNewUser, saveUser, generateInvalidPwd, passwordType } = require('../utils/helper.js');


describe('Registration Tests', () => {
  // Generate new user using helper function in `addNewUser.js`
  const newUser = generateNewUser();

  beforeEach(async () => {
    await driver.activateApp('com.loginmodule.learning');
  });

  afterEach(async () => {
    await driver.terminateApp('com.loginmodule.learning');
  });

  it('Register with valid data', async () => {
    allure.startStep(`Go to registration page, then register with valid data`);
      await LoginPage.goToRegistrationPage();
      await RegistrationPage.register(newUser.name, newUser.email, newUser.password, newUser.password);
    allure.endStep();

    allure.startStep(`Expect popupMessage toBeDisplayed`);
      await expect(RegistrationPage.popupMessage).toBeDisplayed();
    allure.endStep();
    allure.startStep(`Expect popupMessage toHaveText "Registration Successful"`);
      await expect(RegistrationPage.popupMessage).toHaveText('Registration Successful');
    allure.endStep();

    // Add new registered user to `user.js`
    saveUser(newUser);

    // Validate if new registered user able to login
    await driver.back();
    allure.startStep(`Validate if newly registered user able to login`);
      await LoginPage.login(newUser.email, newUser.password);
    allure.endStep();
    allure.startStep(`Expect labelHelloUser toHaveText ${newUser.email}`);
      await expect(HomePage.labelHelloUser).toHaveText(newUser.email);
    allure.endStep();
  });

  it('Register with existing email', async () => {
    allure.startStep(`Go to registration page and register with existing email`);
      await LoginPage.goToRegistrationPage();
      await RegistrationPage.register(newUser.name, newUser.email, newUser.password, newUser.password);
    allure.endStep();

    allure.startStep(`Expect popupMessage toBeDisplayed`);
      await expect(RegistrationPage.popupMessage).toBeDisplayed();
    allure.endStep();
    allure.startStep(`Expect popupMessage toHaveText "Email Already Exists"`);
      await expect(RegistrationPage.popupMessage).toHaveText('Email Already Exists');
    allure.endStep();
  });

  it('Register with empty name', async () => {
    allure.startStep(`Go to registration page and register with empty name field`);
      await LoginPage.goToRegistrationPage();
      await RegistrationPage.register("", newUser.email, newUser.password, newUser.password);
    allure.endStep();

    allure.startStep(`Expect alertInputName toBeDisplayed`);
      await expect(RegistrationPage.alertInputName).toBeDisplayed();
    allure.endStep();
  });

  it('Register with empty email', async () => {
    allure.startStep(`Go to registration page and register with empty email field`);
      await LoginPage.goToRegistrationPage();
      await RegistrationPage.register(newUser.name, "", newUser.password, newUser.password);
    allure.endStep();

    allure.startStep(`Expect alertInputEmail toBeDisplayed`);
      await expect(RegistrationPage.alertInputEmail).toBeDisplayed();
    allure.endStep();
  });

  it('Register with empty password', async () => {
    allure.startStep(`Go to registration page and register with empty password field`);
      await LoginPage.goToRegistrationPage();
      await RegistrationPage.register(newUser.name, newUser.email, "", newUser.password);
    allure.endStep();

    allure.startStep(`Expect alertInputPassword toBeDisplayed`);
      await expect(RegistrationPage.alertInputPassword).toBeDisplayed();
    allure.endStep();
  });

  it('Register with empty confirm password', async () => {
    allure.startStep(`Go to registration page and register with empty confirm password field`);
      await LoginPage.goToRegistrationPage();
      await RegistrationPage.register(newUser.name, newUser.email, newUser.password, "");
    allure.endStep();

    allure.startStep(`Expect alertInputConfirmPassword toBeDisplayed`);
      await expect(RegistrationPage.alertInputConfirmPassword).toBeDisplayed();
    allure.endStep();
  });

  it('Register with invalid email format', async () => {
    allure.startStep(`Go to registration page and register with invalid email format`);
      await LoginPage.goToRegistrationPage();
      await RegistrationPage.register(newUser.name, "foo bar", newUser.password, newUser.password);
    allure.endStep();

    allure.startStep(`Expect alertInputEmail toBeDisplayed`);
      await expect(RegistrationPage.alertInputEmail).toBeDisplayed();
    allure.endStep();
  });

  it('Register with incorrect password confirmation', async () => {
    allure.startStep(`Go to registration page and register with incorrect password confirmation`);
      await LoginPage.goToRegistrationPage();
      await RegistrationPage.register(newUser.name, newUser.email, "@Bcd1234", "FooBar@123");
    allure.endStep();

    allure.startStep(`Expect alertInputConfirmPassword toBeDisplayed`);
      await expect(RegistrationPage.alertInputConfirmPassword).toBeDisplayed();
    allure.endStep();
  });

  it('Register with case insensitive password confirmation', async () => {
    allure.startStep(`Go to registration page and register with case insensitive password confirmation`);
      await LoginPage.goToRegistrationPage();
      await RegistrationPage.register(newUser.name, newUser.email, "@Super1234", "@super1234");
    allure.endStep();

    allure.startStep(`Expect alertInputConfirmPassword toBeDisplayed`);
      await expect(RegistrationPage.alertInputConfirmPassword).toBeDisplayed();
    allure.endStep();
  });

  // This case is expected to be failed
  it('Register with invalid password policy', async () => {
    const pwdLessThan8 = generateInvalidPwd(passwordType.LESS_THAN_8);
    const pwdMoreThan64 = generateInvalidPwd(passwordType.MORE_THAN_64);
    const pwdNoLowerCase = generateInvalidPwd(passwordType.NO_LOWER_CASE);
    const pwdNoUpperCase = generateInvalidPwd(passwordType.NO_UPPER_CASE);
    const pwdNoDigit = generateInvalidPwd(passwordType.NO_DIGIT);
    const pwdNoSpecialChar = generateInvalidPwd(passwordType.NO_SPECIAL_CHAR);

    allure.startStep(`Go to registration page`);
      await LoginPage.goToRegistrationPage();
    allure.endStep();

    allure.startStep(`Register with password less than 8`);
      await RegistrationPage.register(newUser.name, newUser.email, pwdLessThan8, pwdLessThan8);
    allure.endStep();
    allure.startStep(`Expect alertInputPasswordInvalidPolicy toBeDisplayed`);
      await expect(RegistrationPage.alertInputPasswordInvalidPolicy).toBeDisplayed();
    allure.endStep();

    allure.startStep(`Register with password more than 64`);
      await RegistrationPage.register(newUser.name, newUser.email, pwdMoreThan64, pwdMoreThan64);
    allure.endStep();
    allure.startStep(`Expect alertInputPasswordInvalidPolicy toBeDisplayed`);
      await expect(RegistrationPage.alertInputPasswordInvalidPolicy).toBeDisplayed();
    allure.endStep();

    allure.startStep(`Register with password without lower case`);
      await RegistrationPage.register(newUser.name, newUser.email, pwdNoLowerCase, pwdNoLowerCase);
    allure.endStep();
    allure.startStep(`Expect alertInputPasswordInvalidPolicy toBeDisplayed`);
      await expect(RegistrationPage.alertInputPasswordInvalidPolicy).toBeDisplayed();
    allure.endStep();

    allure.startStep(`Register with password without upper case`);
      await RegistrationPage.register(newUser.name, newUser.email, pwdNoUpperCase, pwdNoUpperCase);
    allure.endStep();
    allure.startStep(`Expect alertInputPasswordInvalidPolicy toBeDisplayed`);
      await expect(RegistrationPage.alertInputPasswordInvalidPolicy).toBeDisplayed();
    allure.endStep();

    allure.startStep(`Register with password without digit character`);
      await RegistrationPage.register(newUser.name, newUser.email, pwdNoDigit, pwdNoDigit);
    allure.endStep();
    allure.startStep(`Expect alertInputPasswordInvalidPolicy toBeDisplayed`);
      await expect(RegistrationPage.alertInputPasswordInvalidPolicy).toBeDisplayed();
    allure.endStep();

    allure.startStep(`Register with password without special characters`);
      await RegistrationPage.register(newUser.name, newUser.email, pwdNoSpecialChar, pwdNoSpecialChar);
    allure.endStep();
    allure.startStep(`Expect alertInputPasswordInvalidPolicy toBeDisplayed`);
      await expect(RegistrationPage.alertInputPasswordInvalidPolicy).toBeDisplayed();
    allure.endStep();
  });

  // This case is expected to be failed
  it('Register with no internet connection', async () => {
    // Turn on airplane mode
    await driver.toggleAirplaneMode();

    allure.startStep(`Go to registration page and register with airplane mode on`);
      await LoginPage.goToRegistrationPage();
      await RegistrationPage.register(newUser.name, newUser.email, newUser.password, newUser.password);
    allure.endStep();

    // Turn off airplane mode
    await driver.toggleAirplaneMode();

    allure.startStep(`Expect popupMessage toBeDisplayed`);
      await expect(RegistrationPage.popupMessage).toBeDisplayed();
    allure.endStep();
    allure.startStep(`Expect popupMessage toHaveText "No Internet connection!"`);
      await expect(RegistrationPage.popupMessage).toHaveText('No Internet connection!');
    allure.endStep();
  });
})