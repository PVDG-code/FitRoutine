# 🏃‍♂️ START HERE - FitRoutine Setup

Welcome! Your fitness app is ready to go. Follow this simple guide to get it running on your iPhone.

## ⚡ Quick Setup (5 Minutes)

### What You Need

- ✅ Windows PC (you have this!)
- ✅ iPhone with iOS (you have this!)
- ✅ WiFi connection (same network for both devices)
- ⏳ 5 minutes of your time

### Three Simple Steps

#### Step 1: Install Node.js (One-Time Setup)

**Do you have Node.js?** Check by opening Command Prompt and typing:
```bash
node --version
```

- ✅ **See a version number?** Skip to Step 2!
- ❌ **"Not recognized" error?** Install Node.js:
  1. Go to: https://nodejs.org/
  2. Click the big green "LTS" button (left side)
  3. Run the installer
  4. Click "Next" through everything
  5. Restart Command Prompt

#### Step 2: Install Expo Go (One-Time Setup)

On your iPhone:
1. Open **App Store**
2. Search for **"Expo Go"**
3. Install it (purple icon, free app)
4. Keep it - you'll use this to run FitRoutine

#### Step 3: Start Your App

**Open Command Prompt:**
- Press `Win + R`
- Type: `cmd`
- Press Enter

**Run these commands** (copy and paste each line, press Enter after each):

```bash
cd C:\Users\PetervandeGiessen\FitRoutineExpo
```

```bash
npm install
```
*(This takes 2-3 minutes the first time - be patient!)*

```bash
npm start
```

**A QR code appears!**

**On your iPhone:**
1. Open Expo Go app
2. Tap "Scan QR code"
3. Point camera at QR code in command prompt
4. Wait 30 seconds
5. **FitRoutine opens!** 🎉

## 🎯 Your First Workout

1. **Pull down** on the screen to refresh
2. Three exercises appear!
3. **Tap an exercise** to see how to do it
4. Do the exercise, then **tap the checkbox** ✓
5. Repeat for all 3 exercises
6. **Workout complete!** You've started your streak! 🔥

## 📱 How It Works

**On Your Computer:**
- Command prompt runs a development server
- Keep it open (minimize is fine)
- Shows any errors or logs

**On Your iPhone:**
- Expo Go connects to your computer
- Runs FitRoutine app
- All your data saves to your phone

**No Internet Needed** (after initial setup)
- Just need same WiFi to connect
- Or use "tunnel mode" for anywhere access

## 📚 Documentation Guide

I've created several guides for you:

| File | When to Use |
|------|-------------|
| **START_HERE.md** | You are here! Start here. |
| **WINDOWS_QUICK_START.md** | Detailed Windows-specific instructions |
| **CHEAT_SHEET.md** | Quick command reference |
| **WHAT_TO_EXPECT.md** | Visual guide of what you'll see |
| **README.md** | Complete documentation |

## 🆘 Troubleshooting

### QR Code Won't Scan
```bash
# In command prompt, press 't' then Enter
# This switches to tunnel mode
# Scan the new QR code
```

### "npm is not recognized"
- Node.js not installed → Go to https://nodejs.org/
- After installing, restart command prompt

### App Crashes on Startup
```bash
# Clear cache and restart
npm start -- --clear
```

### Can't Find Project Folder
```bash
# Check you're in the right place
cd C:\Users\PetervandeGiessen\FitRoutineExpo
dir
# You should see: App.js, package.json, src folder
```

## 🎮 Daily Use

**Next time you want to use the app:**

1. Open Command Prompt
2. Run:
   ```bash
   cd C:\Users\PetervandeGiessen\FitRoutineExpo
   npm start
   ```
3. Open Expo Go on iPhone
4. Scan QR code
5. Work out!

**That's it!** No need to reinstall anything.

## ⚙️ App Features

Your app includes:

✅ **Daily Workouts** - 3 exercises every day
✅ **15+ Exercises** - All beginner-friendly calisthenics
✅ **Auto Progression** - Gets harder as you improve
✅ **Streak Tracking** - Build consistency
✅ **Statistics** - See your progress
✅ **Customization** - Duration, rest days, difficulty
✅ **Exercise Swap** - Don't like one? Replace it
✅ **Detailed Instructions** - Never wonder how to do an exercise

## 🎯 Tips for Success

1. **Be Consistent** - Do your workout every day
2. **Set Rest Days** - Recovery is important (Settings screen)
3. **Check Instructions** - Tap exercises for proper form
4. **Track Progress** - Watch your streak grow
5. **Level Up** - Complete 5 workouts in a row to progress

## ❓ Need Help?

**Read these in order if you get stuck:**
1. **CHEAT_SHEET.md** - Quick fixes for common issues
2. **WHAT_TO_EXPECT.md** - Visual guide of what should happen
3. **WINDOWS_QUICK_START.md** - Detailed Windows instructions

**Still stuck?** Check the command prompt for error messages - they usually tell you exactly what's wrong!

## 🚀 Ready to Start?

Open Command Prompt now and run:

```bash
cd C:\Users\PetervandeGiessen\FitRoutineExpo
npm install
npm start
```

Then grab your iPhone, open Expo Go, scan the QR code, and start your first workout!

**Let's get fit!** 💪

---

*Made with ❤️ for your daily fitness routine*
*Version 1.0.0 - January 2026*
