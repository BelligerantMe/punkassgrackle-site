#!/bin/bash

# Simple deployment script for Cloudflare Pages

echo "Preparing to deploy to Cloudflare Pages..."

# Create a clean deployment directory
rm -rf _deploy
mkdir _deploy

# Copy only the essential files
cp index.html _deploy/
cp ../dnd_character_survey_hosted.html _deploy/

echo "Files to deploy:"
ls -la _deploy/

echo ""
echo "Now:"
echo "1. Go to your Cloudflare Pages project"
echo "2. Click 'Upload assets' or similar"
echo "3. Select ALL files from the _deploy folder:"
echo "   - index.html"
echo "   - dnd_character_survey_hosted.html"
echo "4. Deploy"
echo ""
echo "The _deploy folder is ready at:"
echo "$(pwd)/_deploy"