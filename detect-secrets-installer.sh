#!/bin/bash

set -e

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Step 1: Ensure Python is installed
if command_exists python3; then
    echo "✅ Python3 is already installed."
else
    echo "🚀 Python3 is not installed. Installing..."
    sudo apt update
    sudo apt install -y python3 python3-pip
fi

# Step 2: Ensure pip3 is installed
if command_exists pip3; then
    echo "✅ pip3 is already installed."
else
    echo "🚀 pip3 is not installed. Installing..."
    sudo apt update
    sudo apt install -y python3-pip
fi

# Step 3: Install detect-secrets
echo "📦 Installing detect-secrets..."
pip3 install --upgrade detect-secrets

# Step 4: Run detect-secrets scan
echo "🔍 Running detect-secrets scan..."
detect-secrets scan > .secrets.baseline

echo "✅ Scan complete. Baseline saved to .secrets.baseline."

