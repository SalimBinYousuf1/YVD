# ⚡ QUICK START - Auto-Build APK via GitHub Actions

## 🎯 Get Your APK in 3 Steps (5 Minutes Total)

### Step 1: Push to GitHub (2 minutes)

```bash
cd quran-app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/quran-app.git
git branch -M main
git push -u origin main
```

### Step 2: Wait for Auto-Build (2-3 minutes)

✅ GitHub Actions **automatically starts building** when you push!

Watch progress:
- Go to your repo on GitHub
- Click "Actions" tab
- See "Quick Build APK" running

### Step 3: Download APK (30 seconds)

1. Click on the completed workflow (green checkmark ✅)
2. Scroll to "Artifacts" section
3. Download **"QuranApp-Debug-APK"**
4. Extract ZIP and install `app-debug.apk`

**DONE! 🎉**

---

## 📱 Two Auto-Build Workflows Included

### 🚀 Quick Build (FAST - 2 mins)
- Runs on **every push** to any branch
- Builds debug APK
- Perfect for testing

### 🔧 Full CI/CD (COMPLETE - 5 mins)
- Runs on push to **main/develop/master**
- Runs all tests
- Builds debug, release APK + AAB
- Production-ready

---

## 💡 Pro Tips

### Manual Build Trigger
Don't want to push? Trigger manually:
1. Actions tab → Select workflow
2. "Run workflow" button → Run!

### Auto-Build on Every Change
```bash
# Make changes
nano app/src/main/...

# Push = Auto-build!
git add .
git commit -m "Updated UI"
git push
```

→ New APK ready in 2-3 minutes!

### Install APK on Phone
```bash
# Transfer downloaded APK to phone
# Settings → Security → Install Unknown Apps → Enable
# Tap APK → Install
```

---

## ✅ Success Checklist

After pushing:
- [ ] GitHub Actions runs automatically
- [ ] Workflow completes (green checkmark)
- [ ] APK appears in Artifacts
- [ ] Download and install works

---

**See GITHUB-ACTIONS-SETUP.md for detailed guide**

**Happy Building! 🌙**
