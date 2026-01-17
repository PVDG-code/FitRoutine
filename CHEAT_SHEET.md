# FitRoutine - Command Cheat Sheet

## Essential Commands (Copy & Paste These)

### First Time Setup
```bash
# 1. Open Command Prompt (Win + R, type cmd, Enter)

# 2. Go to project folder
cd C:\Users\PetervandeGiessen\FitRoutineExpo

# 3. Install everything (only needed once)
npm install

# 4. Start the app
npm start
```

### Daily Use
```bash
# Navigate to project
cd C:\Users\PetervandeGiessen\FitRoutineExpo

# Start app
npm start

# Stop app (in command prompt)
Ctrl + C
```

### Troubleshooting
```bash
# Clear cache and restart
npm start -- --clear

# Full reset (if things break)
cd C:\Users\PetervandeGiessen\FitRoutineExpo
rmdir /s /q node_modules
npm install
npm start
```

## Expo Go Actions (On Your iPhone)

- **Open Expo Go** → Scan QR code from command prompt
- **Reload app** → Shake phone → Tap "Reload"
- **Open menu** → Shake phone
- **Close app** → Swipe up (like any iPhone app)

## Keyboard Shortcuts (In Command Prompt)

While `npm start` is running:

- `r` - Reload app
- `m` - Toggle menu
- `t` - Switch to tunnel mode (if WiFi issues)
- `c` - Clear console
- `Ctrl+C` - Stop server

## File Locations

All your code is here:
```
C:\Users\PetervandeGiessen\FitRoutineExpo\
```

Edit exercises:
```
C:\Users\PetervandeGiessen\FitRoutineExpo\src\data\exercises.js
```

Edit screens:
```
C:\Users\PetervandeGiessen\FitRoutineExpo\src\screens\
```

## Common Error Solutions

| Error | Solution |
|-------|----------|
| "npm is not recognized" | Install Node.js from nodejs.org |
| QR won't scan | Press `t` in command prompt for tunnel mode |
| "Unable to resolve module" | Run `npm start -- --clear` |
| App crashes | Check command prompt for error message |
| Stuck on splash screen | Make sure metro bundler is running |

## WiFi Requirement

✅ **Your PC and iPhone MUST be on the same WiFi network**

Don't have same WiFi? Use tunnel mode:
- In command prompt, press `t`
- Scan the new QR code
- Works over internet (slower but works anywhere)

## What Gets Saved

**On Your iPhone (in Expo Go):**
- Your workout history
- Current streak
- Settings (duration, rest days)
- Progress level

**On Your PC:**
- The app code
- Exercise database
- UI design

## Quick Feature Guide

| Feature | How to Access |
|---------|---------------|
| Today's workout | Home screen (pull to refresh first time) |
| Exercise details | Tap any exercise |
| Replace exercise | Long press exercise card |
| Mark complete | Tap checkbox |
| View streak | Home screen (top stats) |
| See all stats | Tap "View Stats" button |
| Change duration | Tap "Settings" → Select minutes |
| Set rest days | Settings → Tap days to toggle |
| Adjust level | Settings → Use +/- buttons |

## Development Workflow

1. Start server: `npm start`
2. Scan QR code with Expo Go
3. Edit code in text editor
4. Save file
5. App auto-updates on phone!
6. No need to rescan QR

## Installing Node.js (If Needed)

1. Go to: https://nodejs.org/
2. Download LTS version (left button)
3. Run installer
4. Click Next/Accept everything
5. Restart Command Prompt
6. Test: `node --version`

## First Run Checklist

- [ ] Node.js installed (`node --version` works)
- [ ] In correct folder (`cd C:\Users\PetervandeGiessen\FitRoutineExpo`)
- [ ] Dependencies installed (`npm install` completed)
- [ ] Expo Go installed on iPhone
- [ ] PC and iPhone on same WiFi
- [ ] Server started (`npm start`)
- [ ] QR code scanned with Expo Go
- [ ] App loaded on iPhone!

## Getting Help

**In Command Prompt:**
- Red text = errors (read them!)
- Yellow text = warnings (usually okay)
- Look for clear error messages

**Common Success Messages:**
```
✓ Metro bundler is running
✓ Waiting on exp://...
✓ Scan the QR code above
```

**Common Error Messages:**
```
✗ Unable to resolve module → Run npm start -- --clear
✗ Port in use → Close other terminals
✗ Network error → Check WiFi connection
```

## That's It!

Keep this cheat sheet handy. These commands are all you need!

Ready to start? Run:
```bash
cd C:\Users\PetervandeGiessen\FitRoutineExpo
npm install
npm start
```

Then scan the QR code with Expo Go and start working out! 💪
