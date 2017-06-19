#!/bin/bash
# see more
# https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    npm run build
    exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}

# Run our compile script
npm run build

# Set some git options
git config --global user.name "strong"
git config --global user.email "70786564@qq.com"
git remote set-url origin "${SSH_REPO}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in scripts/deploy_key.enc -out scripts/deploy_key -d
chmod 600 scripts/deploy_key
eval `ssh-agent -s`
ssh-add scripts/deploy_key

# Now that we're all set up, we can deploy.
npm run deploy
