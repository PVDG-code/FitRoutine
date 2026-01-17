# FitRoutine - Windows Quick Start

## For Windows Users - Get Your App Running in 5 Minutes!

### Prerequisites Check

Do you have Node.js installed?

```bash
node --version
```

If you see a version number (like v18.x.x or v20.x.x), you're good!

If not, download and install from: **https://nodejs.org/** (get the LTS version)

### Step-by-Step Instructions

#### 1. Open Command Prompt or PowerShell

Press `Win + R`, type `cmd`, press Enter

#### 2. Navigate to the Project

```bash
cd C:\Users\PetervandeGiessen\FitRoutineExpo
```

#### 3. Install Dependencies

```bash
npm install
```

Wait 2-3 minutes for everything to install. You'll see lots of text scroll by - this is normal!

#### 4. Install Expo Go on Your iPhone

While npm is installing:
1. Open **App Store** on your iPhone
2. Search for **"Expo Go"**
3. Install it (it's free)

#### 5. Start the App

```bash
npm start
```

You'll see:
- Text in the command prompt
- A QR code
- Possibly a browser window opening

**Important:** Keep this command prompt window open!

#### 6. Connect Your iPhone

**Option A: Same WiFi (Easiest)**
1. Make sure your iPhone and PC are on the same WiFi network
2. Open Expo Go on your iPhone
3. Tap "Scan QR code"
4. Point camera at the QR code in your command prompt
5. Wait 30-60 seconds for first load
6. FitRoutine opens on your iPhone!

**Option B: Tunnel (If WiFi doesn't work)**
1. In the command prompt, press `t` (for tunnel mode)
2. Wait for new QR code
3. Scan with Expo Go
4. Wait for app to load

### Common Issues & Fixes

#### Issue: "npm is not recognized"
**Fix:** Node.js not installed or not in PATH
- Install Node.js from https://nodejs.org/
- Restart command prompt after installing
- Try again

#### Issue: QR code won't scan
**Fix 1:** Make sure you're using the Expo Go app, not your iPhone camera
**Fix 2:** In command prompt, press `t` to switch to tunnel mode
**Fix 3:** Make sure PC and iPhone are on same WiFi

#### Issue: "Unable to resolve module"
**Fix:**
```bash
npm start -- --clear
```

#### Issue: "Metro bundler crashed"
**Fix:**
```bash
# Close the command prompt (Ctrl+C)
# Delete node_modules folder
# Reinstall
npm install
npm start
```

#### Issue: App loads but crashes immediately
**Fix:** Check command prompt for error messages. Usually one of:
- Missing dependency: Run `npm install` again
- Syntax error: File got corrupted during copy
- Port conflict: Close other dev servers

### What You Should See

**In Command Prompt:**
```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (iOS) or Android
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

**On Your iPhone:**
- Expo Go scans the QR code
- "Downloading JavaScript bundle" appears
- App loads
- You see "Today's Workout" screen
- Pull down to generate first workout
- 3 exercises appear!

### Using the App

1. **First time:** Pull down to refresh to generate your first workout
2. **Complete workout:** Tap the checkboxes as you finish each exercise
3. **View details:** Tap any exercise for instructions
4. **Settings:** Tap "Settings" to customize duration and rest days
5. **Track progress:** Tap "View Stats" to see your streak

### Making Changes to the Code

1. Open any file in a text editor (Notepad++, VS Code, etc.)
2. Make your changes
3. Save the file
4. The app automatically updates on your iPhone!

### Stopping the Server

In the command prompt window, press `Ctrl + C`

### Starting Again Later

```bash
cd C:\Users\PetervandeGiessen\FitRoutineExpo
npm start
```

That's it! No need to reinstall dependencies.

## Next Steps

Once you have the app running:

1. ✅ Complete your first workout
2. ✅ Explore the Stats and Settings screens
3. ✅ Try replacing an exercise (long press on home screen)
4. ✅ Customize your workout duration in Settings
5. ✅ Set your rest days
6. ✅ Build your streak!

## Pro Tips

- **Leave Expo Go installed** - You'll use it every time you run the app
- **Same WiFi is key** - Make sure both devices are on the same network
- **Don't close the command prompt** - It's your development server
- **Shake your phone** - Opens Expo developer menu for debugging
- **All data is local** - Your workouts and streaks save on your iPhone

## Need Help?

Check the full README.md for detailed documentation.

**Having issues?** The error messages in the command prompt usually tell you exactly what's wrong.

## You're All Set!

Your fitness app is ready to use. Open Expo Go, scan the QR code, and start your first workout!

Stay consistent and build that streak! 💪
