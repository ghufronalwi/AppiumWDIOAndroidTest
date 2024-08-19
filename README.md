# Appium WebDriverIO Android Test 

This repository contains a simple appium project with WebDriverIO to execute android mobile automation test.

## Project Structure
```bash
root/
|
|-- allure-report/      # Generated after test run
|-- allure-results/     # Generated after test run
|-- sampleApp/
|---- mySampleApp.apk   # Sample APK for testing
|-- test/
|---- data/
|------ users.js        # Test data
|---- pageobjects/
|------ {page}.page.js  # Page objects files
|---- specs/
|------ {test}.e2e.js   # Test files
|---- utils/
|------ helper.js       # Utility functions
|-- package.json        # Contains dependencies needed for this project
|-- wdio.conf.json      # WebdriverIO configuration file
```

## Getting Started

### Requirements
Before start running the test, make sure you have install the following requirements on your machine:
1. **Node.js**: Make sure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. **Android Studio**: Install [Android Studio](https://developer.android.com/studio) and set up an Android Virtual Device (AVD).
3. **Java JDK**: Ensure Java is installed and `JAVA_HOME` is set correctly.
4. **Appium**: Install Appium globally using `npm install -g appium`.

> I'm using:
> - Node version 21.7.3
> - NPM version 10.5.0
> - Android Studio Koala | 2024.1.1 Patch 2
> - Java JDK 8 v1.8.0_421
> - Appium version 2.11.3
>
> In case there is an issue during the installation or during the run process, it might be worth updating the version to match mine.

### Dependencies
All packages has been listed in `package.json`. List of the packages used in this project are:
- @wdio/allure-reporter : Integrates allure reporting with WebDriverIO.
- @wdio/appium-service  : Adds support for Appium services in WebDriverIO. It allows WebDriverIO to communicate with Appium to perform mobile automation tasks.
- @wdio/cli             : Provides the WebdriverIO command-line interface.
- @wdio/local-runner    : Executes WebdriverIO tests locally on your machine. It manages the test runner’s lifecycle and processes test results.
- @wdio/mocha-framework : Integrates the Mocha test framework with WebdriverIO. Mocha provides the structure for writing and running tests, including support for test suites and assertions.
- @wdio/spec-reporter   : Provides a simple, human-readable test result in the console.
- allure-commandline    : Command-line tool for generating and serving Allure reports.

### Installation

#### 1. Install Appium UIAutomator2 Driver
This is Appium driver for testing android devices. Run this command to install
```
appium driver install uiautomator2
```

#### 2. Install Android SDK Components
Make sure the following SDK components are installed:
- SDK Platform (select Android platform to automate, for my example, API level 34)
- Platform Tools
- Command-line Tools
If you have installed android studio, you can easily install the above list through SDK Manager menu. Here are example screenshot of mine:
[ScreenshotAndroidStudioSDKManager]()

#### 3. Set Up Android Emulator
- Open Android Studio
- Go to **More Actions** -> **Virtual Device Manager**
- Create and start an Android Virtual Device (AVD) with your desired configuration.

> [!WARNING]
> **Important:**: The sample application does not compatible with Android 15 (SDK 35). I suggest using a lower version. In my case, I use Android 13 (SDK 33). Using Android 14  (SDK 34) still got warning that the app should be updated.

#### 4. Set Up Environment Variables
Make sure you have configured the following environment variables:
- ANDROID_HOME: Path to your Android SDK directory. (you can find the location from Android Studio, go to **More Actions** -> **SDK Manager**)
- JAVA_HOME: Path to your Java JDK installation. (you can find the location using command `where java`)

#### 5. Verify installation
To verify that everything is installed and configured correctly, you can run `check-requirements.bat` or `check-requirements.sh`. This is the sample output:
[ScreenshotCheckReq]()

> Note: Make sure everything is installed and configured correctly.

## How To Run
### 1. Start Appium Server
Open a terminal and start the Appium server:
```
appium --base-path /wd/hub --allow-cors
```

### 2. Start Android Emulator
Open Android Studio, go to **More Actions** -> **Virtual Device Manager** -> **Start your emulator**
> [!IMPORTANT]  
> Note: Make sure your emulator has already running before executing the test.

### 3. Run test
Execute the test by running this command:
```bash
npm run test
```

### 4. Report
- Once the test has run, you will see 2 new directories (`allure-results` and `allure-report`). To open the report, run this command:
```bash
npm run allure-report
```

## Screenshot of test results
[AllureScreenshot]()