const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Define the path to emulator
const ANDROID_HOME = process.env.ANDROID_HOME || ''; // Ensure ANDROID_HOME is set in your environment
const EMULATOR_PATH = path.join(ANDROID_HOME, 'emulator', 'emulator');

// Path to the wdio.conf.js file
const WDIO_CONF_PATH = 'wdio.conf.js';

// Read the contents of the wdio.conf.js file
const fileContent = fs.readFileSync(WDIO_CONF_PATH, 'utf8');

// Regular expression to extract appium:deviceName
const deviceNameMatch = fileContent.match(/'appium:deviceName':\s*'([^']+)'/);

if (!deviceNameMatch) {
    console.error('[FAIL] Device name not found in wdio.conf.js.');
    process.exit(1);
}

const deviceName = deviceNameMatch[1];

// Get the list of available AVDs
let emulatorOutput;

try {
    emulatorOutput = execSync(`"${EMULATOR_PATH}" -list-avds`).toString();
} catch (error) {
    console.error('[FAIL] Failed to execute emulator command. Ensure the Android SDK is installed and the path is correct.');
    process.exit(1);
}

// Check if the deviceName is in the list of available AVDs
const isDeviceAvailable = emulatorOutput.split('\n').some(line => line.includes(deviceName));

if (isDeviceAvailable) {
    console.log(`[OK] Emulator ${deviceName} is available. Make sure to run the emulator before running the test`);
    process.exit(0);
} else {
    console.error(`[WARNING] Emulator ${deviceName} is not available.\nMake sure:
                1. To update 'appium:deviceName' in wdio.conf.js to match your emulator Name\n
                2. Run the emulator before running the test`);
    process.exit(1);
}
