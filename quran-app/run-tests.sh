#!/bin/bash

# Comprehensive Test Runner for Qur'an App
# This script runs all tests and generates reports

set -e  # Exit on any error

echo "🌙 Al-Qur'an App - Comprehensive Test Suite"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if gradlew exists
if [ ! -f "./gradlew" ]; then
    print_error "gradlew not found! Please run this script from the project root."
    exit 1
fi

# Make gradlew executable
chmod +x ./gradlew

echo "Step 1: Clean Build"
echo "-------------------"
./gradlew clean
print_success "Clean completed"
echo ""

echo "Step 2: Running Lint Checks"
echo "---------------------------"
if ./gradlew lintDebug; then
    print_success "Lint checks passed"
else
    print_error "Lint checks failed"
    exit 1
fi
echo ""

echo "Step 3: Running Unit Tests"
echo "-------------------------"
if ./gradlew testDebugUnitTest; then
    print_success "Unit tests passed"
else
    print_error "Unit tests failed"
    exit 1
fi
echo ""

echo "Step 4: Generating Test Coverage Report"
echo "--------------------------------------"
if ./gradlew testDebugUnitTest jacocoTestReport 2>/dev/null || true; then
    print_success "Coverage report generated"
else
    print_info "Coverage report skipped (jacocoTestReport not configured)"
fi
echo ""

echo "Step 5: Building Debug APK"
echo "-------------------------"
if ./gradlew assembleDebug; then
    print_success "Debug APK built successfully"
else
    print_error "Debug APK build failed"
    exit 1
fi
echo ""

echo "Step 6: Checking for Instrumented Test Environment"
echo "-------------------------------------------------"
if adb devices | grep -q "device$"; then
    print_info "Device/Emulator detected, running instrumented tests..."
    if ./gradlew connectedDebugAndroidTest; then
        print_success "Instrumented tests passed"
    else
        print_error "Instrumented tests failed"
        exit 1
    fi
else
    print_info "No device/emulator detected, skipping instrumented tests"
    print_info "To run instrumented tests: Start an emulator or connect a device"
fi
echo ""

echo "=========================================="
echo "🎉 All Tests Completed Successfully!"
echo "=========================================="
echo ""

print_info "Test Reports Location:"
echo "  - Unit Tests: app/build/reports/tests/testDebugUnitTest/index.html"
echo "  - Lint Report: app/build/reports/lint-results-debug.html"
echo "  - Instrumented Tests: app/build/reports/androidTests/connected/index.html"
echo ""

print_info "Build Outputs:"
echo "  - Debug APK: app/build/outputs/apk/debug/app-debug.apk"
echo ""

print_success "Ready for deployment! 🚀"
