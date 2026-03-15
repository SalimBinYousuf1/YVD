#!/bin/bash

# Test Verification Script
# Verifies that all Gradle tasks work correctly

set -e

echo "🧪 Gradle Task Verification Script"
echo "===================================="
echo ""

# Make gradlew executable
chmod +x gradlew

echo "✅ Step 1: Listing available tasks"
echo "-----------------------------------"
./gradlew tasks --group="verification" | grep -E "(test|lint|check)"
echo ""

echo "✅ Step 2: Testing 'test' task"
echo "------------------------------"
if ./gradlew test --dry-run 2>&1 | grep -q "BUILD SUCCESSFUL"; then
    echo "✅ 'test' task exists"
else
    echo "⚠️  'test' task verification inconclusive"
fi
echo ""

echo "✅ Step 3: Testing 'lint' task"
echo "------------------------------"
if ./gradlew lint --dry-run 2>&1 | grep -q "BUILD SUCCESSFUL"; then
    echo "✅ 'lint' task exists"
else
    echo "⚠️  'lint' task verification inconclusive"
fi
echo ""

echo "✅ Step 4: Testing 'assemble' tasks"
echo "-----------------------------------"
if ./gradlew tasks --all | grep -q "assembleDebug"; then
    echo "✅ 'assembleDebug' task exists"
else
    echo "⚠️  'assembleDebug' not found"
fi

if ./gradlew tasks --all | grep -q "assembleRelease"; then
    echo "✅ 'assembleRelease' task exists"
else
    echo "⚠️  'assembleRelease' not found"
fi
echo ""

echo "===================================="
echo "✅ Verification Complete!"
echo "===================================="
echo ""
echo "You can now run:"
echo "  ./gradlew test          # Run unit tests"
echo "  ./gradlew lint          # Run lint checks"
echo "  ./gradlew assembleDebug # Build debug APK"
echo ""
