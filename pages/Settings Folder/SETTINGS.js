import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Settings = ({ navigation }) => {
  const navigateToPage = (page) => {
    navigation.navigate(page);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.buttonContainer}>
        <Button title="Privacy" onPress={() => navigateToPage('Privacy')} />
        <Button title="Add/Switch Accounts" onPress={() => navigateToPage('AddSwitchAccounts')} />
        <Button title="Accessibility" onPress={() => navigateToPage('Accessibility')} />
        <Button title="Edit Account" onPress={() => navigateToPage('EditAccount')} />
      </View>
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
  buttonContainer: {
    marginTop: 16,
  },
});

export default Settings;
