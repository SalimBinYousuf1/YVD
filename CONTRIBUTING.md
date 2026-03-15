# Contributing to Al-Qur'an App

Thank you for your interest in contributing to the Al-Qur'an app! This document provides guidelines for contributing to this project.

## Code of Conduct

This project follows Islamic values of respect, kindness, and cooperation. Please be respectful and considerate in all interactions.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Device and Android version**
- **App version**

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing feature requests** first
- **Provide clear use cases** for the feature
- **Explain how it benefits users**
- **Consider Islamic principles** in your suggestion

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow coding standards**:
   - Use Kotlin conventions
   - Follow Material Design guidelines
   - Maintain the fluffy, soft aesthetic
   - Write meaningful comments for complex logic
   - Keep functions small and focused
4. **Write tests** for new functionality
5. **Ensure all tests pass** (`./gradlew test`)
6. **Update documentation** if needed
7. **Commit with clear messages**
8. **Push to your fork**
9. **Open a Pull Request**

### Coding Standards

#### Kotlin Style
```kotlin
// Good
fun getSurahName(number: Int): String {
    return repository.getSurah(number)?.name ?: ""
}

// Bad
fun getSurahName(number:Int):String{
    return repository.getSurah(number)?.name?:""
}
```

#### Compose Style
```kotlin
// Good
@Composable
fun SurahCard(
    surah: Surah,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    // Implementation
}

// Bad - missing spacing, unclear parameter names
@Composable
fun SurahCard(s:Surah,click:()->Unit){
    // Implementation
}
```

#### Testing Requirements
- Unit tests for all repository methods
- UI tests for critical user flows
- Minimum 80% code coverage for new code

### Design Guidelines

Maintain the beautiful, fluffy aesthetic:
- **Colors**: Use the existing soft palette (sage, dusty rose, lavender)
- **Typography**: Playfair Display for headings, Lora for body, Amiri Quran for Arabic
- **Spacing**: Generous padding (16dp, 20dp, 24dp)
- **Corners**: Rounded (16dp, 20dp, 24dp)
- **Shadows**: Soft and subtle
- **Animations**: Smooth and gentle (300-400ms duration)

### Qur'an Content Guidelines

**Critical**: When adding Qur'an content:
- ✅ Use **authentic, verified sources**
- ✅ Include **proper Arabic diacritics** (tashkeel)
- ✅ Verify **translations** from reputable scholars
- ✅ Maintain **verse numbering accuracy**
- ✅ Respect **Islamic scholarly consensus**

### Git Commit Messages

Follow this format:
```
type(scope): brief description

Detailed explanation if needed

Fixes #123
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(search): add translation search capability

Users can now search by English translation text in addition
to Surah names.

Closes #45
```

```
fix(bookmarks): prevent duplicate bookmarks

Added check to prevent adding the same ayah twice to bookmarks.

Fixes #67
```

### Testing Your Changes

Before submitting:

```bash
# Run lint
./gradlew lintDebug

# Run unit tests
./gradlew testDebugUnitTest

# Run instrumented tests (requires emulator/device)
./gradlew connectedDebugAndroidTest

# Build the app
./gradlew assembleDebug
```

### Documentation

Update documentation for:
- New features
- API changes
- UI changes
- Configuration changes

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. You'll be added to contributors! 🎉

## Questions?

Open an issue with the `question` label or reach out to maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**JazakAllahu Khairan** (May Allah reward you with goodness) for contributing! 🌙
