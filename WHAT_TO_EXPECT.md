# What to Expect - Visual Guide

## Step-by-Step Visual Walkthrough

### 1. Opening Command Prompt

**Windows 11:**
- Press `Win + R`
- Type: `cmd`
- Press Enter
- Black/blue window opens

**What you'll see:**
```
Microsoft Windows [Version 10.0.xxxxx]
(c) Microsoft Corporation. All rights reserved.

C:\Users\PetervandeGiessen>
```

### 2. Navigating to Project

**Type this:**
```bash
cd FitRoutineExpo
```

**You'll see:**
```
C:\Users\PetervandeGiessen\FitRoutineExpo>
```

The path changed! You're now in the right folder.

### 3. Installing Dependencies

**Type this:**
```bash
npm install
```

**What happens:**
- Lots of text scrolls by (this is normal!)
- You'll see package names flying past
- Progress indicators
- Takes 2-3 minutes

**You'll see things like:**
```
npm WARN deprecated ...
added 847 packages in 2m
```

**Wait for:**
```
C:\Users\PetervandeGiessen\FitRoutineExpo>
```

When you see the prompt again (with `>`), it's done!

### 4. Starting the Server

**Type this:**
```bash
npm start
```

**What happens:**
- Metro bundler starts
- A browser window might open
- You'll see a QR code appear in the terminal

**In the terminal you'll see:**
```
› Metro waiting on exp://192.168.1.xxx:8081
› Scan the QR code above with Expo Go (Android) or Expo Go (iOS)

▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀ █▀▀██ ▄ █ ▄▄▄▄▄ █
█ █   █ █▀▀▀ ▀█▄█▀█ █   █ █
█ █▄▄▄█ █ ▄▀ ▄ █ ▀█ █▄▄▄█ █
[QR CODE HERE]

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

**Keep this window open!** Minimizing is fine, but don't close it.

### 5. On Your iPhone

**Open Expo Go:**
- Find the Expo Go app (purple icon)
- Tap to open
- You'll see: "Projects" screen

**Scan QR Code:**
- Tap "Scan QR code" button
- Point camera at QR code in command prompt
- A box appears around the QR code when detected
- Tap it

**First Load (30-60 seconds):**
```
Opening project...
↓ Downloading JavaScript bundle 100%
Building...
```

### 6. App Opens!

**What you'll see on iPhone:**

**First Screen - "Today's Workout"**
```
┌─────────────────────────────┐
│  ← FitRoutine              │
├─────────────────────────────┤
│  Today's Workout            │
│  Complete each exercise     │
│                             │
│  ┌───┐ ┌───┐ ┌───┐         │
│  │ 1 │ │ 0 │ │10 │         │
│  │Lvl│ │Day│ │Min│         │
│  └───┘ └───┘ └───┘         │
│                             │
│  0 / 0 exercises completed  │
│  [Progress Bar]             │
│                             │
│  Loading your workout...    │
│                             │
│  [Pull down to refresh]     │
│                             │
│  [View Stats] [Settings]    │
└─────────────────────────────┘
```

**Pull down on the screen!**

**After Refresh - Your Workout Appears:**
```
┌─────────────────────────────┐
│  ← FitRoutine              │
├─────────────────────────────┤
│  Today's Workout            │
│  Complete each exercise     │
│                             │
│  ┌───┐ ┌───┐ ┌───┐         │
│  │ 1 │ │ 0 │ │10 │         │
│  │Lvl│ │Day│ │Min│         │
│  └───┘ └───┘ └───┘         │
│                             │
│  0 / 3 exercises completed  │
│  [───────────────────]      │
│                             │
│  ┌─────────────────────┐   │
│  │ Wall Push-ups     ○ │   │
│  │ 10 reps             │   │
│  │ PUSH • chest, arms  │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Bodyweight Squats ○ │   │
│  │ 12 reps             │   │
│  │ LEGS • quads, glutes│   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Forearm Plank     ○ │   │
│  │ 30 seconds          │   │
│  │ CORE • core, abs    │   │
│  └─────────────────────┘   │
│                             │
│  [View Stats] [Settings]    │
└─────────────────────────────┘
```

### 7. Tapping an Exercise

**Tap "Wall Push-ups":**

**Exercise Detail Screen:**
```
┌─────────────────────────────┐
│  ← Exercise Details        │
├─────────────────────────────┤
│  Wall Push-ups              │
│  [PUSH] [COMPLETED]         │
│                             │
│  Target: 10 reps            │
│                             │
│  Equipment Needed           │
│  [mat]                      │
│                             │
│  Muscle Groups              │
│  [chest] [arms] [shoulders] │
│                             │
│  Description                │
│  Stand arm's length from... │
│                             │
│  Exercise Demo              │
│  ┌───────────────────────┐ │
│  │   Wall Push-ups       │ │
│  │   [Demo placeholder]  │ │
│  └───────────────────────┘ │
│                             │
│  How to Perform             │
│  ① Stand about 2 feet from │
│     a wall                  │
│  ② Place hands on wall...  │
│  ③ Keep body straight...   │
│                             │
│  Pro Tips                   │
│  • Focus on proper form...  │
│                             │
├─────────────────────────────┤
│ [Replace] [Mark Complete]   │
└─────────────────────────────┘
```

### 8. Completing Exercises

**Tap "Mark Complete":**
- Returns to home screen
- Exercise shows green background
- Checkbox is checked ✓
- Progress bar fills up

**After all 3 exercises:**
```
┌─────────────────────────────┐
│  3 / 3 exercises completed  │
│  [████████████████████]     │
│                             │
│  ┌─────────────────────┐   │
│  │ ✓ Wall Push-ups   ✓ │   │  ← Green!
│  │ 10 reps             │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ ✓ Bodyweight Squats✓│   │  ← Green!
│  │ 12 reps             │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ ✓ Forearm Plank    ✓│   │  ← Green!
│  │ 30 seconds          │   │
│  └─────────────────────┘   │
│                             │
│  ╔═══════════════════════╗ │
│  ║ Workout Complete!     ║ │  ← Celebration!
│  ║ Great job! Keep up... ║ │
│  ╚═══════════════════════╝ │
└─────────────────────────────┘
```

**Popup appears:**
```
"Workout Complete!"
"Great job! Keep up the consistency to level up."
[Thanks!]
```

### 9. Stats Screen

**Tap "View Stats":**
```
┌─────────────────────────────┐
│  ← Statistics              │
├─────────────────────────────┤
│  Your Progress              │
│  Keep up the great work!    │
│                             │
│  Current Level              │
│  ┌───────────────────────┐ │
│  │         1             │ │
│  │  1 / 5 workouts to    │ │
│  │     next level        │ │
│  │  [██░░░░░░░░]         │ │
│  └───────────────────────┘ │
│                             │
│  Streaks                    │
│  ┌─────────┐ ┌─────────┐  │
│  │    1    │ │    1    │  │
│  │ Current │ │ Longest │  │
│  │  days   │ │  days   │  │
│  └─────────┘ └─────────┘  │
│                             │
│  Workouts Completed         │
│  ┌─────────┐ ┌─────────┐  │
│  │    1    │ │    1    │  │
│  │This Week│ │ Month   │  │
│  └─────────┘ └─────────┘  │
│                             │
│  Recent Workouts            │
│  ┌───────────────────────┐ │
│  │ Jan 17, 2026      ✓  │ │
│  │ Single Sets           │ │
│  │ 3 exercises • Level 1 │ │
│  └───────────────────────┘ │
└─────────────────────────────┘
```

### 10. Settings Screen

```
┌─────────────────────────────┐
│  ← Settings                │
├─────────────────────────────┤
│  Difficulty Level           │
│  ┌───────────────────────┐ │
│  │  [-]    1    [+]      │ │
│  │      Beginner         │ │
│  └───────────────────────┘ │
│                             │
│  Workout Duration           │
│  [5min] [10min] [15min]    │
│         ^^^^^^^ selected    │
│  [20min] [30min]            │
│                             │
│  Rest Days                  │
│  Select days to take off    │
│  [Sun][Mon][Tue][Wed]       │
│  [Thu][Fri][Sat]            │
│                             │
│  Data Management            │
│  [Reset All Data]           │
│                             │
│  About                      │
│  FitRoutine v1.0.0          │
└─────────────────────────────┘
```

## Common Questions

**Q: Why is the screen empty when I first open the app?**
A: Pull down to refresh! The app generates workouts when you refresh.

**Q: What if I can't do an exercise?**
A: Long press on it (hold your finger down) and tap "Replace" to swap it.

**Q: How do I know if my workout saved?**
A: Check the Stats screen - you'll see it in "Recent Workouts"

**Q: When does my level increase?**
A: Automatically after 5 consecutive completed workouts.

**Q: What if I miss a day?**
A: Your streak resets, but your total workouts and level stay the same.

## Tips for Smooth Experience

1. **Always start from command prompt** - Don't just open Expo Go and expect to see the app
2. **Keep terminal open** - That's your server!
3. **Same WiFi** - Both devices need same network
4. **Pull to refresh** - When in doubt, pull down on the home screen
5. **Shake to debug** - If something seems wrong, shake phone → reload

## You're Ready!

Now you know what to expect at each step. Time to get started!

Open command prompt and run:
```bash
cd C:\Users\PetervandeGiessen\FitRoutineExpo
npm install
npm start
```

Happy training! 💪
