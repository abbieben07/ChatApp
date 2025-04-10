@echo off
setlocal enabledelayedexpansion

REM Specify the path to your .env file
set "env_file=.env"

REM Loop through each line in the .env file
for /f "usebackq delims=" %%a in ("%env_file%") do (
    REM Split the line into variable name and value
    for /f "tokens=1,* delims==" %%b in ("%%a") do (
        REM Set the environment variable
        set "%%b=%%c"
    )
)

set DOTENVENC_PASS=fake

if /i "%~1" == "decrypt" (
    echo "Decrypting Development files..."
    set DOTENVENC_PASS=!ENV_DEVE_KEY!
    .\node_modules\.bin\dotenvenc -d -i .env.development.enc > .env.development

    echo "Decrypting Staging file..."
    set DOTENVENC_PASS=!ENV_STAG_KEY!
    .\node_modules\.bin\dotenvenc -d -i .env.staging.enc > .env.staging

    echo "Decrypting Production file..."
    set DOTENVENC_PASS=!ENV_PROD_KEY!
    .\node_modules\.bin\dotenvenc -d -i .env.production.enc > .env.production
) else if /i "%~1" == "encrypt" (
    echo "Encrypting Development .env file..."
    set DOTENVENC_PASS=!ENV_DEVE_KEY!
    .\node_modules\.bin\dotenvenc -e -i .env.development -o .env.development.enc

    echo "Encrypting Staging .env file..."
    set DOTENVENC_PASS=!ENV_STAG_KEY!
    .\node_modules\.bin\dotenvenc -e -i .env.staging -o .env.staging.enc

    echo "Encrypting Production .env file..."
    set DOTENVENC_PASS=!ENV_PROD_KEY!
    .\node_modules\.bin\dotenvenc -e -i .env.production -o .env.production.enc
) else (
    echo Invalid argument. Please specify 'decrypt' or 'encrypt'.
)

endlocal
