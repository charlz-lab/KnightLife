// EditAccount.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import appStyles from '../../styles';

const EditAccount = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveChanges = () => {
    console.log('New Username:', newUsername);
    console.log('New Email:', newEmail);
    console.log('New Password:', newPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={appStyles.fonts.heading}>Edit Account</Text>
      <TextInput
        style={[appStyles.textInput, appStyles.shawdowInput, styles.margin]}
        placeholder="New Username"
        placeholderTextColor="gray"
        value={newUsername}
        onChangeText={(text) => setNewUsername(text)}
      />
      <TextInput
        style={[appStyles.textInput, appStyles.shawdowInput, styles.margin]}
        placeholder="New Email"
        placeholderTextColor="gray"
        value={newEmail}
        onChangeText={(text) => setNewEmail(text)}
      />
      <TextInput
        style={[appStyles.textInput, appStyles.shawdowInput, styles.margin]}
        placeholder ="New Password"
        placeholderTextColor="gray"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TouchableOpacity style={appStyles.buttons.yellow} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
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
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontFamily: "IBMPlexSans-Medium",
    fontSize: 15,
  },
});

export default EditAccount;
