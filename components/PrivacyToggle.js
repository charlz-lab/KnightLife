import React, { useState } from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';

const PrivacyToggle = ({ isPrivate, onToggle }) => {
  return (
    <View style={styles.container}>
      <Text>{isPrivate ? 'Private' : 'Public'}</Text>
      <Switch
        value={isPrivate}
        onValueChange={onToggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PrivacyToggle;
