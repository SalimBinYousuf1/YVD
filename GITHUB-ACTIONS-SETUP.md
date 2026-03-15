# 🚀 GitHub Actions Auto-Build Setup Guide

## Quick Setup (5 Minutes)

### Step 1: Push to GitHub

```bash
# Navigate to your project
cd quran-app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Beautiful Quran App with Auto-Build"

# Add your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/quran-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: GitHub Actions Auto-Triggers

✅ **Automatically runs on push!**

The workflow will:
1. ✅ Checkout your code
2. ✅ Set up JDK 17
3. ✅ Run lint checks
4. ✅ Run unit tests (36 tests)
5. ✅ **Build Debug APK automatically**
6. ✅ Build Release APK
7. ✅ Upload APKs as artifacts

### Step 3: Download Your APK

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Click on the latest workflow run
4. Scroll down to **"Artifacts"**
5. Download **"QuranApp-Debug-APK"** or **"app-debug"**
6. Extract and install on your Android device!

---

## 📱 Two Workflows Included

### 1. Quick Build (Recommended for Fast Builds)
**File:** `.github/workflows/quick-build.yml`

**Triggers:** Every push to any branch

**What it does:**
- ✅ Builds debug APK
- ✅ Uploads artifact
- ⚡ Fast (2-3 minutes)

### 2. Full CI/CD Pipeline
**File:** `.github/workflows/android-ci.yml`

**Triggers:** Push to main/develop/master branches

**What it does:**
- ✅ Lint checks
- ✅ Unit tests
- ✅ Builds debug & release APK
- ✅ Builds AAB for Play Store
- ✅ Optional instrumented tests
- ⏱️ Complete (5-10 minutes)

---

## 🎯 Which Workflow Runs When?

### Quick Build Runs:
- ✅ Every push to **any branch**
- ✅ Pull requests
- ✅ Manual trigger

### Full CI/CD Runs:
- ✅ Push to **main**, **develop**, or **master**
- ✅ Pull requests to these branches
- ✅ Manual trigger

**Both can run simultaneously!**

---

## 📥 How to Get Your APK

### Option 1: From GitHub Actions (Recommended)

1. **Push your code** to GitHub
2. **Wait 2-3 minutes** for build to complete
3. **Go to Actions tab** in your repo
4. **Click on the latest successful run** (green checkmark)
5. **Scroll to "Artifacts" section**
6. **Download** "QuranApp-Debug-APK"
7. **Extract the ZIP** and install `app-debug.apk`

### Option 2: Build Locally

```bash
# Build debug APK locally
./gradlew assembleDebug

# APK location
app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔧 Troubleshooting

### Build Fails on GitHub Actions

**Check:**
1. ✅ All files are committed and pushed
2. ✅ No syntax errors in code
3. ✅ Check workflow logs in Actions tab

### Can't Find APK Artifact

**Solution:**
1. Wait for workflow to complete (green checkmark)
2. Refresh the page
3. Scroll down to "Artifacts" section
4. Look for "QuranApp-Debug-APK" or "app-debug"

### Workflow Doesn't Trigger

**Check:**
1. ✅ You pushed to a branch (not just committed)
2. ✅ GitHub Actions is enabled in repo settings
3. ✅ Workflow files are in `.github/workflows/` directory

---

## ⚡ Manual Trigger

You can manually trigger builds without pushing:

1. Go to **Actions** tab
2. Select **"Quick Build APK"** or **"Android CI/CD"**
3. Click **"Run workflow"**
4. Select branch
5. Click green **"Run workflow"** button

---

## 📊 Workflow Status

### Quick Build Status
See: `https://github.com/YOUR-USERNAME/quran-app/actions/workflows/quick-build.yml`

### Full CI/CD Status
See: `https://github.com/YOUR-USERNAME/quran-app/actions/workflows/android-ci.yml`

---

## 🎉 Success Indicators

✅ **Green checkmark** = Build successful
❌ **Red X** = Build failed (check logs)
🟡 **Yellow dot** = Build in progress

---

## 📱 Installing APK on Android

### Method 1: Direct Install
1. Download APK from GitHub Actions
2. Transfer to Android device
3. Enable "Install from Unknown Sources"
4. Tap APK to install

### Method 2: ADB Install
```bash
# Connect device via USB
adb devices

# Install APK
adb install app-debug.apk
```

---

## 🔄 Automatic Builds on Every Push

**Yes!** Every time you push code:

```bash
git add .
git commit -m "Updated feature X"
git push
```

→ GitHub Actions automatically builds a new APK!
→ Download from Actions tab after 2-3 minutes

---

## 📦 What Gets Built

### Debug APK
- **Name:** `app-debug.apk`
- **Use:** Testing and development
- **Signed:** Yes (debug key)
- **Installable:** Yes

### Release APK
- **Name:** `app-release-unsigned.apk`
- **Use:** Production (needs signing)
- **Signed:** No
- **Installable:** After signing

### Release Bundle (AAB)
- **Name:** `app-release.aab`
- **Use:** Google Play Store
- **When:** Only on main/master branch

---

## ✨ That's It!

Your app auto-builds on **every push**!

**Next steps:**
1. Push to GitHub
2. Wait 2-3 minutes
3. Download APK from Actions
4. Install and enjoy! 🌙

---

**Happy Building! 🚀**
