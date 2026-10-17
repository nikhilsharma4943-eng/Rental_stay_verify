@REM ----------------------------------------------------------------------------
@REM StayVerify Root Maven Wrapper Script for Windows
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set "MAVEN_CMD=%LOCALAPPDATA%\Programs\Maven\apache-maven-3.9.6\bin\mvn.cmd"

if exist "%MAVEN_CMD%" (
    "%MAVEN_CMD%" -f backend/pom.xml %*
) else (
    where mvn >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        mvn -f backend/pom.xml %*
    ) else (
        echo [ERROR] Maven not found.
        exit /b 1
    )
)
