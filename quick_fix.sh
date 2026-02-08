#!/bin/bash

echo "🚀 Starting fix process..."

# 1. Kill any running processes
killall node 2>/dev/null
echo "✅ Killed running processes"

# 2. Fix HomeScreen casing
if [ -f "src/screens/user/Homescreen.jsx" ]; then
  mv src/screens/user/Homescreen.jsx src/screens/user/HomeScreen.jsx
  echo "✅ Fixed HomeScreen casing"
fi

# 3. Rename App.jsx to App.tsx
if [ -f "App.jsx" ]; then
  mv App.jsx App.tsx
  echo "✅ Renamed App.jsx to App.tsx"
fi

# 4. Update App.tsx imports
if [ -f "App.tsx" ]; then
  # Remove .jsx extensions from imports
  sed -i "" "s|.jsx'|'|g" App.tsx
  # Fix HomeScreen import if needed
  sed -i "" "s|Homescreen|HomeScreen|g" App.tsx
  echo "✅ Updated App.tsx imports"
fi

# 5. Clear cache
rm -rf node_modules/.cache
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-map-*
echo "✅ Cleared cache"

# 6. Install dependencies if needed
if [ ! -d "node_modules/react-native-vector-icons" ]; then
  echo "📦 Installing missing dependencies..."
  npm install react-native-vector-icons react-native-linear-gradient
fi

echo "🎉 Fix complete! Run: npx react-native run-ios"
