#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" > /dev/null 2>&1
}

# Define icons
CHECK_ICON="\033[0;32m✓\033[0m"  # Green checkmark
CROSS_ICON="\033[0;31m✗\033[0m"   # Red cross

# Check if ANDROID_HOME is set
if [ -z "$ANDROID_HOME" ]; then
    echo -e "${CROSS_ICON} ANDROID_HOME is not set. Please set it!"
else
    echo -e "${CHECK_ICON} ANDROID_HOME is set to $ANDROID_HOME"
    if [ -d "$ANDROID_HOME/platform-tools" ] && [ -f "$ANDROID_HOME/platform-tools/adb" ]; then
        echo -e "${CHECK_ICON} Android SDK Platform-tools are installed."
    else
        echo -e "${CROSS_ICON} Android SDK Platform-tools are not installed."
    fi
fi

# Check if JAVA_HOME is set
if [ -z "$JAVA_HOME" ]; then
    echo -e "${CROSS_ICON} JAVA_HOME is not set. Please set it!"
else
    echo -e "${CHECK_ICON} JAVA_HOME is set to $JAVA_HOME"
fi

# Check if Appium is installed
if command_exists appium; then
    echo -e "${CHECK_ICON} Appium is installed."
else
    echo -e "${CROSS_ICON} Appium is not installed. Please install it!"
fi

# Check if Java is available
if command_exists java; then
    echo -e "${CHECK_ICON} Java is installed."
else
    echo -e "${CROSS_ICON} Java is not installed. Please install it!"
fi

# Check if Node.js is available
if command_exists node; then
    echo -e "${CHECK_ICON} Node.js is installed."
else
    echo -e "${CROSS_ICON} Node.js is not installed. Please install it!"
fi

# Check if NPM is available
if command_exists npm; then
    echo -e "${CHECK_ICON} NPM is installed."
else
    echo -e "${CROSS_ICON} NPM is not installed. Please install it!"
fi
