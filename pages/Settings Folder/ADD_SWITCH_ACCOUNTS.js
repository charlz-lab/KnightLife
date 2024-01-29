// AddSwitchAccounts.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddSwitchAccounts = ({ navigation }) => {
  const [activeAccount, setActiveAccount] = useState(1);
  const [accountCount, setAccountCount] = useState(2);

  const switchAccount = (index) => {
    setActiveAccount(index);
  };

  const navigateToCreateAccount = () => {
    navigation.navigate('CreateAccount');
    // Increment account count when navigating to create account
    setAccountCount(accountCount + 1);
    // Set the newly created account as active
    setActiveAccount(accountCount + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add/Switch Accounts</Text>
      <View style={styles.accountContainer}>
        {[...Array(accountCount)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.accountButton,
              { backgroundColor: activeAccount === index + 1 ? '#3498db' : '#95a5a6' },
            ]}
            onPress={() => switchAccount(index + 1)}
          >
            <Text style={styles.buttonText}>Account {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={navigateToCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  accountContainer: {
    flexDirection: 'row',
  },
  accountButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 10,
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#2ecc71', // Add Account button color
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddSwitchAccounts;
