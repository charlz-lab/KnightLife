import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Privacy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Privacy </Text>
      <Text>Privacy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Privacy;
