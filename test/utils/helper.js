const fs = require('fs');
const path = require('path');
const userPath = '../data/users.js';
const userFilePath = path.resolve(__dirname, userPath);
const users = require(userPath);
const LoginPage = require('../pageobjects/login.page');
const RegistrationPage = require('../pageobjects/registration.page');

const passwordType = {
  LESS_THAN_8: 'lessThan8',
  MORE_THAN_64: 'moreThan64',
  NO_LOWER_CASE: 'noLowerCase',
  NO_UPPER_CASE: 'noUpperCase',
  NO_DIGIT: 'noDigit',
  NO_SPECIAL_CHAR: 'noSpecialChar'
};

/**
 * Generates a new user object with unique attributes.
 * 
 * @returns {Object} A user object containing:
 *   - {string} name - The name of the user, including a unique timestamp.
 *   - {string} email - The email address of the user, including a unique timestamp.
 *   - {string} password - A predefined password string.
 * 
 * @example
 * const newUser = generateNewUser();
 * console.log(newUser.name); // e.g., 'John 1632987645678'
 */
function generateNewUser() {
  return{
    name: `John ${Date.now()}`,
    email: `john.${Date.now()}@example.com`,
    password: `@Bcd1234`
  };
}

/**
 * Register a new user using the provided user data and save to `users.js`.
 * 
 * @param {Object} userData - The data of the user to register.
 * 
 * @example
 * const newUser = generateNewUser();
 * await registerNewUser(newUser); // The registration process will be executed and the user data will be saved if successful.
 */
async function registerNewUser(userData) {
  await LoginPage.goToRegistrationPage();
  await RegistrationPage.register(userData.name, userData.email, userData.password, userData.password);
  await expect(RegistrationPage.popupMessage).toHaveText('Registration Successful');

  saveUser(userData)
}

/**
 * Saves user data to a file.
 * 
 * This function will save the `userData` to `/data/users.js`
 * 
 * @param {Object} user - The user object to be saved.
 * 
 * @example
 * const newUser = generateNewUser();
 * saveUser(newUser); // The `newUser` object will be added to the `users.userData` array and saved to `/data/users.js`.
 */
function saveUser(user) {
  users.userData.push(user);
  fs.writeFileSync(userFilePath, `module.exports = ${JSON.stringify(users, null, 2)};`);
}

/**
 * Generates a password that violates password policies.
 * 
 * @param {string} type - The type of password to generate.
 * Possible values:
 * - passwordType.LESS_THAN_8
 * - passwordType.MORE_THAN_64
 * - passwordType.NO_LOWER_CASE
 * - passwordType.NO_UPPER_CASE 
 * - passwordType.NO_DIGIT
 * - passwordType.NO_SPECIAL_CHAR
 * 
 * @returns {string} The generated invalid password.
 * 
 * @throws {Error} If an invalid type is provided.
 */
//
function generateInvalidPwd(type) {
  switch (type) {
    case passwordType.LESS_THAN_8:
      return 'Hai1@';
    case passwordType.MORE_THAN_64:
      return 'A'.repeat(64) + '1@';
    case passwordType.NO_LOWER_CASE:
      return 'PASSWORD@123';
    case passwordType.NO_UPPER_CASE:
      return 'password@123';
    case passwordType.NO_DIGIT:
      return 'Password@abc';
    case passwordType.NO_SPECIAL_CHAR:
      return 'Password1234';
    default:
      throw new Error('Invalid password type');
  }
}

module.exports = { generateNewUser, registerNewUser, saveUser, generateInvalidPwd, passwordType};