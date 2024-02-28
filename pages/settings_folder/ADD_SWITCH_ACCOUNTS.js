// AddSwitchAccounts.js
import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import appStyles from '../../styles';

const AddSwitchAccounts = ({ navigation }) => {
  const [activeAccount, setActiveAccount] = useState(1);
  const [accountCount, setAccountCount] = useState(2);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '', // Remove the title from the header
      headerTintColor: '#000', 
    });
  }, [navigation]);

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
      <Text style={appStyles.fonts.heading}>Add/Switch Accounts</Text>

        {[...Array(accountCount)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              appStyles.profileCard, appStyles.shawdowInput,
              { backgroundColor: activeAccount === index + 1 ? '#FFC60A' : '#E2E2E2' },
            ]}
            onPress={() => switchAccount(index + 1)}
          >
            <Text style={styles.buttonText1}>Account {index + 1}</Text>
          </TouchableOpacity>
        ))}

      <TouchableOpacity style={appStyles.buttons.buttonClick} onPress={navigateToCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'top',
    padding: 16,
    flex: 1, 
  },
  accountContainer: {
    flexDirection: 'row',
    alignContent: 'left'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddSwitchAccounts;
