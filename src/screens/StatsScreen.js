import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  getStreakData,
  getWorkoutHistory,
  getUserLevel,
  getProgressionData
} from '../utils/storage';

const StatsScreen = ({ navigation }) => {
  const [streakData, setStreakData] = useState(null);
  const [history, setHistory] = useState([]);
  const [userLevel, setUserLevel] = useState(1);
  const [progressionData, setProgressionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);

      const [streak, workoutHistory, level, progression] = await Promise.all([
        getStreakData(),
        getWorkoutHistory(),
        getUserLevel(),
        getProgressionData()
      ]);

      setStreakData(streak);
      setHistory(workoutHistory);
      setUserLevel(level);
      setProgressionData(progression);
      setLoading(false);
    } catch (error) {
      console.error('Error loading stats:', error);
      setLoading(false);
    }
  };

  const getWeeklyStats = () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weeklyWorkouts = history.filter(workout => {
      const workoutDate = new Date(workout.completedAt);
      return workoutDate >= weekAgo;
    });

    return weeklyWorkouts.length;
  };

  const getMonthlyStats = () => {
    const now = new Date();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const monthlyWorkouts = history.filter(workout => {
      const workoutDate = new Date(workout.completedAt);
      return workoutDate >= monthAgo;
    });

    return monthlyWorkouts.length;
  };

  const getTotalExercisesCompleted = () => {
    return history.reduce((total, workout) => {
      return total + (workout.exercises?.length || 0);
    }, 0);
  };

  const getProgressToNextLevel = () => {
    const needed = 5;
    const current = progressionData?.consecutiveCompletions || 0;
    const percentage = (current / needed) * 100;
    return { current, needed, percentage };
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading stats...</Text>
        </View>
      </View>
    );
  }

  const weeklyWorkouts = getWeeklyStats();
  const monthlyWorkouts = getMonthlyStats();
  const totalExercises = getTotalExercisesCompleted();
  const levelProgress = getProgressToNextLevel();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Keep up the great work!</Text>
        </View>

        {/* Level Card */}
        <View style={styles.levelCard}>
          <Text style={styles.levelTitle}>Current Level</Text>
          <Text style={styles.levelNumber}>{userLevel}</Text>
          <Text style={styles.levelSubtext}>
            {levelProgress.current} / {levelProgress.needed} workouts to next level
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${levelProgress.percentage}%` }
              ]}
            />
          </View>
        </View>

        {/* Streak Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Streaks</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{streakData?.currentStreak || 0}</Text>
              <Text style={styles.statLabel}>Current Streak</Text>
              <Text style={styles.statUnit}>days</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{streakData?.longestStreak || 0}</Text>
              <Text style={styles.statLabel}>Longest Streak</Text>
              <Text style={styles.statUnit}>days</Text>
            </View>
          </View>
        </View>

        {/* Workout Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workouts Completed</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{weeklyWorkouts}</Text>
              <Text style={styles.statLabel}>This Week</Text>
              <Text style={styles.statUnit}>workouts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{monthlyWorkouts}</Text>
              <Text style={styles.statLabel}>This Month</Text>
              <Text style={styles.statUnit}>workouts</Text>
            </View>
          </View>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, styles.fullWidth]}>
              <Text style={styles.statNumber}>{streakData?.totalWorkouts || 0}</Text>
              <Text style={styles.statLabel}>Total Workouts</Text>
              <Text style={styles.statUnit}>all time</Text>
            </View>
          </View>
        </View>

        {/* Exercise Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, styles.fullWidth]}>
              <Text style={styles.statNumber}>{totalExercises}</Text>
              <Text style={styles.statLabel}>Total Exercises Completed</Text>
              <Text style={styles.statUnit}>all time</Text>
            </View>
          </View>
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          {history.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No workouts completed yet. Start your first workout today!
              </Text>
            </View>
          ) : (
            <View style={styles.historyList}>
              {history
                .slice(-10)
                .reverse()
                .map((workout, index) => {
                  const date = new Date(workout.completedAt);
                  const dateStr = date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });

                  return (
                    <View key={index} style={styles.historyItem}>
                      <View style={styles.historyDate}>
                        <Text style={styles.historyDateText}>{dateStr}</Text>
                      </View>
                      <View style={styles.historyDetails}>
                        <Text style={styles.historyType}>
                          {workout.workoutType === 'circuit' ? 'Circuit' : 'Single Sets'}
                        </Text>
                        <Text style={styles.historyExercises}>
                          {workout.exercises?.length || 0} exercises • Level {workout.level}
                        </Text>
                      </View>
                      <View style={styles.historyBadge}>
                        <Text style={styles.historyBadgeText}>✓</Text>
                      </View>
                    </View>
                  );
                })}
            </View>
          )}
        </View>

        {/* Motivational Message */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationText}>
            {streakData?.currentStreak >= 7
              ? `Amazing! ${streakData.currentStreak} days in a row! You're building a strong habit.`
              : streakData?.currentStreak >= 3
              ? `Great job! ${streakData.currentStreak} days strong. Keep the momentum going!`
              : `Every workout counts! Stay consistent to build your streak.`}
          </Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Workout</Text>
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
  levelCard: {
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5
  },
  levelTitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8
  },
  levelNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  levelSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 12
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  fullWidth: {
    marginHorizontal: 0
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4
  },
  statUnit: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center'
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center'
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24
  },
  historyList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden'
  },
  historyItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  historyDate: {
    width: 80
  },
  historyDateText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500'
  },
  historyDetails: {
    flex: 1,
    marginLeft: 12
  },
  historyType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  historyExercises: {
    fontSize: 13,
    color: '#999'
  },
  historyBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center'
  },
  historyBadgeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  motivationCard: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50'
  },
  motivationText: {
    fontSize: 15,
    color: '#2e7d32',
    lineHeight: 22,
    textAlign: 'center'
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

export default StatsScreen;
