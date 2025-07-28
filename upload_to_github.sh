#!/bin/bash

echo "🚀 Uploading LiDAR Research Website to GitHub..."
echo "Repository: https://github.com/Lidar-attack/lidar-research"
echo ""

# Check if we're in the right directory
if [ ! -f "professional.html" ]; then
    echo "❌ Error: professional.html not found. Make sure you're in the website directory."
    exit 1
fi

echo "📁 Current directory contents:"
ls -la

echo ""
echo "🔧 Setting up git repository..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Add remote origin
git remote remove origin 2>/dev/null
git remote add origin https://github.com/Lidar-attack/lidar-research.git
echo "✅ Remote origin set"

# Add all files
git add .
echo "✅ Files added to git"

# Create commit
git commit -m "Add LiDAR mirror attack research website

This website presents comprehensive research on mirror-based LiDAR attacks:
- Object Addition Attacks (OAA) creating phantom obstacles
- Object Removal Attacks (ORA) hiding real hazards  
- Real-world experiments with Ouster OS1-128 LiDAR
- CARLA simulation framework with crash demonstrations
- Autoware integration showing autonomous vehicle responses

Professional version: professional.html
Original version: index.html"

echo "✅ Commit created"

echo ""
echo "🌐 Pushing to GitHub..."
echo "You will be prompted for your GitHub credentials:"
echo "Username: Lidar-attack"
echo "Password: funteam2025"
echo ""

# Push to GitHub
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Website uploaded to GitHub"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to: https://github.com/Lidar-attack/lidar-research"
    echo "2. Click 'Settings' tab"
    echo "3. Scroll to 'Pages' section"
    echo "4. Select 'Deploy from a branch' → 'main' → '/ (root)'"
    echo "5. Click 'Save'"
    echo ""
    echo "🌐 Your website will be available at:"
    echo "   https://lidar-attack.github.io/lidar-research/professional.html"
    echo ""
else
    echo ""
    echo "⚠️  If 'main' branch failed, trying 'master'..."
    git push -u origin master
fi

echo ""
echo "📱 For your paper, use this URL:"
echo "https://lidar-attack.github.io/lidar-research/professional.html"