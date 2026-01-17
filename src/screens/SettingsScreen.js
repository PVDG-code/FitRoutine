import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import {
  getSettings,
  saveSettings,
  getUserLevel,
  setUserLevel,
  clearAllData
} from '../utils/storage';

const DAYS = [
  { id: 0, name: 'Sunday', short: 'Sun' },
  { id: 1, name: 'Monday', short: 'Mon' },
  { id: 2, name: 'Tuesday', short: 'Tue' },
  { id: 3, name: 'Wednesday', short: 'Wed' },
  { id: 4, name: 'Thursday', short: 'Thu' },
  { id: 5, name: 'Friday', short: 'Fri' },
  { id: 6, name: 'Saturday', short: 'Sat' }
];

const DURATION_OPTIONS = [5, 10, 15, 20, 30];

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState(null);
  const [userLevel, setUserLevelState] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const currentSettings = await getSettings();
      const level = await getUserLevel();
      setSettings(currentSettings);
      setUserLevelState(level);
      setLoading(false);
    } catch (error) {
      console.error('Error loading settings:', error);
      setLoading(false);
    }
  };

  const handleSaveSettings = async (newSettings) => {
    try {
      await saveSettings(newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings. Please try again.');
    }
  };

  const toggleRestDay = (dayId) => {
    const restDays = settings.restDays || [];
    const newRestDays = restDays.includes(dayId)
      ? restDays.filter(id => id !== dayId)
      : [...restDays, dayId];

    const newSettings = {
      ...settings,
      restDays: newRestDays
    };
    handleSaveSettings(newSettings);
  };

  const setWorkoutDuration = (duration) => {
    const newSettings = {
      ...settings,
      workoutDuration: duration
    };
    handleSaveSettings(newSettings);
  };

  const handleLevelChange = (increment) => {
    Alert.alert(
      'Change Level',
      `Are you sure you want to ${increment > 0 ? 'increase' : 'decrease'} your level? This will affect workout difficulty.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            const newLevel = Math.max(1, Math.min(10, userLevel + increment));
            await setUserLevel(newLevel);
            setUserLevelState(newLevel);
          }
        }
      ]
    );
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'Are you sure you want to reset all your progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await clearAllData();
            Alert.alert('Success', 'All data has been reset.', [
              { text: 'OK', onPress: () => navigation.navigate('Home') }
            ]);
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading settings...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your workout experience</Text>
        </View>

        {/* Level Control */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Difficulty Level</Text>
          <View style={styles.levelControl}>
            <TouchableOpacity
              style={styles.levelButton}
              onPress={() => handleLevelChange(-1)}
              disabled={userLevel <= 1}
            >
              <Text style={[
                styles.levelButtonText,
                userLevel <= 1 && styles.levelButtonTextDisabled
              ]}>
                -
              </Text>
            </TouchableOpacity>
            <View style={styles.levelDisplay}>
              <Text style={styles.levelNumber}>{userLevel}</Text>
              <Text style={styles.levelLabel}>
                {userLevel <= 3 ? 'Beginner' : userLevel <= 7 ? 'Intermediate' : 'Advanced'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.levelButton}
              onPress={() => handleLevelChange(1)}
              disabled={userLevel >= 10}
            >
              <Text style={[
                styles.levelButtonText,
                userLevel >= 10 && styles.levelButtonTextDisabled
              ]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionNote}>
            Note: Level automatically increases after 5 consecutive completed workouts
          </Text>
        </View>

        {/* Workout Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Duration</Text>
          <View style={styles.durationOptions}>
            {DURATION_OPTIONS.map(duration => (
              <TouchableOpacity
                key={duration}
                style={[
                  styles.durationButton,
                  settings.workoutDuration === duration && styles.durationButtonActive
                ]}
                onPress={() => setWorkoutDuration(duration)}
              >
                <Text style={[
                  styles.durationButtonText,
                  settings.workoutDuration === duration && styles.durationButtonTextActive
                ]}>
                  {duration} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rest Days */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rest Days</Text>
          <Text style={styles.sectionNote}>
            Select which days you want to take off from workouts
          </Text>
          <View style={styles.daysGrid}>
            {DAYS.map(day => {
              const isRestDay = settings.restDays?.includes(day.id);
              return (
                <TouchableOpacity
                  key={day.id}
                  style={[
                    styles.dayButton,
                    isRestDay && styles.dayButtonActive
                  ]}
                  onPress={() => toggleRestDay(day.id)}
                >
                  <Text style={[
                    styles.dayButtonText,
                    isRestDay && styles.dayButtonTextActive
                  ]}>
                    {day.short}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleResetData}
          >
            <Text style={styles.dangerButtonText}>Reset All Data</Text>
          </TouchableOpacity>
          <Text style={styles.sectionNote}>
            This will delete all your progress, history, and settings
          </Text>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              FitRoutine v1.0.0
            </Text>
            <Text style={styles.aboutText}>
              Your personal calisthenics workout companion
            </Text>
            <Text style={styles.aboutTextSmall}>
              Designed for mat and resistance band exercises
            </Text>
          </View>
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
  section: {
    marginBottom: 32
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12
  },
  sectionNote: {
    fontSize: 13,
    color: '#999',
    marginTop: 8,
    lineHeight: 18
  },
  levelControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  levelButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  levelButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  levelButtonTextDisabled: {
    opacity: 0.3
  },
  levelDisplay: {
    marginHorizontal: 40,
    alignItems: 'center'
  },
  levelNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4
  },
  levelLabel: {
    fontSize: 14,
    color: '#666'
  },
  durationOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4
  },
  durationButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 4,
    borderWidth: 2,
    borderColor: '#e0e0e0'
  },
  durationButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2'
  },
  durationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666'
  },
  durationButtonTextActive: {
    color: '#fff'
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginHorizontal: -4
  },
  dayButton: {
    width: '12%',
    aspectRatio: 1,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0'
  },
  dayButtonActive: {
    backgroundColor: '#ff9800',
    borderColor: '#ff9800'
  },
  dayButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666'
  },
  dayButtonTextActive: {
    color: '#fff'
  },
  dangerButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center'
  },
  dangerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  aboutCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center'
  },
  aboutText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center'
  },
  aboutTextSmall: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginTop: 4
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

export default SettingsScreen;
