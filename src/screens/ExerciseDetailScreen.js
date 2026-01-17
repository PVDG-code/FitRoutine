import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import ExerciseImage from '../components/ExerciseImage';

const ExerciseDetailScreen = ({ route, navigation }) => {
  const { exercise, exerciseIndex, onToggle, onReplace } = route.params;

  const handleToggleComplete = () => {
    if (onToggle) {
      onToggle(exerciseIndex);
    }
    navigation.goBack();
  };

  const handleReplace = () => {
    if (onReplace) {
      onReplace(exerciseIndex);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Exercise Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{exercise.name}</Text>
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{exercise.category.toUpperCase()}</Text>
            </View>
            {exercise.completed && (
              <View style={[styles.tag, styles.completedTag]}>
                <Text style={styles.completedTagText}>COMPLETED</Text>
              </View>
            )}
          </View>
        </View>

        {/* Reps/Duration */}
        <View style={styles.repsContainer}>
          <Text style={styles.repsLabel}>Target:</Text>
          <Text style={styles.repsValue}>{exercise.reps} reps</Text>
        </View>

        {/* Equipment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment Needed</Text>
          <View style={styles.equipmentContainer}>
            {exercise.equipment.map((item, index) => (
              <View key={index} style={styles.equipmentTag}>
                <Text style={styles.equipmentText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Muscle Groups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Muscle Groups</Text>
          <View style={styles.muscleContainer}>
            {exercise.muscleGroups.map((muscle, index) => (
              <View key={index} style={styles.muscleTag}>
                <Text style={styles.muscleText}>{muscle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{exercise.description}</Text>
        </View>

        {/* Exercise Visual */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercise Demo</Text>
          <ExerciseImage exerciseId={exercise.id} exerciseName={exercise.name} />
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Perform</Text>
          {exercise.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <View style={styles.tipsBox}>
            <Text style={styles.tipsTitle}>Pro Tips</Text>
            <Text style={styles.tipsText}>
              • Focus on proper form over speed{'\n'}
              • Breathe steadily throughout the movement{'\n'}
              • Stop if you feel any sharp pain{'\n'}
              • Take breaks between sets if needed
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.replaceButton}
          onPress={handleReplace}
        >
          <Text style={styles.replaceButtonText}>Replace Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.completeButton,
            exercise.completed && styles.completeButtonDone
          ]}
          onPress={handleToggleComplete}
        >
          <Text style={styles.completeButtonText}>
            {exercise.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 100
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tag: {
    backgroundColor: '#4A90E2',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  completedTag: {
    backgroundColor: '#4CAF50'
  },
  completedTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  repsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  repsLabel: {
    fontSize: 18,
    color: '#666',
    marginRight: 10
  },
  repsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2'
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
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  equipmentTag: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  equipmentText: {
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize'
  },
  muscleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  muscleTag: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  muscleText: {
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize'
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8
  },
  imagePlaceholder: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderStyle: 'dashed'
  },
  imagePlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 8,
    textAlign: 'center'
  },
  imagePlaceholderSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center'
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2
  },
  instructionNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22
  },
  tipsBox: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107'
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8
  },
  tipsText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 22
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  replaceButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2'
  },
  replaceButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600'
  },
  completeButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center'
  },
  completeButtonDone: {
    backgroundColor: '#4CAF50'
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default ExerciseDetailScreen;
