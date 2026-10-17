@REM ----------------------------------------------------------------------------
@REM StayVerify Maven Wrapper Script for Windows
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set "MAVEN_CMD=%LOCALAPPDATA%\Programs\Maven\apache-maven-3.9.6\bin\mvn.cmd"

if exist "%MAVEN_CMD%" (
    "%MAVEN_CMD%" %*
) else (
    where mvn >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        mvn %*
    ) else (
        echo [ERROR] Maven not found. Please install Apache Maven or verify %MAVEN_CMD%
        exit /b 1
    )
)
