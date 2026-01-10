#!/bin/bash

# Deploy to Cloudflare Pages
echo "Deploying punkassgrackle-site to Cloudflare Pages..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Deploy the current directory
echo "Deploying files..."
wrangler pages deploy . --project-name punkassgrackle

echo "Deployment complete!"
echo "Your site should be available at:"
echo "  https://punkassgrackle.pages.dev"
echo ""
echo "To verify deployment:"
echo "  1. Check https://punkassgrackle.pages.dev/"
echo "  2. Check https://punkassgrackle.pages.dev/dnd/"