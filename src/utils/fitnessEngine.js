// Advanced Fitness Prediction Engine
// Based on research from calisthenics programming science
// Focus: Arms, Pecs (chest), Lower Back
// Follows push-pull principles with proper recovery

import { EXERCISES, EXERCISE_CATEGORIES } from '../data/exercises';

// Training focus areas (customizable per user)
export const TRAINING_FOCUS = {
  arms: 0.35,      // 35% - biceps, triceps
  chest: 0.35,     // 35% - pecs
  back: 0.25,      // 25% - lower back, lats
  core: 0.05       // 5% - minimal core work
};

// Muscle group recovery times (in days)
const RECOVERY_PERIODS = {
  push: 2,    // Chest, triceps, shoulders
  pull: 2,    // Back, biceps
  legs: 3,    // Legs (minimal in this program)
  core: 1     // Core (quick recovery)
};

// Exercise pairing rules (antagonistic muscle groups)
const PAIRING_RULES = {
  push: ['pull', 'core'],      // Push can be paired with pull or core
  pull: ['push', 'legs'],      // Pull can be paired with push or legs
  legs: ['pull', 'core'],      // Legs can be paired with pull or core
  core: ['push', 'pull']       // Core can be paired with anything
};

// Progressive overload: exercises organized by difficulty
const PROGRESSION_CHAINS = {
  // Chest progressions
  chest: [
    ['wall_pushups', 'incline_pushups', 'knee_pushups', 'regular_pushups', 'diamond_pushups', 'decline_pushups', 'archer_pushups'],
    ['band_chest_press', 'band_chest_fly', 'band_decline_press']
  ],

  // Back progressions
  back: [
    ['band_rows', 'band_rows_single', 'band_wide_rows', 'band_face_pulls'],
    ['inverted_rows', 'band_pull_downs', 'band_straight_arm_pulldown']
  ],

  // Biceps progressions
  biceps: [
    ['band_bicep_curls', 'band_hammer_curls', 'band_concentration_curls', 'band_21s']
  ],

  // Triceps progressions
  triceps: [
    ['band_tricep_extensions', 'band_overhead_extensions', 'band_kickbacks', 'diamond_pushups'],
    ['bench_dips', 'pike_pushups']
  ],

  // Lower back progressions
  lower_back: [
    ['supermans', 'band_good_mornings', 'reverse_hyperextensions']
  ]
};

/**
 * Generate a weekly training plan based on push-pull principles
 * Ensures proper recovery and progressive overload
 */
export const generateWeeklyPlan = (userLevel, settings, startDate = new Date()) => {
  const restDays = settings?.restDays || [];
  const weeklyPlan = [];

  // Training pattern: Push-Pull-Core rotation with rest days
  const trainingPattern = ['push', 'pull', 'push', 'pull', 'arms', 'back'];

  let patternIndex = 0;

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dayOfWeek = date.getDay();

    // Check if it's a rest day
    if (restDays.includes(dayOfWeek)) {
      weeklyPlan.push({
        date: date.toISOString(),
        dayIndex: i,
        isRestDay: true,
        focus: null
      });
      continue;
    }

    // Assign training focus for this day
    const focus = trainingPattern[patternIndex % trainingPattern.length];
    weeklyPlan.push({
      date: date.toISOString(),
      dayIndex: i,
      isRestDay: false,
      focus: focus
    });

    patternIndex++;
  }

  return weeklyPlan;
};

/**
 * Select exercises for a specific training day
 * Based on focus area and progressive overload principles
 */
export const selectExercisesForDay = (focus, userLevel, weekHistory = []) => {
  const exercises = [];

  // Define exercise selection based on focus
  const selectionStrategy = {
    push: {
      primary: 'chest',      // Primary: chest exercise
      secondary: 'triceps',  // Secondary: triceps
      tertiary: 'core'       // Tertiary: light core
    },
    pull: {
      primary: 'back',
      secondary: 'biceps',
      tertiary: 'lower_back'
    },
    arms: {
      primary: 'biceps',
      secondary: 'triceps',
      tertiary: 'chest'      // Light push
    },
    back: {
      primary: 'back',
      secondary: 'lower_back',
      tertiary: 'core'
    },
    core: {
      primary: 'core',
      secondary: 'lower_back',
      tertiary: 'chest'
    }
  };

  const strategy = selectionStrategy[focus] || selectionStrategy.push;

  // Select primary exercise (hardest, most important)
  const primaryExercise = selectExerciseFromMuscleGroup(
    strategy.primary,
    userLevel,
    'high',
    weekHistory
  );
  if (primaryExercise) exercises.push(primaryExercise);

  // Select secondary exercise (moderate difficulty)
  const secondaryExercise = selectExerciseFromMuscleGroup(
    strategy.secondary,
    userLevel,
    'medium',
    weekHistory
  );
  if (secondaryExercise) exercises.push(secondaryExercise);

  // Select tertiary exercise (lighter, finishing move)
  const tertiaryExercise = selectExerciseFromMuscleGroup(
    strategy.tertiary,
    userLevel,
    'low',
    weekHistory
  );
  if (tertiaryExercise) exercises.push(tertiaryExercise);

  return exercises;
};

/**
 * Select an exercise from a muscle group based on level and intensity
 */
const selectExerciseFromMuscleGroup = (muscleGroup, userLevel, intensity, weekHistory) => {
  // Get progression chain for this muscle group
  const chains = PROGRESSION_CHAINS[muscleGroup];
  if (!chains || chains.length === 0) {
    // Fallback to category-based selection
    return selectFromCategory(muscleGroup, userLevel, weekHistory);
  }

  // Select a progression chain (vary between chains)
  const chainIndex = Math.floor(Math.random() * chains.length);
  const chain = chains[chainIndex];

  // Determine position in chain based on user level
  // Levels 1-3: beginner (first 1/3 of chain)
  // Levels 4-7: intermediate (middle 1/3)
  // Levels 8-10: advanced (last 1/3)
  let positionInChain;
  if (userLevel <= 3) {
    positionInChain = Math.floor(chain.length * 0.2); // Early exercises
  } else if (userLevel <= 7) {
    positionInChain = Math.floor(chain.length * 0.5); // Middle exercises
  } else {
    positionInChain = Math.floor(chain.length * 0.8); // Advanced exercises
  }

  // Adjust based on intensity
  const intensityAdjustment = {
    high: 0,      // Use level-appropriate exercise
    medium: -1,   // Use slightly easier
    low: -2       // Use easier exercise
  };

  positionInChain = Math.max(0, Math.min(
    chain.length - 1,
    positionInChain + (intensityAdjustment[intensity] || 0)
  ));

  const exerciseId = chain[positionInChain];
  const exercise = EXERCISES[exerciseId];

  // Make sure we don't repeat exercises from recent history
  if (weekHistory.includes(exerciseId)) {
    // Try next exercise in chain
    const altPosition = (positionInChain + 1) % chain.length;
    const altExerciseId = chain[altPosition];
    if (!weekHistory.includes(altExerciseId)) {
      return EXERCISES[altExerciseId];
    }
  }

  return exercise;
};

/**
 * Fallback: select from category
 */
const selectFromCategory = (category, userLevel, weekHistory) => {
  const categoryMap = {
    chest: 'push',
    triceps: 'push',
    back: 'pull',
    biceps: 'pull',
    lower_back: 'pull',
    core: 'core',
    legs: 'legs'
  };

  const exerciseCategory = categoryMap[category] || 'push';
  const categoryExercises = Object.values(EXERCISES).filter(ex =>
    ex.category === exerciseCategory &&
    !weekHistory.includes(ex.id)
  );

  if (categoryExercises.length === 0) return null;

  // Filter by difficulty based on level
  let filteredExercises = categoryExercises.filter(ex => {
    if (userLevel <= 3) return ex.difficulty === 'beginner';
    if (userLevel <= 7) return ex.difficulty === 'beginner' || ex.difficulty === 'intermediate';
    return true; // Advanced gets all
  });

  if (filteredExercises.length === 0) filteredExercises = categoryExercises;

  // Random selection from filtered
  return filteredExercises[Math.floor(Math.random() * filteredExercises.length)];
};

/**
 * Determine workout type based on training focus and user level
 */
export const determineWorkoutType = (focus, userLevel) => {
  // Research shows: circuits are great for time-efficient training
  // Single sets allow for heavier loads and progressive overload

  if (userLevel <= 3) {
    // Beginners: mostly single sets to learn form
    return Math.random() < 0.7 ? 'single_sets' : 'circuit';
  } else if (userLevel <= 7) {
    // Intermediate: mix of both
    return Math.random() < 0.5 ? 'single_sets' : 'circuit';
  } else {
    // Advanced: more circuits for efficiency and conditioning
    return Math.random() < 0.6 ? 'circuit' : 'single_sets';
  }
};

/**
 * Calculate appropriate reps based on exercise, level, and workout type
 */
export const calculateRepsForExercise = (exercise, userLevel, workoutType) => {
  const baseReps = exercise.defaultReps;

  // If it's a time-based exercise
  if (typeof baseReps === 'string') {
    const seconds = parseInt(baseReps);
    // Time-based exercises scale more conservatively
    const adjustedSeconds = Math.min(seconds + (userLevel - 1) * 3, 75);
    return `${adjustedSeconds} seconds`;
  }

  // Rep-based exercises
  // Research shows: 15-20 reps max before progression needed
  const levelMultiplier = 1 + (userLevel - 1) * 0.12;
  let adjustedReps = Math.round(baseReps * levelMultiplier);

  // Circuit workouts: slightly lower reps for sustainability
  if (workoutType === 'circuit') {
    adjustedReps = Math.round(adjustedReps * 0.85);
  }

  // Cap at reasonable rep ranges
  adjustedReps = Math.min(adjustedReps, 20);

  return adjustedReps;
};

export default {
  generateWeeklyPlan,
  selectExercisesForDay,
  determineWorkoutType,
  calculateRepsForExercise,
  TRAINING_FOCUS,
  PROGRESSION_CHAINS
};
