import allure from '@wdio/allure-reporter';
const { generateNewUser, registerNewUser } = require('../utils/helper.js');
const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');

describe('Login Tests', () => {
  // Generate new user using helper function in `addNewUser.js`
  const newUser = generateNewUser();

  beforeEach(async () => {
    await driver.activateApp('com.loginmodule.learning');
  });

  afterEach(async () => {
    await driver.terminateApp('com.loginmodule.learning');
  });

  it('Login with registered user', async () => {
    allure.startStep(`Preparation: Register new user`);
      await registerNewUser(newUser);
      await driver.back();
    allure.endStep();
    
    allure.startStep(`Input registered user email and password`);
      await LoginPage.login(newUser.email, newUser.password);
    allure.endStep();
    allure.startStep(`Expect labelHelloUser toHaveText ${newUser.email}`);
      await expect(HomePage.labelHelloUser).toHaveText(newUser.email);
    allure.endStep();
  });

  it('Login with wrong email', async () => {
    allure.startStep(`Input wrong email correct password`);
      await LoginPage.login('wrong'+newUser.email, newUser.password);
    allure.endStep();

    allure.startStep(`Expect popupMessage toBeDisplayed`);
      await expect(LoginPage.popupMessage).toBeDisplayed();
    allure.endStep();
    allure.startStep(`Expect popupMessage toHaveText "Wrong Email or Password"`);
      await expect(LoginPage.popupMessage).toHaveText('Wrong Email or Password');
    allure.endStep();
  });

  it('Login with wrong password', async () => {
    allure.startStep(`Input correct email wrong password`);
      await LoginPage.login(newUser.email, 'wrong'+newUser.password);
    allure.endStep();

    allure.startStep(`Expect popupMessage toBeDisplayed`);
      await expect(LoginPage.popupMessage).toBeDisplayed();
    allure.endStep();
    allure.startStep(`Expect popupMessage toHaveText "Wrong Email or Password"`);
      await expect(LoginPage.popupMessage).toHaveText('Wrong Email or Password');
    allure.endStep();
  });

  it('Login with unregistered user', async () => {
    allure.startStep(`Input unregistered user email and password`);
      await LoginPage.login('unregistered.user@example.com', 'N0tRegisterYet!');
    allure.endStep();

    allure.startStep(`Expect popupMessage toBeDisplayed`);
      await expect(LoginPage.popupMessage).toBeDisplayed();
    allure.endStep();
    allure.startStep(`Expect popupMessage toHaveText "Wrong Email or Password"`);
      await expect(LoginPage.popupMessage).toHaveText('Wrong Email or Password');
    allure.endStep();
  });

  it('Login with empty email field', async () => {
    allure.startStep(`Input empty empty email and click button Login`);
      await LoginPage.login('', newUser.password);
    allure.endStep();

    allure.startStep(`Expect alertInputEmail toBeDisplayed`);
      await expect(LoginPage.alertInputEmail).toBeDisplayed();
    allure.endStep();
  });

  // This case is expected to be failed
  it('Login with empty password field', async () => {
    allure.startStep(`Input empty password field then click login`);
      await LoginPage.login(newUser.email, '');
    allure.endStep();

    allure.startStep(`Expect alertInputPassword toBeDisplayed`);
      await expect(LoginPage.alertInputPassword).toBeDisplayed();
    allure.endStep();
  });

  // This case is expected to be failed
  it('Login with no internet connection', async () => {
    // Turn on airplane mode
    await driver.toggleAirplaneMode();

    allure.startStep(`Login with no internet connection`);
      await LoginPage.login(newUser.email, newUser.password);
    allure.endStep();

    // Turn off airplane mode
    await driver.toggleAirplaneMode();

    allure.startStep(`Expect popupMessage toBeDisplayed`);
      await expect(LoginPage.popupMessage).toBeDisplayed();
    allure.endStep();
    allure.startStep(`Expect popupMessage toHaveText "No Internet connection!"`);
      await expect(LoginPage.popupMessage).toHaveText('No Internet connection!');
    allure.endStep();
  });
})
