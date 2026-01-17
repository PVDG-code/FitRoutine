# FitRoutine - Expo Version

Your personal calisthenics workout companion, now powered by Expo for easy development and testing!

## Quick Start Guide

### Step 1: Install Node.js (if not already installed)

1. Download Node.js from: https://nodejs.org/
2. Install the LTS version (Long Term Support)
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install Dependencies

Open a terminal/command prompt and navigate to this folder:

```bash
cd C:\Users\PetervandeGiessen\FitRoutineExpo
```

Then install all required packages:

```bash
npm install
```

This will take a few minutes. It installs:
- Expo SDK
- React Native
- React Navigation
- AsyncStorage
- All other dependencies

### Step 3: Install Expo Go on Your iPhone

1. Open the **App Store** on your iPhone
2. Search for **"Expo Go"**
3. Install the Expo Go app (it's free)
4. Keep the app handy - you'll use it to run FitRoutine

### Step 4: Start the Development Server

In your terminal (still in the FitRoutineExpo folder), run:

```bash
npm start
```

Or:

```bash
npx expo start
```

This will:
- Start the Metro bundler
- Open a browser window with the Expo DevTools
- Show a QR code in the terminal

**Keep this terminal window open!** This is your development server.

### Step 5: Run on Your iPhone

1. **Make sure your iPhone and computer are on the same WiFi network**
2. Open the **Expo Go** app on your iPhone
3. Tap **"Scan QR code"**
4. Point your camera at the QR code in the terminal or browser
5. Wait for the app to load (first time takes 30-60 seconds)
6. FitRoutine will open on your iPhone!

## Troubleshooting

### "Unable to resolve module"
```bash
# Clear cache and restart
npm start -- --clear
```

### "Network response timed out"
- Make sure iPhone and computer are on the same WiFi
- Disable VPN if you're using one
- Try the "Tunnel" connection mode in Expo DevTools

### "Something went wrong"
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm start
```

### QR Code won't scan
- In the Expo DevTools browser window, try switching from "LAN" to "Tunnel"
- Make sure you're using the Expo Go app (not your phone's camera app)

### App crashes on startup
- Check the terminal for error messages
- Make sure all dependencies installed correctly
- Try clearing cache: `npm start -- --clear`

## Using the App

### First Time Setup

When you first open the app:

1. The app will show a loading screen
2. Pull down to refresh to generate your first workout
3. You'll see 3 exercises for today
4. Tap any exercise to see detailed instructions

### Main Features

**Home Screen:**
- View today's 3 exercises
- See your current level, streak, and workout time
- Tap exercises to view details
- Check off exercises as you complete them
- Pull down to refresh

**Exercise Details:**
- Detailed step-by-step instructions
- Equipment needed
- Muscle groups targeted
- Pro tips for proper form
- Mark complete or replace exercise

**Stats Screen:**
- Current and longest streak
- Weekly/monthly workout counts
- Total workouts completed
- Recent workout history
- Motivational messages

**Settings Screen:**
- Adjust difficulty level (1-10)
- Change workout duration (5-30 minutes)
- Set rest days
- Reset all data if needed

### Progression System

- **Start at Level 1** (Beginner)
- Complete workouts to build your streak
- After **5 consecutive successful workouts**, automatically level up
- Exercises get progressively harder
- Reps increase with each level

### Tips

1. **Complete workouts daily** - Build that streak!
2. **Set rest days** - Recovery is important
3. **Replace exercises** - Long press any exercise you can't do
4. **Check details** - Tap exercises for full instructions
5. **Track progress** - Visit Stats screen regularly

## Development Tips

### Making Changes

The app supports **hot reloading**! When you edit code:

1. Save the file
2. The app automatically updates on your phone
3. Your data persists (workouts, streaks, etc.)

### Useful Commands

```bash
# Start development server
npm start

# Start with cache cleared
npm start -- --clear

# View logs
# Check the terminal where you ran npm start

# Stop the server
# Press Ctrl+C in the terminal
```

### Project Structure

```
FitRoutineExpo/
├── App.js                      # Main app entry point
├── package.json               # Dependencies
├── app.json                   # Expo configuration
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js       # Daily workout view
│   │   ├── ExerciseDetailScreen.js
│   │   ├── StatsScreen.js
│   │   └── SettingsScreen.js
│   ├── data/
│   │   └── exercises.js        # Exercise database
│   └── utils/
│       ├── storage.js          # Data persistence
│       └── workoutGenerator.js # Workout logic
└── assets/                    # Icons and images
```

### Editing Exercise Database

Want to add more exercises? Edit [src/data/exercises.js](src/data/exercises.js):

```javascript
new_exercise: {
  id: 'new_exercise',
  name: 'New Exercise Name',
  category: 'push', // push, pull, legs, or core
  difficulty: 'beginner', // beginner, intermediate, advanced
  equipment: ['mat', 'band'],
  muscleGroups: ['chest', 'arms'],
  description: 'Brief description',
  instructions: [
    'Step 1',
    'Step 2',
    // ...
  ],
  defaultReps: 10
}
```

Save the file and the app will update automatically!

## What's Included

### 15+ Exercises

**Push Exercises:**
- Wall Push-ups
- Incline Push-ups
- Knee Push-ups
- Regular Push-ups
- Band Chest Press
- Band Shoulder Press

**Pull Exercises:**
- Band Rows
- Single-Arm Band Rows
- Band Bicep Curls

**Leg Exercises:**
- Bodyweight Squats
- Jump Squats
- Forward Lunges
- Reverse Lunges
- Glute Bridges
- Band Leg Extensions

**Core Exercises:**
- Dead Bug
- Forearm Plank
- Plank Shoulder Taps
- Bicycle Crunches
- Mountain Climbers

All exercises designed for:
- Mat
- Resistance band
- No other equipment needed

## Building for Production (Future)

When you're ready to publish to the App Store:

1. **Sign up for Expo account** (free): https://expo.dev/
2. **Build the app**:
   ```bash
   npx expo build:ios
   ```
3. **Submit to App Store** (requires Apple Developer account - $99/year)

Or use **EAS Build** (Expo's cloud build service):
```bash
npm install -g eas-cli
eas build --platform ios
```

## Need Help?

- **Expo Documentation**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/
- **React Native**: https://reactnative.dev/

## Enjoy Your Workouts!

Stay consistent, build your streak, and get stronger every day! 💪

---

**App Version:** 1.0.0
**Last Updated:** 2026-01-17
