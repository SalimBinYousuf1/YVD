# 🌙 Al-Qur'an - Beautiful Qur'an Reader App

A beautiful, fluffy aesthetic Android application for reading the Holy Qur'an with a smooth and sleek user experience.

![Android](https://img.shields.io/badge/Android-24+-green.svg)
![Kotlin](https://img.shields.io/badge/Kotlin-1.9.22-blue.svg)
![Jetpack Compose](https://img.shields.io/badge/Jetpack%20Compose-Latest-brightgreen.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

- **Beautiful Fluffy Design**: Soft, calming color palette with sage, dusty rose, and lavender
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Mobile-First**: Optimized for the best mobile reading experience
- **Material 3**: Latest Material Design components
- **Jetpack Compose**: Modern declarative UI
- **Bookmarking**: Save your favorite verses
- **Search**: Quickly find any Surah
- **Reading Progress**: Track where you left off
- **RTL Support**: Proper right-to-left Arabic text rendering

## 🎨 Design Philosophy

The app features a **fluffy, soft aesthetic** with:
- Soft cream and warm ivory backgrounds
- Sage green and dusty rose primary colors
- Soft lavender and warm gold accents
- Elegant Playfair Display for headings
- Beautiful Lora for body text
- Traditional Amiri Quran for Arabic script
- Generous padding and rounded corners
- Soft shadows and smooth transitions

## 🏗️ Architecture

- **MVVM Pattern**: Clean separation of concerns
- **Repository Pattern**: Abstracted data layer
- **Kotlin Flows**: Reactive data streams
- **Compose Navigation**: Type-safe navigation
- **Material 3**: Modern design system

## 📱 Screens

1. **Home Screen**: Browse all Surahs with beautiful cards
2. **Search Screen**: Find Surahs by name or translation
3. **Bookmarks Screen**: Access saved verses
4. **Settings Screen**: Customize your experience

## 🛠️ Tech Stack

- **Language**: Kotlin
- **UI Framework**: Jetpack Compose
- **Architecture**: MVVM
- **Async**: Kotlin Coroutines & Flow
- **Design**: Material 3
- **Testing**: JUnit, Espresso, Compose Testing
- **CI/CD**: GitHub Actions

## 📦 Setup & Installation

### Prerequisites

- Android Studio Hedgehog (2023.1.1) or newer
- JDK 17
- Android SDK 24+
- Gradle 8.2+

### Clone the Repository

```bash
git clone https://github.com/yourusername/quran-app.git
cd quran-app
```

### Build the Project

```bash
# Build debug APK
./gradlew assembleDebug

# Build release APK
./gradlew assembleRelease

# Build release AAB
./gradlew bundleRelease
```

### Run Tests

```bash
# Run unit tests
./gradlew test

# Run instrumented tests
./gradlew connectedAndroidTest

# Run all tests
./gradlew test connectedAndroidTest

# Run lint
./gradlew lint
```

## 🤖 GitHub Actions CI/CD

The project includes comprehensive GitHub Actions workflows that automatically:

### On Every Push & Pull Request:
- ✅ Lint checks
- ✅ Unit tests
- ✅ Instrumented tests (on macOS runner)
- ✅ Build debug APK
- ✅ Code quality checks

### On Main Branch Push:
- ✅ Build release APK
- ✅ Build release AAB (Android App Bundle)
- ✅ Upload artifacts

### Workflow Jobs:

1. **Lint Check**: Ensures code quality and style
2. **Unit Tests**: Runs all JUnit tests
3. **Instrumented Tests**: Runs UI tests on emulator
4. **Build APK**: Creates debug and release APKs
5. **Build Bundle**: Creates AAB for Play Store
6. **Code Quality**: Runs detekt and ktlint

### Artifacts Generated:
- Debug APK
- Release APK (unsigned)
- Release AAB
- Test reports (HTML & XML)
- Lint reports

## 🧪 Testing

### Unit Tests Coverage:
- ✅ Repository tests (100% coverage)
- ✅ Model tests (100% coverage)
- ✅ Search functionality
- ✅ Bookmark management
- ✅ Reading progress tracking

### Instrumented Tests Coverage:
- ✅ UI navigation tests
- ✅ Screen rendering tests
- ✅ User interaction tests
- ✅ Search functionality
- ✅ Component tests

### Run Specific Tests:

```bash
# Run repository tests
./gradlew test --tests "*QuranRepositoryTest"

# Run model tests
./gradlew test --tests "*SurahModelTest"

# Run UI tests
./gradlew connectedDebugAndroidTest --tests "*QuranAppUITest"
```

## 📂 Project Structure

```
quran-app/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/quranapp/beautiful/
│   │   │   │   ├── data/
│   │   │   │   │   ├── model/          # Data models
│   │   │   │   │   └── repository/     # Data repositories
│   │   │   │   ├── ui/
│   │   │   │   │   ├── components/     # Reusable UI components
│   │   │   │   │   ├── screens/        # App screens
│   │   │   │   │   └── theme/          # Theme & styling
│   │   │   │   ├── MainActivity.kt
│   │   │   │   └── QuranApp.kt
│   │   │   └── res/                    # Resources
│   │   ├── test/                       # Unit tests
│   │   └── androidTest/                # Instrumented tests
│   └── build.gradle
├── .github/
│   └── workflows/
│       └── android-ci.yml              # CI/CD workflow
├── build.gradle
├── settings.gradle
└── README.md
```

## 🎯 Roadmap

- [ ] Complete Qur'an data (all 114 Surahs)
- [ ] Audio recitation support
- [ ] Multiple translations
- [ ] Dark mode
- [ ] Widget support
- [ ] Share verses
- [ ] Advanced search
- [ ] Reading statistics
- [ ] Custom themes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Qur'an text from authentic sources
- Beautiful fonts from Google Fonts
- Icons from Material Icons
- Inspiration from the Islamic community

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for the Muslim community**

*"Indeed, it is We who sent down the Qur'an and indeed, We will be its guardian." (Qur'an 15:9)*
