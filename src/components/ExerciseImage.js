import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Exercise animation component
// Uses simple SVG-style illustrations for now
// You can replace with actual images/GIFs later

const ExerciseImage = ({ exerciseId, exerciseName }) => {
  // Map of exercise IDs to simple visual representations
  const exerciseVisuals = {
    // Push exercises
    wall_pushups: {
      icon: '🧍→🧱',
      color: '#FF6B6B',
      description: 'Stand facing wall, lean in and push'
    },
    incline_pushups: {
      icon: '🧍↗️',
      color: '#FF8787',
      description: 'Hands elevated, body angled'
    },
    knee_pushups: {
      icon: '🧎↕️',
      color: '#FFA5A5',
      description: 'On knees, push up and down'
    },
    regular_pushups: {
      icon: '🏋️↕️',
      color: '#FF6B6B',
      description: 'Full plank position, push up'
    },
    band_chest_press: {
      icon: '💪→',
      color: '#FF8787',
      description: 'Band behind, press forward'
    },

    // Pull exercises
    band_rows: {
      icon: '💪←',
      color: '#4ECDC4',
      description: 'Band around feet, pull to chest'
    },
    band_rows_single: {
      icon: '💪⬅️',
      color: '#45B7AF',
      description: 'Single arm, pull to side'
    },
    band_bicep_curls: {
      icon: '💪⬆️',
      color: '#4ECDC4',
      description: 'Stand on band, curl up'
    },

    // Leg exercises
    squats: {
      icon: '🧍↕️',
      color: '#95E1D3',
      description: 'Lower hips, stand back up'
    },
    jump_squats: {
      icon: '🦵⬆️',
      color: '#7DD3C0',
      description: 'Squat then jump explosively'
    },
    lunges: {
      icon: '🦵→',
      color: '#95E1D3',
      description: 'Step forward, lower hips'
    },
    reverse_lunges: {
      icon: '🦵←',
      color: '#7DD3C0',
      description: 'Step back, lower hips'
    },
    glute_bridge: {
      icon: '🛌⬆️',
      color: '#95E1D3',
      description: 'Lie down, lift hips up'
    },
    band_leg_extensions: {
      icon: '🦵→',
      color: '#7DD3C0',
      description: 'Band on ankle, extend leg'
    },

    // Core exercises
    dead_bug: {
      icon: '🛌↔️',
      color: '#F38181',
      description: 'On back, extend opposite limbs'
    },
    plank: {
      icon: '━━━',
      color: '#F38181',
      description: 'Hold straight body position'
    },
    plank_shoulder_taps: {
      icon: '━👋━',
      color: '#F38181',
      description: 'Plank, tap opposite shoulder'
    },
    bicycle_crunches: {
      icon: '🔄🦵',
      color: '#F38181',
      description: 'Crunch with cycling motion'
    },
    mountain_climbers: {
      icon: '🏃↕️',
      color: '#F38181',
      description: 'Plank, drive knees to chest'
    },
    band_shoulder_press: {
      icon: '💪⬆️',
      color: '#FF8787',
      description: 'Stand on band, press overhead'
    }
  };

  const visual = exerciseVisuals[exerciseId] || {
    icon: '💪',
    color: '#4A90E2',
    description: exerciseName
  };

  return (
    <View style={styles.container}>
      <View style={[styles.visualBox, { backgroundColor: visual.color }]}>
        <Text style={styles.icon}>{visual.icon}</Text>
        <Text style={styles.exerciseName}>{exerciseName}</Text>
        <View style={styles.animationIndicator}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <View style={styles.descriptionBox}>
        <Text style={styles.quickTip}>Quick Tip:</Text>
        <Text style={styles.description}>{visual.description}</Text>
      </View>
      <Text style={styles.photoNote}>
        💡 Watch the movements carefully and follow the instructions below for proper form
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12
  },
  visualBox: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5
  },
  icon: {
    fontSize: 72,
    marginBottom: 16
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16
  },
  animationIndicator: {
    flexDirection: 'row',
    gap: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  descriptionBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginTop: 12
  },
  quickTip: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22
  },
  photoNote: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic'
  }
});

export default ExerciseImage;
