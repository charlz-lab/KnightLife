import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddSwitchAccounts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>add switch accounts</Text>
      <Text>add switch accounts</Text>
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

export default AddSwitchAccounts;
