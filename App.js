import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ExerciseDetailScreen from './src/screens/ExerciseDetailScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import WeeklyPreviewScreen from './src/screens/WeeklyPreviewScreen';

const Stack = createStackNavigator();

// Custom header with navigation buttons
const CustomHeader = ({ navigation, title }) => (
  <View style={headerStyles.container}>
    <Text style={headerStyles.title}>{title}</Text>
    <View style={headerStyles.navButtons}>
      <TouchableOpacity
        style={headerStyles.navButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={headerStyles.navButtonText}>🏠 Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={headerStyles.navButton}
        onPress={() => navigation.navigate('WeeklyPreview')}
      >
        <Text style={headerStyles.navButtonText}>📅 Week</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={headerStyles.navButton}
        onPress={() => navigation.navigate('Stats')}
      >
        <Text style={headerStyles.navButtonText}>📊 Stats</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={headerStyles.navButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={headerStyles.navButtonText}>⚙️ Settings</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#4A90E2',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  navButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap'
  },
  navButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6
  },
  navButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  }
});

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation, route }) => ({
          header: () => {
            let title = 'FitRoutine';
            if (route.name === 'Home') title = "Today's Workout";
            else if (route.name === 'WeeklyPreview') title = 'Week Ahead';
            else if (route.name === 'Stats') title = 'Statistics';
            else if (route.name === 'Settings') title = 'Settings';
            else if (route.name === 'ExerciseDetail') title = 'Exercise Details';
            return <CustomHeader navigation={navigation} title={title} />;
          }
        })}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="ExerciseDetail"
          component={ExerciseDetailScreen}
        />
        <Stack.Screen
          name="Stats"
          component={StatsScreen}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />
        <Stack.Screen
          name="WeeklyPreview"
          component={WeeklyPreviewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
