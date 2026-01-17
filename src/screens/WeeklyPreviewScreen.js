import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  getUserLevel,
  getSettings
} from '../utils/storage';
import { getWeeklyPlan } from '../utils/workoutGeneratorV2';

const WeeklyPreviewScreen = ({ navigation }) => {
  const [weeklyWorkouts, setWeeklyWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeekPreview();
  }, []);

  const loadWeekPreview = async () => {
    try {
      setLoading(true);
      const level = await getUserLevel();
      const settings = await getSettings();

      // Get the actual weekly plan (same one used for daily workouts)
      const weeklyPlan = await getWeeklyPlan(level, settings);

      // Format for display
      const today = new Date();
      const formattedWorkouts = weeklyPlan.map((day, index) => {
        const dayDate = new Date(day.date);
        const isToday = (
          dayDate.getDate() === today.getDate() &&
          dayDate.getMonth() === today.getMonth() &&
          dayDate.getFullYear() === today.getFullYear()
        );

        if (day.isRestDay) {
          return {
            date: day.date,
            dayName: getDayName(dayDate),
            dateStr: formatDate(dayDate),
            isRestDay: true,
            isToday
          };
        } else {
          return {
            ...day,
            dayName: getDayName(dayDate),
            dateStr: formatDate(dayDate),
            isRestDay: false,
            isToday
          };
        }
      });

      setWeeklyWorkouts(formattedWorkouts);
      setLoading(false);
    } catch (error) {
      console.error('Error loading week preview:', error);
      setLoading(false);
    }
  };

  const getDayName = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      push: '💪',
      pull: '🏋️',
      legs: '🦵',
      core: '🔥'
    };
    return icons[category] || '💪';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Generating your week...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Week Ahead</Text>
          <Text style={styles.subtitle}>Preview of upcoming workouts</Text>
        </View>

        {/* Weekly Calendar */}
        {weeklyWorkouts.map((workout, index) => (
          <View
            key={index}
            style={[
              styles.dayCard,
              workout.isToday && styles.todayCard,
              workout.isRestDay && styles.restDayCard
            ]}
          >
            {/* Day Header */}
            <View style={styles.dayHeader}>
              <View style={styles.dayInfo}>
                <Text style={[
                  styles.dayName,
                  workout.isToday && styles.todayText
                ]}>
                  {workout.dayName}
                  {workout.isToday && ' (Today)'}
                </Text>
                <Text style={styles.dateStr}>{workout.dateStr}</Text>
              </View>
              {workout.isToday && (
                <View style={styles.todayBadge}>
                  <Text style={styles.todayBadgeText}>TODAY</Text>
                </View>
              )}
            </View>

            {/* Workout Content */}
            {workout.isRestDay ? (
              <View style={styles.restDayContent}>
                <Text style={styles.restDayIcon}>😴</Text>
                <Text style={styles.restDayText}>Rest Day</Text>
                <Text style={styles.restDaySubtext}>Recovery & restoration</Text>
              </View>
            ) : (
              <View style={styles.workoutContent}>
                {/* Workout Type */}
                <View style={styles.workoutMeta}>
                  <Text style={styles.workoutType}>
                    {workout.workoutType === 'circuit' ? '🔄 Circuit' : '📋 Single Sets'}
                  </Text>
                  <Text style={styles.workoutDuration}>
                    ⏱️ {workout.estimatedDuration} min
                  </Text>
                  <Text style={styles.workoutLevel}>
                    📊 Level {workout.level}
                  </Text>
                </View>

                {/* Exercise List */}
                <View style={styles.exercisesList}>
                  {workout.exercises.map((exercise, exIndex) => (
                    <View key={exIndex} style={styles.exercisePreview}>
                      <Text style={styles.exerciseIcon}>
                        {getCategoryIcon(exercise.category)}
                      </Text>
                      <View style={styles.exerciseInfo}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <Text style={styles.exerciseReps}>
                          {exercise.reps} reps • {exercise.category}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📅 About Your Weekly Preview</Text>
          <Text style={styles.infoText}>
            • These are predicted workouts based on your current level{'\n'}
            • Actual workouts may vary to ensure variety{'\n'}
            • Rest days help your muscles recover and grow{'\n'}
            • You can adjust rest days in Settings
          </Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Today's Workout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40
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
    marginBottom: 24
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
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  todayCard: {
    borderWidth: 3,
    borderColor: '#4A90E2',
    shadowColor: '#4A90E2',
    shadowOpacity: 0.3
  },
  restDayCard: {
    backgroundColor: '#FFF9E6'
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  dayInfo: {
    flex: 1
  },
  dayName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  todayText: {
    color: '#4A90E2'
  },
  dateStr: {
    fontSize: 14,
    color: '#999'
  },
  todayBadge: {
    backgroundColor: '#4A90E2',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  todayBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  restDayContent: {
    alignItems: 'center',
    paddingVertical: 20
  },
  restDayIcon: {
    fontSize: 48,
    marginBottom: 12
  },
  restDayText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF9800',
    marginBottom: 4
  },
  restDaySubtext: {
    fontSize: 14,
    color: '#999'
  },
  workoutContent: {
    // Content for workout days
  },
  workoutMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 12
  },
  workoutType: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600'
  },
  workoutDuration: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600'
  },
  workoutLevel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600'
  },
  exercisesList: {
    gap: 8
  },
  exercisePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8
  },
  exerciseIcon: {
    fontSize: 24,
    marginRight: 12
  },
  exerciseInfo: {
    flex: 1
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2
  },
  exerciseReps: {
    fontSize: 13,
    color: '#666'
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2'
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12
  },
  infoText: {
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 22
  },
  backButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center'
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default WeeklyPreviewScreen;
