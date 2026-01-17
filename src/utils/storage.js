import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const KEYS = {
  USER_LEVEL: '@fit_routine_user_level',
  WORKOUT_HISTORY: '@fit_routine_workout_history',
  CURRENT_WORKOUT: '@fit_routine_current_workout',
  SETTINGS: '@fit_routine_settings',
  STREAK_DATA: '@fit_routine_streak_data',
  PROGRESSION_DATA: '@fit_routine_progression_data'
};

// User progression tracking
export const getUserLevel = async () => {
  try {
    const level = await AsyncStorage.getItem(KEYS.USER_LEVEL);
    return level ? parseInt(level) : 1; // Start at level 1
  } catch (error) {
    console.error('Error getting user level:', error);
    return 1;
  }
};

export const setUserLevel = async (level) => {
  try {
    await AsyncStorage.setItem(KEYS.USER_LEVEL, level.toString());
  } catch (error) {
    console.error('Error setting user level:', error);
  }
};

// Workout history management
export const getWorkoutHistory = async () => {
  try {
    const history = await AsyncStorage.getItem(KEYS.WORKOUT_HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting workout history:', error);
    return [];
  }
};

export const saveWorkoutToHistory = async (workout) => {
  try {
    const history = await getWorkoutHistory();
    const newEntry = {
      ...workout,
      completedAt: new Date().toISOString()
    };
    history.push(newEntry);
    await AsyncStorage.setItem(KEYS.WORKOUT_HISTORY, JSON.stringify(history));

    // Update streak after saving workout
    await updateStreak();
  } catch (error) {
    console.error('Error saving workout to history:', error);
  }
};

// Current workout (daily generated workout)
export const getCurrentWorkout = async () => {
  try {
    const workout = await AsyncStorage.getItem(KEYS.CURRENT_WORKOUT);
    return workout ? JSON.parse(workout) : null;
  } catch (error) {
    console.error('Error getting current workout:', error);
    return null;
  }
};

export const setCurrentWorkout = async (workout) => {
  try {
    await AsyncStorage.setItem(KEYS.CURRENT_WORKOUT, JSON.stringify(workout));
  } catch (error) {
    console.error('Error setting current workout:', error);
  }
};

// Settings management
export const getSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem(KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : {
      workoutDuration: 10, // default 10 minutes
      restDays: [], // array of day numbers (0-6, where 0 is Sunday)
      notificationsEnabled: true,
      notificationTime: '07:00'
    };
  } catch (error) {
    console.error('Error getting settings:', error);
    return {
      workoutDuration: 10,
      restDays: [],
      notificationsEnabled: true,
      notificationTime: '07:00'
    };
  }
};

export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

// Streak tracking
export const getStreakData = async () => {
  try {
    const streakData = await AsyncStorage.getItem(KEYS.STREAK_DATA);
    return streakData ? JSON.parse(streakData) : {
      currentStreak: 0,
      longestStreak: 0,
      lastWorkoutDate: null,
      totalWorkouts: 0
    };
  } catch (error) {
    console.error('Error getting streak data:', error);
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastWorkoutDate: null,
      totalWorkouts: 0
    };
  }
};

const updateStreak = async () => {
  try {
    const streakData = await getStreakData();
    const today = new Date().toDateString();
    const lastWorkout = streakData.lastWorkoutDate ? new Date(streakData.lastWorkoutDate).toDateString() : null;

    // If workout already done today, don't update
    if (lastWorkout === today) {
      return;
    }

    // Calculate if streak continues
    let newStreak = streakData.currentStreak;

    if (lastWorkout) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (lastWorkout === yesterdayStr) {
        // Streak continues
        newStreak += 1;
      } else {
        // Streak broken, start new
        newStreak = 1;
      }
    } else {
      // First workout
      newStreak = 1;
    }

    const newStreakData = {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, streakData.longestStreak),
      lastWorkoutDate: new Date().toISOString(),
      totalWorkouts: streakData.totalWorkouts + 1
    };

    await AsyncStorage.setItem(KEYS.STREAK_DATA, JSON.stringify(newStreakData));
  } catch (error) {
    console.error('Error updating streak:', error);
  }
};

// Progression tracking (for automatic difficulty increase)
export const getProgressionData = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.PROGRESSION_DATA);
    return data ? JSON.parse(data) : {
      consecutiveCompletions: 0,
      lastProgressionDate: null
    };
  } catch (error) {
    console.error('Error getting progression data:', error);
    return {
      consecutiveCompletions: 0,
      lastProgressionDate: null
    };
  }
};

export const updateProgressionData = async (workoutCompleted) => {
  try {
    const progressionData = await getProgressionData();

    if (workoutCompleted) {
      const newCompletions = progressionData.consecutiveCompletions + 1;

      // Auto-progress after 5 consecutive successful workouts
      if (newCompletions >= 5) {
        const currentLevel = await getUserLevel();
        await setUserLevel(currentLevel + 1);

        await AsyncStorage.setItem(KEYS.PROGRESSION_DATA, JSON.stringify({
          consecutiveCompletions: 0, // Reset after progression
          lastProgressionDate: new Date().toISOString()
        }));

        return true; // Indicate that progression occurred
      } else {
        await AsyncStorage.setItem(KEYS.PROGRESSION_DATA, JSON.stringify({
          consecutiveCompletions: newCompletions,
          lastProgressionDate: progressionData.lastProgressionDate
        }));
      }
    } else {
      // Reset consecutive completions if workout not completed
      await AsyncStorage.setItem(KEYS.PROGRESSION_DATA, JSON.stringify({
        consecutiveCompletions: 0,
        lastProgressionDate: progressionData.lastProgressionDate
      }));
    }

    return false;
  } catch (error) {
    console.error('Error updating progression data:', error);
    return false;
  }
};

// Check if today is a rest day
export const isRestDay = async () => {
  try {
    const settings = await getSettings();
    const today = new Date().getDay(); // 0-6, where 0 is Sunday
    return settings.restDays.includes(today);
  } catch (error) {
    console.error('Error checking rest day:', error);
    return false;
  }
};

// Clear all data (for testing or reset)
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

export default {
  getUserLevel,
  setUserLevel,
  getWorkoutHistory,
  saveWorkoutToHistory,
  getCurrentWorkout,
  setCurrentWorkout,
  getSettings,
  saveSettings,
  getStreakData,
  updateProgressionData,
  isRestDay,
  clearAllData
};
