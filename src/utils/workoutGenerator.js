import { EXERCISES, CATEGORIES, BEGINNER_EXERCISES } from '../data/exercises';

// Generate a daily workout based on user level and preferences
export const generateDailyWorkout = async (userLevel, settings) => {
  const workoutDuration = settings?.workoutDuration || 10;

  // Determine exercise pool based on user level
  const exercisePool = getExercisePoolForLevel(userLevel);

  // Select 3 exercises ensuring variety across categories
  const selectedExercises = selectVariedExercises(exercisePool, 3);

  // Adjust reps/duration based on level
  const workoutExercises = selectedExercises.map(exerciseId => {
    const exercise = EXERCISES[exerciseId];
    const adjustedReps = calculateRepsForLevel(exercise, userLevel);

    return {
      id: exerciseId,
      name: exercise.name,
      category: exercise.category,
      reps: adjustedReps,
      completed: false,
      description: exercise.description,
      instructions: exercise.instructions,
      muscleGroups: exercise.muscleGroups,
      equipment: exercise.equipment
    };
  });

  // Determine workout structure (circuit vs single sets)
  const workoutType = determineWorkoutType();

  return {
    id: generateWorkoutId(),
    date: new Date().toISOString(),
    exercises: workoutExercises,
    workoutType: workoutType,
    estimatedDuration: workoutDuration,
    level: userLevel,
    completed: false,
    completedExercises: 0
  };
};

// Get appropriate exercises for user level
const getExercisePoolForLevel = (level) => {
  if (level <= 3) {
    // Beginner level - stick to beginner exercises
    return BEGINNER_EXERCISES;
  } else if (level <= 7) {
    // Intermediate - mix of beginner and intermediate
    const beginnerExercises = BEGINNER_EXERCISES;
    const intermediateExercises = Object.keys(EXERCISES).filter(
      id => EXERCISES[id].difficulty === 'intermediate'
    );
    return [...beginnerExercises, ...intermediateExercises];
  } else {
    // Advanced - all exercises
    return Object.keys(EXERCISES);
  }
};

// Select exercises ensuring variety across categories
const selectVariedExercises = (pool, count) => {
  const selected = [];
  const usedCategories = new Set();

  // First, try to get one from each main category
  const priorityCategories = ['push', 'legs', 'core'];

  for (const category of priorityCategories) {
    if (selected.length >= count) break;

    const categoryExercises = pool.filter(
      id => EXERCISES[id].category === category && !selected.includes(id)
    );

    if (categoryExercises.length > 0) {
      const randomExercise = categoryExercises[
        Math.floor(Math.random() * categoryExercises.length)
      ];
      selected.push(randomExercise);
      usedCategories.add(category);
    }
  }

  // Fill remaining slots with random exercises from unused categories
  while (selected.length < count) {
    const availableExercises = pool.filter(
      id => !selected.includes(id)
    );

    if (availableExercises.length === 0) break;

    const randomExercise = availableExercises[
      Math.floor(Math.random() * availableExercises.length)
    ];
    selected.push(randomExercise);
  }

  return selected;
};

// Calculate appropriate reps for exercise based on user level
const calculateRepsForLevel = (exercise, level) => {
  const baseReps = exercise.defaultReps;

  // If it's a time-based exercise (like plank)
  if (typeof baseReps === 'string') {
    const seconds = parseInt(baseReps);
    const adjustedSeconds = Math.min(seconds + (level - 1) * 5, 90); // Cap at 90 seconds
    return `${adjustedSeconds} seconds`;
  }

  // Rep-based exercises
  const levelMultiplier = 1 + (level - 1) * 0.15; // 15% increase per level
  const adjustedReps = Math.round(baseReps * levelMultiplier);

  return adjustedReps;
};

// Determine if workout should be circuit or single sets (mixed approach)
const determineWorkoutType = () => {
  // 60% chance of circuit, 40% single sets for variety
  return Math.random() < 0.6 ? 'circuit' : 'single_sets';
};

// Generate unique workout ID
const generateWorkoutId = () => {
  return `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Check if workout is for today
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

// Replace a specific exercise in workout
export const replaceExercise = (workout, exerciseIndex, userLevel) => {
  const currentExercise = workout.exercises[exerciseIndex];
  const exercisePool = getExercisePoolForLevel(userLevel);

  // Filter out exercises already in the workout
  const usedExerciseIds = workout.exercises.map(ex => ex.id);
  const availableExercises = exercisePool.filter(
    id => !usedExerciseIds.includes(id) && EXERCISES[id].category === currentExercise.category
  );

  if (availableExercises.length === 0) {
    // If no exercises in same category, allow any category
    const anyAvailable = exercisePool.filter(id => !usedExerciseIds.includes(id));
    if (anyAvailable.length === 0) return workout; // No replacement available

    availableExercises.push(...anyAvailable);
  }

  // Select random replacement
  const replacementId = availableExercises[
    Math.floor(Math.random() * availableExercises.length)
  ];

  const replacementExercise = EXERCISES[replacementId];
  const adjustedReps = calculateRepsForLevel(replacementExercise, userLevel);

  // Create new workout with replaced exercise
  const newExercises = [...workout.exercises];
  newExercises[exerciseIndex] = {
    id: replacementId,
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

// Mark exercise as completed
export const markExerciseCompleted = (workout, exerciseIndex) => {
  const newExercises = [...workout.exercises];
  newExercises[exerciseIndex] = {
    ...newExercises[exerciseIndex],
    completed: true
  };

  const completedCount = newExercises.filter(ex => ex.completed).length;

  return {
    ...workout,
    exercises: newExercises,
    completedExercises: completedCount,
    completed: completedCount === newExercises.length
  };
};

// Toggle exercise completion
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

export default {
  generateDailyWorkout,
  isWorkoutForToday,
  replaceExercise,
  markExerciseCompleted,
  toggleExerciseCompletion
};
