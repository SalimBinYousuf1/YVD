# Testing Documentation

This document provides comprehensive information about testing the Al-Qur'an Android application.

## 📋 Table of Contents

- [Overview](#overview)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Writing Tests](#writing-tests)
- [CI/CD Testing](#cicd-testing)

## Overview

The app includes three types of tests:
1. **Unit Tests** - Fast, isolated tests for business logic
2. **Instrumented Tests** - UI and integration tests on real devices/emulators
3. **Lint Tests** - Code quality and style checks

### Test Technology Stack

- **JUnit 4** - Unit testing framework
- **Mockito** - Mocking framework
- **Kotlin Coroutines Test** - Testing coroutines
- **Compose Test** - UI testing for Jetpack Compose
- **Espresso** - Android UI testing

## Test Types

### 1. Unit Tests

Located in: `app/src/test/java/`

#### QuranRepositoryTest
Tests all repository operations:
- ✅ Fetching all Surahs
- ✅ Getting individual Surah by number
- ✅ Searching Surahs
- ✅ Bookmark management (add, remove, check)
- ✅ Reading progress tracking
- ✅ Data integrity validation

**Key Test Cases:**
```kotlin
@Test
fun `getAllSurahs returns non-empty list`()

@Test
fun `getSurah returns correct surah by number`()

@Test
fun `searchSurahs finds surah by English name`()

@Test
fun `addBookmark adds bookmark successfully`()

@Test
fun `updateReadingProgress updates progress`()
```

#### SurahModelTest
Tests data models:
- ✅ Surah creation and properties
- ✅ Ayah creation and defaults
- ✅ Bookmark creation with timestamps
- ✅ ReadingProgress calculations

### 2. Instrumented Tests

Located in: `app/src/androidTest/java/`

#### QuranAppUITest
Tests complete user interface:
- ✅ App launch and initial state
- ✅ Navigation between screens
- ✅ UI component rendering
- ✅ User interactions
- ✅ Search functionality
- ✅ Data display accuracy

**Key Test Cases:**
```kotlin
@Test
fun appLaunches_showsHomeScreen()

@Test
fun navigationBar_switchesToSearchScreen()

@Test
fun searchScreen_acceptsTextInput()

@Test
fun surahCard_displaysCorrectInformation()
```

### 3. Lint Tests

Automated code quality checks:
- Code style compliance
- Potential bugs
- Performance issues
- Security vulnerabilities
- Accessibility issues

## Running Tests

### Quick Start

Run all tests with the comprehensive test script:
```bash
./run-tests.sh
```

This script will:
1. Clean the project
2. Run lint checks
3. Run unit tests
4. Generate coverage reports
5. Build debug APK
6. Run instrumented tests (if device/emulator available)

### Individual Test Commands

#### Run All Unit Tests
```bash
./gradlew test
```

#### Run Specific Test Class
```bash
./gradlew test --tests "*QuranRepositoryTest"
./gradlew test --tests "*SurahModelTest"
```

#### Run Specific Test Method
```bash
./gradlew test --tests "*QuranRepositoryTest.getAllSurahs*"
```

#### Run All Instrumented Tests
```bash
./gradlew connectedAndroidTest
```

**Note:** Requires a running emulator or connected device.

#### Run Specific Instrumented Test
```bash
./gradlew connectedAndroidTest --tests "*QuranAppUITest"
```

#### Run Lint Checks
```bash
./gradlew lint
```

### Using Android Studio

1. **Run All Tests:**
   - Right-click on `test` or `androidTest` folder
   - Select "Run Tests in '...'"

2. **Run Single Test:**
   - Open test file
   - Click green arrow next to test method
   - Select "Run 'testName'"

3. **Run with Coverage:**
   - Right-click test
   - Select "Run '...' with Coverage"

## Test Coverage

### Current Coverage

| Module | Coverage |
|--------|----------|
| Repository | 100% |
| Models | 100% |
| UI Components | ~80% |
| Screens | ~75% |

### Generate Coverage Report

```bash
./gradlew test jacocoTestReport
```

View report: `app/build/reports/jacoco/jacocoTestReport/html/index.html`

### Coverage Goals

- **Critical paths:** 100%
- **Business logic:** 90%+
- **UI components:** 80%+
- **Overall:** 85%+

## Writing Tests

### Unit Test Template

```kotlin
package com.quranapp.beautiful.feature

import org.junit.Before
import org.junit.Test
import org.junit.Assert.*

class MyFeatureTest {
    
    private lateinit var feature: MyFeature
    
    @Before
    fun setup() {
        feature = MyFeature()
    }
    
    @Test
    fun `descriptive test name in backticks`() {
        // Arrange
        val input = "test"
        
        // Act
        val result = feature.process(input)
        
        // Assert
        assertEquals("expected", result)
    }
}
```

### Compose UI Test Template

```kotlin
package com.quranapp.beautiful.ui

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class MyComponentTest {
    
    @get:Rule
    val composeTestRule = createComposeRule()
    
    @Test
    fun componentDisplaysCorrectly() {
        composeTestRule.setContent {
            MyComponent(data = testData)
        }
        
        composeTestRule
            .onNodeWithText("Expected Text")
            .assertExists()
    }
}
```

### Testing Best Practices

1. **Use descriptive names:** `fun user can search for surahs()`
2. **Follow AAA pattern:** Arrange, Act, Assert
3. **Test one thing:** Each test should verify one behavior
4. **Use test data builders:** Create reusable test data
5. **Mock external dependencies:** Isolate unit under test
6. **Test edge cases:** Empty lists, null values, errors
7. **Keep tests fast:** Unit tests should run in milliseconds

### Coroutine Testing

```kotlin
@Test
fun `async operation completes successfully`() = runTest {
    // Test code with coroutines
    val result = repository.fetchData()
    assertEquals(expected, result)
}
```

### Flow Testing

```kotlin
@Test
fun `flow emits expected values`() = runTest {
    val values = repository.dataFlow.first()
    assertEquals(expected, values)
}
```

## CI/CD Testing

### GitHub Actions Workflow

All tests run automatically on:
- Every push to `main` and `develop` branches
- Every pull request
- Manual workflow dispatch

### Workflow Jobs

1. **Lint Check** (ubuntu-latest)
   - Runs lint analysis
   - Uploads lint reports

2. **Unit Tests** (ubuntu-latest)
   - Runs all unit tests
   - Generates test reports
   - Uploads artifacts

3. **Instrumented Tests** (macos-latest)
   - Runs on Android emulator
   - Tests full user flows
   - Uploads test reports

4. **Build APK** (ubuntu-latest)
   - Builds debug and release APKs
   - Uploads APK artifacts

### Viewing CI Test Results

1. Go to **Actions** tab in GitHub
2. Select workflow run
3. View job results
4. Download artifacts:
   - Test reports (HTML)
   - APK files
   - Lint reports

### CI Test Failures

If CI tests fail:
1. Check the failed job logs
2. Reproduce locally using same commands
3. Fix the issue
4. Push changes
5. CI will re-run automatically

## Debugging Tests

### Common Issues

**Unit test fails locally but passes in CI:**
- Check for timing issues
- Verify test isolation
- Review test dependencies

**Instrumented test fails on emulator:**
- Ensure emulator API level matches
- Check for animation interference
- Verify screen size compatibility

**Flaky tests:**
- Add explicit waits: `composeTestRule.waitForIdle()`
- Use `eventually` for async operations
- Disable animations in test setup

### Debug Commands

```bash
# Run tests with stack traces
./gradlew test --stacktrace

# Run with debug logging
./gradlew test --debug

# Run single test with logs
./gradlew test --tests "*TestName" --info
```

## Test Reports

### Generated Reports

After running tests, view HTML reports:

**Unit Test Report:**
```
app/build/reports/tests/testDebugUnitTest/index.html
```

**Instrumented Test Report:**
```
app/build/reports/androidTests/connected/index.html
```

**Lint Report:**
```
app/build/reports/lint-results-debug.html
```

### Report Contents

- ✅ Test pass/fail status
- ⏱️ Execution time
- 📊 Coverage statistics
- 📝 Detailed failure messages
- 📍 Stack traces for failures

## Continuous Improvement

### Adding New Tests

When adding features:
1. Write tests first (TDD approach)
2. Ensure >80% coverage
3. Add both unit and UI tests
4. Update this documentation

### Test Maintenance

- Review and update tests with code changes
- Remove obsolete tests
- Refactor duplicate test code
- Keep test data up to date

---

**Happy Testing! 🧪**

*"Indeed, Allah loves those who are thoroughly good at what they do." - Hadith*
