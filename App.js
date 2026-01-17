import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ExerciseDetailScreen from './src/screens/ExerciseDetailScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import WeeklyPreviewScreen from './src/screens/WeeklyPreviewScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4A90E2'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'FitRoutine',
            headerStyle: {
              backgroundColor: '#4A90E2'
            }
          }}
        />
        <Stack.Screen
          name="ExerciseDetail"
          component={ExerciseDetailScreen}
          options={{
            title: 'Exercise Details'
          }}
        />
        <Stack.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: 'Statistics'
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings'
          }}
        />
        <Stack.Screen
          name="WeeklyPreview"
          component={WeeklyPreviewScreen}
          options={{
            title: 'Week Ahead'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
