# How to Add Real Exercise Images/GIFs

Want to replace the emoji visuals with actual exercise photos or GIFs? Here's how!

## Option 1: Use Local Images (Recommended)

### Step 1: Get Exercise Images

**Free sources for exercise images/GIFs:**
- **Giphy.com** - Search "push-ups exercise" for GIFs
- **Unsplash.com** - Free high-quality workout photos
- **Pexels.com** - Free workout images and videos
- **FitnessMentor** - Exercise demonstration images
- **YouTube Screenshots** - Screenshot exercises from tutorials

### Step 2: Add Images to Project

1. Create an `exercises` folder in assets:
   ```
   FitRoutineExpo/assets/exercises/
   ```

2. Add your images with clear names:
   ```
   wall-pushups.gif
   squats.gif
   plank.gif
   etc.
   ```

3. Keep file sizes small:
   - GIFs: Under 500KB each
   - Images: Under 200KB each
   - Use online tools like ezgif.com to compress

### Step 3: Update ExerciseImage Component

Edit `src/components/ExerciseImage.js`:

```javascript
import { Image } from 'react-native';

// At the top, add your images
const exerciseImages = {
  wall_pushups: require('../../assets/exercises/wall-pushups.gif'),
  squats: require('../../assets/exercises/squats.gif'),
  plank: require('../../assets/exercises/plank.gif'),
  // ... add more
};

// In the component, replace the visualBox with:
<Image
  source={exerciseImages[exerciseId]}
  style={styles.exerciseImage}
  resizeMode="contain"
/>

// Add this style:
exerciseImage: {
  width: '100%',
  height: 200,
  borderRadius: 12
}
```

## Option 2: Use Online Images (URLs)

### Step 1: Find Image URLs

Use free CDN services like:
- Imgur
- Cloudinary
- imgbb.com

Or use direct links from exercise databases.

### Step 2: Add URLs to Exercise Data

Edit `src/data/exercises.js`:

```javascript
wall_pushups: {
  id: 'wall_pushups',
  name: 'Wall Push-ups',
  // ... other properties
  imageUrl: 'https://example.com/wall-pushups.gif',
},
```

### Step 3: Update ExerciseImage Component

```javascript
<Image
  source={{ uri: exercise.imageUrl }}
  style={styles.exerciseImage}
  resizeMode="contain"
/>
```

## Option 3: Use YouTube Videos

### Step 1: Add YouTube IDs

In `src/data/exercises.js`:

```javascript
wall_pushups: {
  id: 'wall_pushups',
  name: 'Wall Push-ups',
  // ... other properties
  youtubeId: 'dQw4w9WgXcQ', // Replace with real video ID
},
```

### Step 2: Install React Native WebView

```bash
npx expo install react-native-webview
```

### Step 3: Create YouTube Component

Create `src/components/YouTubePlayer.js`:

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const YouTubePlayer = ({ videoId }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <View style={styles.container}>
      <WebView
        style={styles.video}
        source={{ uri: videoUrl }}
        allowsFullscreenVideo
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden'
  },
  video: {
    flex: 1
  }
});

export default YouTubePlayer;
```

### Step 4: Use in ExerciseDetailScreen

```javascript
import YouTubePlayer from '../components/YouTubePlayer';

// In the render:
{exercise.youtubeId && (
  <YouTubePlayer videoId={exercise.youtubeId} />
)}
```

## Quick Copy-Paste Solution

### Using Giphy API (Free)

1. Sign up at developers.giphy.com (free)
2. Get an API key
3. Create `src/utils/gifSearch.js`:

```javascript
const GIPHY_API_KEY = 'your_api_key_here';

export const getExerciseGif = async (exerciseName) => {
  const searchTerm = exerciseName.replace('-', ' ') + ' exercise';
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[0].images.fixed_height.url;
    }
  } catch (error) {
    console.error('Error fetching GIF:', error);
  }
  return null;
};
```

4. Use in ExerciseImage component:

```javascript
import { useState, useEffect } from 'react';
import { getExerciseGif } from '../utils/gifSearch';

const ExerciseImage = ({ exerciseName }) => {
  const [gifUrl, setGifUrl] = useState(null);

  useEffect(() => {
    const loadGif = async () => {
      const url = await getExerciseGif(exerciseName);
      setGifUrl(url);
    };
    loadGif();
  }, [exerciseName]);

  return gifUrl ? (
    <Image source={{ uri: gifUrl }} style={styles.gif} />
  ) : (
    <Text>Loading...</Text>
  );
};
```

## Recommended Approach

For your app, I recommend:

1. **Start simple:** Keep the emoji visuals (already done!)
2. **Add key exercises:** Add images for the top 5-10 most common exercises
3. **Use local GIFs:** Download small GIFs and add to assets folder
4. **Fallback:** If image doesn't exist, show emoji visual

### Example Hybrid Approach:

```javascript
const ExerciseImage = ({ exerciseId, exerciseName }) => {
  const exerciseImages = {
    wall_pushups: require('../../assets/exercises/wall-pushups.gif'),
    squats: require('../../assets/exercises/squats.gif'),
    // Add more as you find them
  };

  // If we have an image, use it
  if (exerciseImages[exerciseId]) {
    return (
      <Image
        source={exerciseImages[exerciseId]}
        style={styles.image}
      />
    );
  }

  // Otherwise, fall back to emoji visual (current implementation)
  return (
    <View style={styles.emojiVisual}>
      {/* Current emoji code */}
    </View>
  );
};
```

## Best Practices

1. **File Sizes:**
   - Keep GIFs under 500KB
   - Use optimization tools (ezgif.com, tinypng.com)

2. **Naming:**
   - Use exercise IDs as filenames: `wall_pushups.gif`
   - Consistent naming prevents errors

3. **Formats:**
   - GIF: Best for animations, larger files
   - PNG: Best for static images with transparency
   - JPG: Best for photos, smaller files
   - WebP: Best quality/size ratio (newer format)

4. **Accessibility:**
   - Always have a fallback
   - Add alt text for screen readers

5. **Performance:**
   - Lazy load images
   - Cache frequently used images
   - Consider using FastImage for better performance:
     ```bash
     npx expo install react-native-fast-image
     ```

## Testing

After adding images:

1. Reload the app
2. Go to Exercise Details
3. Check that images load
4. Test on slow connection (airplane mode)
5. Ensure fallback works if image fails

## Need Help Finding Images?

Here's a search template for each exercise:

```
Google: "[exercise name] demonstration gif"
Giphy: "[exercise name] exercise"
YouTube: "[exercise name] proper form"
```

For example:
- "wall pushups demonstration gif"
- "bodyweight squats exercise"
- "plank proper form"

## Summary

You have 3 options:

1. ✅ **Keep emoji visuals** (already working!)
2. 🎯 **Add local GIFs** (best quality, works offline)
3. 🌐 **Use online URLs** (easy to add, needs internet)

The current emoji system is great for getting started. Add real images later as you find good ones!

---

**Current status:** Your app works perfectly with colorful emoji visuals. You can enhance anytime!
