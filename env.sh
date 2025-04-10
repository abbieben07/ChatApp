#!/bin/zsh

# Specify the path to your .env file
env_file=".env"

# Read the .env file line by line and set environment variables
while IFS= read -r line; do
    # Check if line is empty or starts with # (comment)
    if [[ -n "$line" && "$line" != \#* ]]; then
        # Split the line into variable name and value
        var_name="${line%%=*}"
        var_value="${line#*=}"
        # Set the environment variable
        export "$var_name"="$var_value"
    fi
done <"$env_file"

# Fake password for demonstration; replace with secure method of managing passwords
DOTENVENC_PASS="fake"

# Validate the argument passed to the script
if [[ "$(echo "$1" | tr '[:upper:]' '[:lower:]')" == "decrypt" ]]; then

    echo "Decrypting Development files..."
    export DOTENVENC_PASS=$ENV_DEVE_KEY # Use environment variable for decryption key
    npx dotenvenc -d -i .env.development.enc >.env.development

    echo "Decrypting Staging file..."
    export DOTENVENC_PASS=$ENV_STAG_KEY
    npx dotenvenc -d -i .env.staging.enc >.env.staging

    echo "Decrypting Production file..."
    export DOTENVENC_PASS=$ENV_PROD_KEY
    npx dotenvenc -d -i .env.production.enc >.env.production

elif [[ "$(echo "$1" | tr '[:upper:]' '[:lower:]')" == "encrypt" ]]; then

    echo "Encrypting Development .env file..."
    export DOTENVENC_PASS=$ENV_DEVE_KEY
    npx dotenvenc -e -i .env.development -o .env.development.enc

    echo "Encrypting Staging .env file..."
    export DOTENVENC_PASS=$ENV_STAG_KEY
    npx dotenvenc -e -i .env.staging -o .env.staging.enc

    echo "Encrypting Production .env file..."
    export DOTENVENC_PASS=$ENV_PROD_KEY
    npx dotenvenc -e -i .env.production -o .env.production.enc

else
    echo "Invalid argument. Please specify 'decrypt' or 'encrypt'."
fi
