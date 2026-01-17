// Updated Workout Generator using Fitness Engine
// Ensures alignment between daily and weekly workouts

import { EXERCISES } from '../data/exercises';
import {
  generateWeeklyPlan,
  selectExercisesForDay,
  determineWorkoutType,
  calculateRepsForExercise
} from './fitnessEngine';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WEEKLY_PLAN_KEY = '@fit_routine_weekly_plan';
const PLAN_GENERATION_DATE_KEY = '@fit_routine_plan_date';

/**
 * Get or generate the weekly plan
 * Weekly plan is generated once per week and stored
 * This ensures daily and weekly preview are ALWAYS aligned
 */
export const getWeeklyPlan = async (userLevel, settings) => {
  try {
    // Check if we have a plan and when it was generated
    const storedPlanJson = await AsyncStorage.getItem(WEEKLY_PLAN_KEY);
    const planDateStr = await AsyncStorage.getItem(PLAN_GENERATION_DATE_KEY);

    if (storedPlanJson && planDateStr) {
      const planDate = new Date(planDateStr);
      const today = new Date();

      // Check if plan is from this week (same week, starting Monday)
      const planWeekStart = getWeekStart(planDate);
      const todayWeekStart = getWeekStart(today);

      if (planWeekStart.getTime() === todayWeekStart.getTime()) {
        // Plan is still valid for this week
        return JSON.parse(storedPlanJson);
      }
    }

    // Generate new weekly plan
    const newPlan = generateWeeklyPlan(userLevel, settings, getWeekStart(new Date()));

    // Generate exercises for each day
    const planWithExercises = newPlan.map(day => {
      if (day.isRestDay) {
        return day;
      }

      const exercises = selectExercisesForDay(day.focus, userLevel, []);
      const workoutType = determineWorkoutType(day.focus, userLevel);

      const exercisesWithReps = exercises.map(exercise => ({
        id: exercise.id,
        name: exercise.name,
        category: exercise.category,
        reps: calculateRepsForExercise(exercise, userLevel, workoutType),
        completed: false,
        description: exercise.description,
        instructions: exercise.instructions,
        muscleGroups: exercise.muscleGroups,
        equipment: exercise.equipment
      }));

      return {
        ...day,
        exercises: exercisesWithReps,
        workoutType,
        level: userLevel,
        estimatedDuration: settings?.workoutDuration || 10
      };
    });

    // Store the plan
    await AsyncStorage.setItem(WEEKLY_PLAN_KEY, JSON.stringify(planWithExercises));
    await AsyncStorage.setItem(PLAN_GENERATION_DATE_KEY, new Date().toISOString());

    return planWithExercises;
  } catch (error) {
    console.error('Error getting weekly plan:', error);
    // Fallback: generate plan without storing
    return generateWeeklyPlan(userLevel, settings, getWeekStart(new Date()));
  }
};

/**
 * Get start of week (Monday)
 */
const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
};

/**
 * Generate today's workout from the weekly plan
 * This ensures the daily workout ALWAYS matches the weekly preview
 */
export const generateDailyWorkout = async (userLevel, settings) => {
  try {
    const weeklyPlan = await getWeeklyPlan(userLevel, settings);
    const today = new Date();

    // Find today's workout in the weekly plan
    const todayWorkout = weeklyPlan.find(day => {
      const dayDate = new Date(day.date);
      return (
        dayDate.getDate() === today.getDate() &&
        dayDate.getMonth() === today.getMonth() &&
        dayDate.getFullYear() === today.getFullYear()
      );
    });

    if (!todayWorkout) {
      // Shouldn't happen, but fallback
      return generateFallbackWorkout(userLevel, settings);
    }

    // Return today's workout with a unique ID
    return {
      id: `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      ...todayWorkout,
      completed: false,
      completedExercises: 0
    };
  } catch (error) {
    console.error('Error generating daily workout:', error);
    return generateFallbackWorkout(userLevel, settings);
  }
};

/**
 * Fallback workout generator (shouldn't normally be needed)
 */
const generateFallbackWorkout = (userLevel, settings) => {
  const exercises = selectExercisesForDay('push', userLevel, []);
  const workoutType = determineWorkoutType('push', userLevel);

  const exercisesWithReps = exercises.map(exercise => ({
    id: exercise.id,
    name: exercise.name,
    category: exercise.category,
    reps: calculateRepsForExercise(exercise, userLevel, workoutType),
    completed: false,
    description: exercise.description,
    instructions: exercise.instructions,
    muscleGroups: exercise.muscleGroups,
    equipment: exercise.equipment
  }));

  return {
    id: `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toISOString(),
    exercises: exercisesWithReps,
    workoutType,
    estimatedDuration: settings?.workoutDuration || 10,
    level: userLevel,
    completed: false,
    completedExercises: 0,
    focus: 'push'
  };
};

/**
 * Check if workout is for today
 */
export const isWorkoutForToday = (workout) => {
  if (!workout || !workout.date) return false;

  const workoutDate = new Date(workout.date);
  const today = new Date();

  return (
    workoutDate.getDate() === today.getDate() &&
    workoutDate.getMonth() === today.getMonth() &&
    workoutDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Replace an exercise in workout
 */
export const replaceExercise = (workout, exerciseIndex, userLevel) => {
  const currentExercise = workout.exercises[exerciseIndex];
  const usedExerciseIds = workout.exercises.map(ex => ex.id);

  // Get exercises from same focus area
  const availableExercises = selectExercisesForDay(workout.focus || 'push', userLevel, usedExerciseIds);

  if (availableExercises.length === 0) {
    return workout; // No replacement available
  }

  // Pick a random replacement
  const replacementExercise = availableExercises[Math.floor(Math.random() * availableExercises.length)];
  const adjustedReps = calculateRepsForExercise(replacementExercise, userLevel, workout.workoutType);

  // Create new workout with replaced exercise
  const newExercises = [...workout.exercises];
  newExercises[exerciseIndex] = {
    id: replacementExercise.id,
    name: replacementExercise.name,
    category: replacementExercise.category,
    reps: adjustedReps,
    completed: false,
    description: replacementExercise.description,
    instructions: replacementExercise.instructions,
    muscleGroups: replacementExercise.muscleGroups,
    equipment: replacementExercise.equipment
  };

  return {
    ...workout,
    exercises: newExercises
  };
};

/**
 * Toggle exercise completion
 */
export const toggleExerciseCompletion = (workout, exerciseIndex) => {
  const newExercises = [...workout.exercises];
  newExercises[exerciseIndex] = {
    ...newExercises[exerciseIndex],
    completed: !newExercises[exerciseIndex].completed
  };

  const completedCount = newExercises.filter(ex => ex.completed).length;

  return {
    ...workout,
    exercises: newExercises,
    completedExercises: completedCount,
    completed: completedCount === newExercises.length
  };
};

/**
 * Force regenerate weekly plan (useful for settings changes)
 */
export const regenerateWeeklyPlan = async () => {
  await AsyncStorage.removeItem(WEEKLY_PLAN_KEY);
  await AsyncStorage.removeItem(PLAN_GENERATION_DATE_KEY);
};

export default {
  generateDailyWorkout,
  getWeeklyPlan,
  isWorkoutForToday,
  replaceExercise,
  toggleExerciseCompletion,
  regenerateWeeklyPlan
};
