@echo off
setlocal

:: Define icons using plain text
set CHECK_ICON=[OK]
set CROSS_ICON=[FAIL]

:: Check if ANDROID_HOME is set
if "%ANDROID_HOME%"=="" (
    echo %CROSS_ICON% ANDROID_HOME is not set. Please set it!
) else (
    echo %CHECK_ICON% ANDROID_HOME is set to %ANDROID_HOME%
    if exist "%ANDROID_HOME%\platform-tools\adb.exe" (
        echo %CHECK_ICON% Android SDK Platform-tools are installed.
    ) else (
        echo %CROSS_ICON% Android SDK Platform-tools are not installed.
    )
)

:: Check if JAVA_HOME is set
if "%JAVA_HOME%"=="" (
    echo %CROSS_ICON% JAVA_HOME is not set. Please set it!
) else (
    echo %CHECK_ICON% JAVA_HOME is set to %JAVA_HOME%
)

:: Check if Appium is installed
where appium >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo %CHECK_ICON% Appium is installed.
) else (
    echo %CROSS_ICON% Appium is not installed. Please install it!
)

:: Check if Java is available
where java >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo %CHECK_ICON% Java is installed.
) else (
    echo %CROSS_ICON% Java is not installed. Please install it!
)

:: Check if Node.js is available
where node >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo %CHECK_ICON% Node.js is installed.
) else (
    echo %CROSS_ICON% Node.js is not installed. Please install it!
)

:: Check if NPM is available
where npm >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo %CHECK_ICON% NPM is installed.
) else (
    echo %CROSS_ICON% NPM is not installed. Please install it!
)

endlocal
