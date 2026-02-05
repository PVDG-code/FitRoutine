import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl
} from 'react-native';
import {
  getCurrentWorkout,
  setCurrentWorkout,
  getUserLevel,
  getSettings,
  saveWorkoutToHistory,
  getStreakData,
  updateProgressionData,
  isRestDay
} from '../utils/storage';
import {
  generateDailyWorkout,
  isWorkoutForToday,
  toggleExerciseCompletion,
  replaceExercise
} from '../utils/workoutGeneratorV2';

const HomeScreen = ({ navigation }) => {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [streakData, setStreakData] = useState(null);
  const [isRest, setIsRest] = useState(false);

  useEffect(() => {
    loadWorkout();
  }, []);

  const loadWorkout = async () => {
    try {
      setLoading(true);

      // Check if today is a rest day
      const restDay = await isRestDay();
      setIsRest(restDay);

      // Load user level
      const level = await getUserLevel();
      setUserLevel(level);

      // Load streak data
      const streak = await getStreakData();
      setStreakData(streak);

      if (restDay) {
        setLoading(false);
        return;
      }

      // Load or generate today's workout
      let currentWorkout = await getCurrentWorkout();

      // If no workout exists or it's not for today, generate new one
      if (!currentWorkout || !isWorkoutForToday(currentWorkout)) {
        const settings = await getSettings();
        currentWorkout = await generateDailyWorkout(level, settings);
        await setCurrentWorkout(currentWorkout);
      }

      setWorkout(currentWorkout);
      setLoading(false);
    } catch (error) {
      console.error('Error loading workout:', error);
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadWorkout();
    setRefreshing(false);
  }, []);

  const handleExerciseToggle = async (index) => {
    try {
      const updatedWorkout = toggleExerciseCompletion(workout, index);
      setWorkout(updatedWorkout);
      await setCurrentWorkout(updatedWorkout);

      // If all exercises completed, save to history and check progression
      if (updatedWorkout.completed) {
        await saveWorkoutToHistory(updatedWorkout);

        // Check if user progressed
        const progressed = await updateProgressionData(true);

        if (progressed) {
          const newLevel = await getUserLevel();
          setUserLevel(newLevel);

          Alert.alert(
            'Level Up!',
            `Great work! You've progressed to level ${newLevel}. Your workouts will now be more challenging.`,
            [{ text: 'Awesome!', onPress: () => {} }]
          );
        } else {
          Alert.alert(
            'Workout Complete!',
            'Great job! Keep up the consistency to level up.',
            [{ text: 'Thanks!', onPress: () => {} }]
          );
        }

        // Reload streak data
        const streak = await getStreakData();
        setStreakData(streak);
      }
    } catch (error) {
      console.error('Error toggling exercise:', error);
    }
  };

  const handleReplaceExercise = async (index) => {
    try {
      Alert.alert(
        'Replace Exercise',
        'Would you like to swap this exercise for a different one?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Replace',
            onPress: async () => {
              const updatedWorkout = replaceExercise(workout, index, userLevel);
              setWorkout(updatedWorkout);
              await setCurrentWorkout(updatedWorkout);
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error replacing exercise:', error);
    }
  };

  const handleExercisePress = (exercise, index) => {
    navigation.navigate('ExerciseDetail', {
      exercise,
      exerciseIndex: index,
      onToggle: handleExerciseToggle,
      onReplace: handleReplaceExercise
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your workout...</Text>
        </View>
      </View>
    );
  }

  if (isRest) {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <Text style={styles.title}>Rest Day</Text>
            <Text style={styles.subtitle}>Recovery is part of progress</Text>
          </View>

          {streakData && (
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{streakData.currentStreak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{streakData.totalWorkouts}</Text>
                <Text style={styles.statLabel}>Total Workouts</Text>
              </View>
            </View>
          )}

          <View style={styles.restDayCard}>
            <Text style={styles.restDayText}>
              Take this time to recover and come back stronger tomorrow!
            </Text>
          </View>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.settingsButtonText}>Adjust Settings</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Today's Workout</Text>
          <Text style={styles.subtitle}>
            {workout?.workoutType === 'circuit'
              ? 'Complete 3 rounds of each exercise'
              : 'Complete each exercise'}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userLevel}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{streakData?.currentStreak || 0}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{workout?.estimatedDuration || 10}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {workout?.completedExercises || 0} / {workout?.exercises?.length || 0} exercises completed
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((workout?.completedExercises || 0) / (workout?.exercises?.length || 1)) * 100}%`
                }
              ]}
            />
          </View>
        </View>

        {/* Exercise List */}
        <View style={styles.exercisesContainer}>
          {workout?.exercises?.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.exerciseCard,
                exercise.completed && styles.exerciseCardCompleted
              ]}
              onPress={() => handleExercisePress(exercise, index)}
              onLongPress={() => handleReplaceExercise(index)}
            >
              <View style={styles.exerciseHeader}>
                <View style={styles.exerciseInfo}>
                  <Text style={[
                    styles.exerciseName,
                    exercise.completed && styles.exerciseNameCompleted
                  ]}>
                    {exercise.name}
                  </Text>
                  <Text style={styles.exerciseReps}>{exercise.reps} reps</Text>
                  <Text style={styles.exerciseCategory}>
                    {exercise.category.toUpperCase()} • {exercise.muscleGroups.join(', ')}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    exercise.completed && styles.checkboxCompleted
                  ]}
                  onPress={() => handleExerciseToggle(index)}
                >
                  {exercise.completed && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons - 3 Equal Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('WeeklyPreview')}
          >
            <Text style={styles.buttonIcon}>📅</Text>
            <Text style={styles.buttonText}>Week Ahead</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Stats')}
          >
            <Text style={styles.buttonIcon}>📊</Text>
            <Text style={styles.buttonText}>Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.buttonIcon}>⚙️</Text>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Workout Complete Message */}
        {workout?.completed && (
          <View style={styles.completionBanner}>
            <Text style={styles.completionText}>
              Workout Complete! Great job!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    height: '100%'
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 18,
    color: '#666'
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    color: '#666'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  statBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  },
  progressContainer: {
    marginBottom: 20
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 4
  },
  exercisesContainer: {
    marginBottom: 20
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  exerciseCardCompleted: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
    borderWidth: 2
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  exerciseInfo: {
    flex: 1
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  exerciseNameCompleted: {
    color: '#4CAF50'
  },
  exerciseReps: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
    marginBottom: 4
  },
  exerciseCategory: {
    fontSize: 12,
    color: '#999'
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50'
  },
  checkmark: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3
  },
  buttonIcon: {
    fontSize: 28,
    marginBottom: 6
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center'
  },
  completionBanner: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 10
  },
  completionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  restDayCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 30,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  restDayText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24
  },
  settingsButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center'
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default HomeScreen;
