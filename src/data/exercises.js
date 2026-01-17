// Comprehensive exercise database for calisthenics
// Each exercise has difficulty levels: beginner, intermediate, advanced

export const EXERCISES = {
  // PUSH EXERCISES
  wall_pushups: {
    id: 'wall_pushups',
    name: 'Wall Push-ups',
    category: 'push',
    difficulty: 'beginner',
    equipment: ['mat'],
    muscleGroups: ['chest', 'arms', 'shoulders'],
    description: 'Stand arm\'s length from a wall, place hands on wall at shoulder height. Lean in by bending elbows, then push back.',
    instructions: [
      'Stand about 2 feet from a wall',
      'Place hands on wall at shoulder width',
      'Keep body straight from head to heels',
      'Bend elbows to lean toward wall',
      'Push back to starting position'
    ],
    defaultReps: 10,
    progressionTo: 'incline_pushups'
  },
  incline_pushups: {
    id: 'incline_pushups',
    name: 'Incline Push-ups',
    category: 'push',
    difficulty: 'beginner',
    equipment: ['mat'],
    muscleGroups: ['chest', 'arms', 'shoulders'],
    description: 'Push-ups with hands elevated on a sturdy surface (couch, chair). Easier than regular push-ups.',
    instructions: [
      'Place hands on elevated surface shoulder-width apart',
      'Step back until body is straight',
      'Lower chest toward surface',
      'Push back up to start',
      'Keep core tight throughout'
    ],
    defaultReps: 8,
    progressionTo: 'knee_pushups'
  },
  knee_pushups: {
    id: 'knee_pushups',
    name: 'Knee Push-ups',
    category: 'push',
    difficulty: 'beginner',
    equipment: ['mat'],
    muscleGroups: ['chest', 'arms', 'shoulders'],
    description: 'Push-ups performed on knees instead of toes, reducing the weight you need to push.',
    instructions: [
      'Start on hands and knees on mat',
      'Hands shoulder-width apart',
      'Keep back straight from knees to head',
      'Lower chest to ground',
      'Push back up'
    ],
    defaultReps: 10,
    progressionTo: 'regular_pushups'
  },
  regular_pushups: {
    id: 'regular_pushups',
    name: 'Push-ups',
    category: 'push',
    difficulty: 'intermediate',
    equipment: ['mat'],
    muscleGroups: ['chest', 'arms', 'shoulders', 'core'],
    description: 'Classic push-up with body straight, lowering chest to ground and pushing back up.',
    instructions: [
      'Start in plank position',
      'Hands slightly wider than shoulders',
      'Lower body until chest nearly touches ground',
      'Keep elbows at 45-degree angle',
      'Push back up to start'
    ],
    defaultReps: 8,
    progressionTo: 'diamond_pushups'
  },

  // PULL EXERCISES (USING RESISTANCE BAND)
  band_rows: {
    id: 'band_rows',
    name: 'Resistance Band Rows',
    category: 'pull',
    difficulty: 'beginner',
    equipment: ['band', 'mat'],
    muscleGroups: ['back', 'biceps'],
    description: 'Sit with legs extended, loop band around feet, pull band toward torso.',
    instructions: [
      'Sit on mat with legs extended',
      'Loop band around feet',
      'Hold band ends with arms extended',
      'Pull elbows back, squeezing shoulder blades',
      'Return to start with control'
    ],
    defaultReps: 12,
    progressionTo: 'band_rows_single'
  },
  band_rows_single: {
    id: 'band_rows_single',
    name: 'Single-Arm Band Rows',
    category: 'pull',
    difficulty: 'intermediate',
    equipment: ['band', 'mat'],
    muscleGroups: ['back', 'biceps', 'core'],
    description: 'Single-arm variation of band rows for increased difficulty and core engagement.',
    instructions: [
      'Sit on mat with legs extended',
      'Loop band around one foot',
      'Hold band with opposite hand',
      'Pull elbow back while keeping torso stable',
      'Alternate arms'
    ],
    defaultReps: 10,
    progressionTo: 'band_rows'
  },

  // LEG EXERCISES
  squats: {
    id: 'squats',
    name: 'Bodyweight Squats',
    category: 'legs',
    difficulty: 'beginner',
    equipment: ['mat'],
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    description: 'Stand with feet shoulder-width apart, lower hips back and down, then return to standing.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Toes slightly pointed out',
      'Lower hips back and down',
      'Keep chest up and knees tracking over toes',
      'Rise back to start'
    ],
    defaultReps: 12,
    progressionTo: 'jump_squats'
  },
  jump_squats: {
    id: 'jump_squats',
    name: 'Jump Squats',
    category: 'legs',
    difficulty: 'intermediate',
    equipment: ['mat'],
    muscleGroups: ['quads', 'glutes', 'hamstrings', 'calves'],
    description: 'Explosive squat variation where you jump at the top of the movement.',
    instructions: [
      'Start in squat position',
      'Lower into squat',
      'Explosively jump up',
      'Land softly and immediately lower into next squat',
      'Use arms for momentum'
    ],
    defaultReps: 8,
    progressionTo: 'squats'
  },
  lunges: {
    id: 'lunges',
    name: 'Forward Lunges',
    category: 'legs',
    difficulty: 'beginner',
    equipment: ['mat'],
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    description: 'Step forward into lunge position, alternating legs.',
    instructions: [
      'Stand with feet hip-width apart',
      'Step forward with one leg',
      'Lower hips until both knees at 90 degrees',
      'Push back to start',
      'Alternate legs'
    ],
    defaultReps: 10,
    progressionTo: 'reverse_lunges'
  },
  reverse_lunges: {
    id: 'reverse_lunges',
    name: 'Reverse Lunges',
    category: 'legs',
    difficulty: 'beginner',
    equipment: ['mat'],
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    description: 'Step backward into lunge position, easier on knees than forward lunges.',
    instructions: [
      'Stand with feet hip-width apart',
      'Step backward with one leg',
      'Lower hips until front knee at 90 degrees',
      'Push through front heel to return',
      'Alternate legs'
    ],
    defaultReps: 10,
    progressionTo: 'walking_lunges'
  },
  glute_bridge: {
    id: 'glute_bridge',
    name: 'Glute Bridges',
    category: 'legs',
    difficulty: 'beginner',
    equipment: ['mat'],
    muscleGroups: ['glutes', 'hamstrings', 'core'],
    description: 'Lie on back, knees bent, lift hips toward ceiling, squeezing glutes.',
    instructions: [
      'Lie on back with knees bent',
      'Feet flat on floor hip-width apart',
      'Lift hips toward ceiling',
      'Squeeze glutes at top',
      'Lower with control'
    ],
    defaultReps: 15,
    progressionTo: 'single_leg_bridge'
  },

  // CORE EXERCISES
  dead_bug: {
    id: 'dead_bug',
    name: 'Dead Bug',
    category: 'core',
    difficulty: 'beginner',
    equipment: ['mat'],
    muscleGroups: ['core', 'abs'],
    description: 'Lie on back, extend opposite arm and leg while keeping lower back pressed to floor.',
    instructions: [
      'Lie on back with arms extended up',
      'Knees bent at 90 degrees',
      'Slowly extend opposite arm and leg',
      'Return to start',
      'Alternate sides'
    ],
    defaultReps: 10,
    progressionTo: 'bicycle_crunches'
  },
  plank: {
    id: 'plank',
    name: 'Forearm Plank',
    category: 'core',
    difficulty: 'beginner',
    equipment: ['mat'],
    muscleGroups: ['core', 'abs', 'shoulders'],
    description: 'Hold body in straight line on forearms and toes, engaging core.',
    instructions: [
      'Start on forearms and toes',
      'Elbows under shoulders',
      'Body straight from head to heels',
      'Engage core and glutes',
      'Hold position without sagging'
    ],
    defaultReps: '30 seconds',
    progressionTo: 'plank_shoulder_taps'
  },
  plank_shoulder_taps: {
    id: 'plank_shoulder_taps',
    name: 'Plank Shoulder Taps',
    category: 'core',
    difficulty: 'intermediate',
    equipment: ['mat'],
    muscleGroups: ['core', 'abs', 'shoulders'],
    description: 'Hold high plank position while alternating tapping opposite shoulder.',
    instructions: [
      'Start in high plank (hands not forearms)',
      'Keep body stable',
      'Lift one hand to tap opposite shoulder',
      'Return hand to floor',
      'Alternate sides without rotating hips'
    ],
    defaultReps: 12,
    progressionTo: 'plank'
  },
  bicycle_crunches: {
    id: 'bicycle_crunches',
    name: 'Bicycle Crunches',
    category: 'core',
    difficulty: 'beginner',
    equipment: ['mat'],
    muscleGroups: ['core', 'abs', 'obliques'],
    description: 'Alternate bringing opposite elbow to knee in a cycling motion.',
    instructions: [
      'Lie on back with hands behind head',
      'Lift shoulders off ground',
      'Bring one knee in while extending other leg',
      'Rotate torso to bring opposite elbow to knee',
      'Alternate sides in cycling motion'
    ],
    defaultReps: 15,
    progressionTo: 'bicycle_crunches'
  },
  mountain_climbers: {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    category: 'core',
    difficulty: 'intermediate',
    equipment: ['mat'],
    muscleGroups: ['core', 'abs', 'shoulders', 'cardio'],
    description: 'From plank position, alternate driving knees toward chest in running motion.',
    instructions: [
      'Start in high plank position',
      'Drive one knee toward chest',
      'Quickly switch legs',
      'Keep hips level',
      'Maintain quick pace'
    ],
    defaultReps: 20,
    progressionTo: 'mountain_climbers'
  },

  // BAND EXERCISES
  band_chest_press: {
    id: 'band_chest_press',
    name: 'Band Chest Press',
    category: 'push',
    difficulty: 'beginner',
    equipment: ['band', 'mat'],
    muscleGroups: ['chest', 'arms', 'shoulders'],
    description: 'Anchor band behind you, press forward from chest level.',
    instructions: [
      'Anchor band at chest height behind you',
      'Hold band ends at chest level',
      'Step forward for tension',
      'Press arms forward',
      'Return to start with control'
    ],
    defaultReps: 12,
    progressionTo: 'band_chest_press'
  },
  band_bicep_curls: {
    id: 'band_bicep_curls',
    name: 'Band Bicep Curls',
    category: 'pull',
    difficulty: 'beginner',
    equipment: ['band', 'mat'],
    muscleGroups: ['biceps', 'arms'],
    description: 'Stand on band, curl handles toward shoulders.',
    instructions: [
      'Stand on middle of band',
      'Hold ends with arms extended',
      'Keep elbows at sides',
      'Curl hands toward shoulders',
      'Lower with control'
    ],
    defaultReps: 12,
    progressionTo: 'band_bicep_curls'
  },
  band_shoulder_press: {
    id: 'band_shoulder_press',
    name: 'Band Shoulder Press',
    category: 'push',
    difficulty: 'beginner',
    equipment: ['band', 'mat'],
    muscleGroups: ['shoulders', 'arms'],
    description: 'Stand on band, press handles overhead.',
    instructions: [
      'Stand on middle of band',
      'Hold ends at shoulder height',
      'Press hands overhead',
      'Keep core tight',
      'Lower to shoulders'
    ],
    defaultReps: 10,
    progressionTo: 'band_shoulder_press'
  },
  band_leg_extensions: {
    id: 'band_leg_extensions',
    name: 'Band Leg Extensions',
    category: 'legs',
    difficulty: 'beginner',
    equipment: ['band', 'mat'],
    muscleGroups: ['quads', 'glutes'],
    description: 'Loop band around one ankle, extend leg forward against resistance.',
    instructions: [
      'Loop band around ankle',
      'Stand on other end or anchor it',
      'Extend banded leg forward',
      'Keep knee straight',
      'Return with control'
    ],
    defaultReps: 12,
    progressionTo: 'band_leg_extensions'
  },

  // ADDITIONAL ARM EXERCISES - TRICEPS
  band_tricep_extensions: {
    id: 'band_tricep_extensions',
    name: 'Band Tricep Extensions',
    category: 'push',
    difficulty: 'beginner',
    equipment: ['band', 'mat'],
    muscleGroups: ['triceps', 'arms'],
    description: 'Stand on band, extend arms overhead to work triceps.',
    instructions: [
      'Stand on middle of band',
      'Hold ends behind your head',
      'Elbows pointing up',
      'Extend arms overhead',
      'Lower back down with control'
    ],
    defaultReps: 12,
    progressionTo: 'band_overhead_extensions'
  },
  band_overhead_extensions: {
    id: 'band_overhead_extensions',
    name: 'Band Overhead Extensions',
    category: 'push',
    difficulty: 'intermediate',
    equipment: ['band', 'mat'],
    muscleGroups: ['triceps', 'arms', 'shoulders'],
    description: 'Single-arm overhead tricep extension for increased difficulty.',
    instructions: [
      'Stand on band with one foot',
      'Hold band with one hand behind head',
      'Extend arm straight up',
      'Keep elbow stationary',
      'Alternate arms'
    ],
    defaultReps: 10,
    progressionTo: 'diamond_pushups'
  },
  band_kickbacks: {
    id: 'band_kickbacks',
    name: 'Band Tricep Kickbacks',
    category: 'push',
    difficulty: 'beginner',
    equipment: ['band', 'mat'],
    muscleGroups: ['triceps', 'arms'],
    description: 'Hinge forward, extend arm back to isolate triceps.',
    instructions: [
      'Stand on band, hinge forward at hips',
      'Hold band with elbows bent',
      'Extend arm straight back',
      'Squeeze triceps at full extension',
      'Return to start'
    ],
    defaultReps: 12,
    progressionTo: 'band_overhead_extensions'
  },
  diamond_pushups: {
    id: 'diamond_pushups',
    name: 'Diamond Push-ups',
    category: 'push',
    difficulty: 'advanced',
    equipment: ['mat'],
    muscleGroups: ['triceps', 'chest', 'arms'],
    description: 'Push-ups with hands close together forming a diamond shape.',
    instructions: [
      'Start in plank position',
      'Place hands close together, thumbs and index fingers touching',
      'Form diamond shape with hands',
      'Lower chest toward hands',
      'Push back up'
    ],
    defaultReps: 6,
    progressionTo: 'diamond_pushups'
  },
  bench_dips: {
    id: 'bench_dips',
    name: 'Bench Dips',
    category: 'push',
    difficulty: 'intermediate',
    equipment: ['mat'],
    muscleGroups: ['triceps', 'chest', 'shoulders'],
    description: 'Use a bench or chair to perform dips for triceps.',
    instructions: [
      'Sit on edge of bench, hands next to hips',
      'Slide hips off bench, legs extended',
      'Lower body by bending elbows',
      'Keep elbows close to body',
      'Push back up'
    ],
    defaultReps: 10,
    progressionTo: 'diamond_pushups'
  },

  // ADDITIONAL ARM EXERCISES - BICEPS
  band_hammer_curls: {
    id: 'band_hammer_curls',
    name: 'Band Hammer Curls',
    category: 'pull',
    difficulty: 'beginner',
    equipment: ['band', 'mat'],
    muscleGroups: ['biceps', 'forearms', 'arms'],
    description: 'Hammer grip curl targeting biceps and forearms.',
    instructions: [
      'Stand on middle of band',
      'Hold ends with palms facing each other',
      'Keep elbows at sides',
      'Curl hands toward shoulders',
      'Lower with control'
    ],
    defaultReps: 12,
    progressionTo: 'band_concentration_curls'
  },
  band_concentration_curls: {
    id: 'band_concentration_curls',
    name: 'Band Concentration Curls',
    category: 'pull',
    difficulty: 'intermediate',
    equipment: ['band', 'mat'],
    muscleGroups: ['biceps', 'arms'],
    description: 'Isolated bicep curl for maximum contraction.',
    instructions: [
      'Sit on mat, place band under one foot',
      'Hold band with same side hand',
      'Rest elbow on inner thigh',
      'Curl toward shoulder',
      'Squeeze at top'
    ],
    defaultReps: 10,
    progressionTo: 'band_21s'
  },
  band_21s: {
    id: 'band_21s',
    name: 'Band 21s (Bicep Burner)',
    category: 'pull',
    difficulty: 'advanced',
    equipment: ['band', 'mat'],
    muscleGroups: ['biceps', 'arms'],
    description: 'Advanced bicep technique: 7 bottom-half, 7 top-half, 7 full reps.',
    instructions: [
      'Stand on band, hold ends',
      'Do 7 curls from bottom to halfway up',
      'Do 7 curls from halfway to top',
      'Do 7 full range curls',
      'Thats one set of 21 total reps'
    ],
    defaultReps: 21,
    progressionTo: 'band_21s'
  },

  // ADDITIONAL CHEST EXERCISES
  band_chest_fly: {
    id: 'band_chest_fly',
    name: 'Band Chest Fly',
    category: 'push',
    difficulty: 'intermediate',
    equipment: ['band', 'mat'],
    muscleGroups: ['chest', 'pecs', 'shoulders'],
    description: 'Fly motion to isolate chest muscles.',
    instructions: [
      'Anchor band behind you at chest height',
      'Hold ends with arms extended to sides',
      'Keep slight bend in elbows',
      'Bring hands together in front of chest',
      'Squeeze pecs, return to start'
    ],
    defaultReps: 12,
    progressionTo: 'band_decline_press'
  },
  band_decline_press: {
    id: 'band_decline_press',
    name: 'Band Decline Press',
    category: 'push',
    difficulty: 'intermediate',
    equipment: ['band', 'mat'],
    muscleGroups: ['chest', 'pecs', 'triceps'],
    description: 'Press at downward angle to target lower pecs.',
    instructions: [
      'Anchor band high behind you',
      'Hold ends at upper chest',
      'Step forward into lunge',
      'Press down and forward',
      'Control return to chest'
    ],
    defaultReps: 10,
    progressionTo: 'decline_pushups'
  },
  decline_pushups: {
    id: 'decline_pushups',
    name: 'Decline Push-ups',
    category: 'push',
    difficulty: 'advanced',
    equipment: ['mat'],
    muscleGroups: ['chest', 'pecs', 'shoulders', 'triceps'],
    description: 'Feet elevated push-ups for upper chest and shoulders.',
    instructions: [
      'Place feet on elevated surface',
      'Hands on ground shoulder-width apart',
      'Body straight from head to heels',
      'Lower chest to ground',
      'Push back up'
    ],
    defaultReps: 8,
    progressionTo: 'archer_pushups'
  },
  archer_pushups: {
    id: 'archer_pushups',
    name: 'Archer Push-ups',
    category: 'push',
    difficulty: 'advanced',
    equipment: ['mat'],
    muscleGroups: ['chest', 'pecs', 'triceps', 'shoulders'],
    description: 'One-arm push-up progression, shifting weight side to side.',
    instructions: [
      'Start in wide push-up position',
      'Lower body while shifting to one side',
      'Opposite arm extends straight',
      'Push back up through working arm',
      'Alternate sides'
    ],
    defaultReps: 6,
    progressionTo: 'archer_pushups'
  },
  pike_pushups: {
    id: 'pike_pushups',
    name: 'Pike Push-ups',
    category: 'push',
    difficulty: 'intermediate',
    equipment: ['mat'],
    muscleGroups: ['shoulders', 'triceps', 'chest'],
    description: 'Push-up variation targeting shoulders more than chest.',
    instructions: [
      'Start in downward dog position (pike)',
      'Hands shoulder-width apart',
      'Bend elbows to lower head toward ground',
      'Push back up',
      'Keep hips high throughout'
    ],
    defaultReps: 8,
    progressionTo: 'decline_pushups'
  },

  // ADDITIONAL BACK EXERCISES
  band_wide_rows: {
    id: 'band_wide_rows',
    name: 'Band Wide Rows',
    category: 'pull',
    difficulty: 'intermediate',
    equipment: ['band', 'mat'],
    muscleGroups: ['back', 'lats', 'rear delts'],
    description: 'Wide grip row to target upper back and lats.',
    instructions: [
      'Loop band around feet while seated',
      'Hold band with wide grip',
      'Pull elbows out wide to sides',
      'Squeeze shoulder blades together',
      'Return to start'
    ],
    defaultReps: 12,
    progressionTo: 'band_face_pulls'
  },
  band_face_pulls: {
    id: 'band_face_pulls',
    name: 'Band Face Pulls',
    category: 'pull',
    difficulty: 'intermediate',
    equipment: ['band', 'mat'],
    muscleGroups: ['back', 'rear delts', 'traps'],
    description: 'Pull band to face level for upper back and rear deltoids.',
    instructions: [
      'Anchor band at face height',
      'Hold ends with arms extended',
      'Pull band toward face',
      'Elbows high and wide',
      'Squeeze shoulder blades'
    ],
    defaultReps: 15,
    progressionTo: 'band_pull_downs'
  },
  band_pull_downs: {
    id: 'band_pull_downs',
    name: 'Band Lat Pull-downs',
    category: 'pull',
    difficulty: 'intermediate',
    equipment: ['band', 'mat'],
    muscleGroups: ['back', 'lats', 'biceps'],
    description: 'Mimic lat pulldown machine using resistance band.',
    instructions: [
      'Anchor band high above you',
      'Kneel or stand holding band',
      'Pull band down to chest',
      'Keep chest up, core tight',
      'Control return to top'
    ],
    defaultReps: 12,
    progressionTo: 'inverted_rows'
  },
  band_straight_arm_pulldown: {
    id: 'band_straight_arm_pulldown',
    name: 'Band Straight-Arm Pulldown',
    category: 'pull',
    difficulty: 'intermediate',
    equipment: ['band', 'mat'],
    muscleGroups: ['lats', 'back', 'core'],
    description: 'Isolate lats with straight-arm pulling motion.',
    instructions: [
      'Anchor band high above',
      'Hold band with arms straight',
      'Pull down to thighs keeping arms straight',
      'Squeeze lats at bottom',
      'Return to top with control'
    ],
    defaultReps: 12,
    progressionTo: 'band_pull_downs'
  },
  inverted_rows: {
    id: 'inverted_rows',
    name: 'Inverted Rows (Table/Bar)',
    category: 'pull',
    difficulty: 'intermediate',
    equipment: ['mat'],
    muscleGroups: ['back', 'lats', 'biceps', 'core'],
    description: 'Horizontal pulling exercise using table or bar.',
    instructions: [
      'Lie under sturdy table or bar',
      'Grab edge with overhand grip',
      'Keep body straight',
      'Pull chest to table/bar',
      'Lower with control'
    ],
    defaultReps: 8,
    progressionTo: 'inverted_rows'
  },

  // LOWER BACK EXERCISES
  supermans: {
    id: 'supermans',
    name: 'Superman Holds',
    category: 'pull',
    difficulty: 'beginner',
    equipment: ['mat'],
    muscleGroups: ['lower back', 'glutes', 'back'],
    description: 'Lie face down, lift arms and legs simultaneously.',
    instructions: [
      'Lie face down on mat',
      'Extend arms forward',
      'Simultaneously lift arms, chest, and legs',
      'Hold for 2 seconds',
      'Lower back down'
    ],
    defaultReps: 12,
    progressionTo: 'reverse_hyperextensions'
  },
  band_good_mornings: {
    id: 'band_good_mornings',
    name: 'Band Good Mornings',
    category: 'pull',
    difficulty: 'intermediate',
    equipment: ['band', 'mat'],
    muscleGroups: ['lower back', 'hamstrings', 'glutes'],
    description: 'Hip hinge movement with band for lower back strength.',
    instructions: [
      'Stand on band, hold ends at shoulders',
      'Feet hip-width apart',
      'Hinge at hips, push butt back',
      'Keep back straight',
      'Return to standing'
    ],
    defaultReps: 12,
    progressionTo: 'reverse_hyperextensions'
  },
  reverse_hyperextensions: {
    id: 'reverse_hyperextensions',
    name: 'Reverse Hyperextensions',
    category: 'pull',
    difficulty: 'intermediate',
    equipment: ['mat'],
    muscleGroups: ['lower back', 'glutes', 'hamstrings'],
    description: 'Lie face down, lift legs to strengthen lower back.',
    instructions: [
      'Lie face down on mat',
      'Arms extended forward or under chin',
      'Lift both legs off ground',
      'Squeeze glutes and lower back',
      'Lower legs with control'
    ],
    defaultReps: 12,
    progressionTo: 'reverse_hyperextensions'
  }
};

// Exercise categories for variety
export const CATEGORIES = {
  push: ['wall_pushups', 'incline_pushups', 'knee_pushups', 'regular_pushups', 'diamond_pushups', 'decline_pushups', 'archer_pushups', 'pike_pushups', 'bench_dips', 'band_chest_press', 'band_chest_fly', 'band_decline_press', 'band_shoulder_press', 'band_tricep_extensions', 'band_overhead_extensions', 'band_kickbacks'],
  pull: ['band_rows', 'band_rows_single', 'band_wide_rows', 'band_face_pulls', 'band_pull_downs', 'band_straight_arm_pulldown', 'inverted_rows', 'band_bicep_curls', 'band_hammer_curls', 'band_concentration_curls', 'band_21s', 'supermans', 'band_good_mornings', 'reverse_hyperextensions'],
  legs: ['squats', 'jump_squats', 'lunges', 'reverse_lunges', 'glute_bridge', 'band_leg_extensions'],
  core: ['dead_bug', 'plank', 'plank_shoulder_taps', 'bicycle_crunches', 'mountain_climbers']
};

// Exercise categories by muscle group
export const EXERCISE_CATEGORIES = {
  chest: ['wall_pushups', 'incline_pushups', 'knee_pushups', 'regular_pushups', 'diamond_pushups', 'decline_pushups', 'archer_pushups', 'pike_pushups', 'band_chest_press', 'band_chest_fly', 'band_decline_press'],
  triceps: ['diamond_pushups', 'bench_dips', 'band_tricep_extensions', 'band_overhead_extensions', 'band_kickbacks', 'pike_pushups'],
  biceps: ['band_bicep_curls', 'band_hammer_curls', 'band_concentration_curls', 'band_21s'],
  back: ['band_rows', 'band_rows_single', 'band_wide_rows', 'band_face_pulls', 'band_pull_downs', 'band_straight_arm_pulldown', 'inverted_rows'],
  lower_back: ['supermans', 'band_good_mornings', 'reverse_hyperextensions'],
  shoulders: ['band_shoulder_press', 'pike_pushups', 'band_face_pulls'],
  legs: ['squats', 'jump_squats', 'lunges', 'reverse_lunges', 'glute_bridge', 'band_leg_extensions'],
  core: ['dead_bug', 'plank', 'plank_shoulder_taps', 'bicycle_crunches', 'mountain_climbers']
};

// Beginner-friendly exercises for starting out
export const BEGINNER_EXERCISES = [
  'wall_pushups',
  'incline_pushups',
  'knee_pushups',
  'band_rows',
  'band_tricep_extensions',
  'band_bicep_curls',
  'band_hammer_curls',
  'squats',
  'lunges',
  'reverse_lunges',
  'glute_bridge',
  'dead_bug',
  'plank',
  'bicycle_crunches',
  'band_chest_press',
  'band_chest_fly',
  'band_shoulder_press',
  'band_leg_extensions',
  'supermans',
  'band_kickbacks'
];
