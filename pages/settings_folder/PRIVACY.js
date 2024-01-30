import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Privacy = () => {
  const [isPublic, setIsPublic] = useState(false);

  const togglePrivacy = () => {
    setIsPublic((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Account Privacy:</Text>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          {
            backgroundColor: isPublic ? '#2ecc71' : '#f1c40f',
            borderColor: isPublic ? '#27ae60' : '#d4ac0d',
          },
        ]}
        onPress={togglePrivacy}
      >
        <Text style={[styles.buttonText, { color: isPublic ? '#fff' : '#333' }]}>
          {isPublic ? 'Public' : 'Private'}
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.privacyText}>
        Your account is set to {isPublic ? 'public' : 'private'}.{'\n'}
        {isPublic ? 'Anyone can see your profile.' : 'Only approved followers can see your profile.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'colum',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  label: {
    fontSize: 16,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  privacyText: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Privacy;
