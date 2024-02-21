// CreateAccount.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appStyles from '../../styles';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    // Handle account creation logic here
    console.log('Created Account:', { username, password });

    // Navigate back to AddSwitchAccounts screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={appStyles.fonts.heading}>Add Account</Text>

      <TextInput
        style={[appStyles.textInput, appStyles.shawdowInput, styles.margin]}
        placeholder="Enter username"
        placeholderTextColor="gray"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={[appStyles.textInput, appStyles.shawdowInput, styles.margin]}
        placeholder="Enter password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={appStyles.buttons.yellow} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    padding: 16,
  },
  margin: {
    marginTop: 15,
    marginBottom: 15,
  },


  createButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#2ecc71', // Create Account button color
  },
  buttonText: {
    color: '#000',
    fontSize: 15,
    fontFamily: "IBMPlexSans-Medium",
  },
});

export default CreateAccount;
