// EditAccount.js
import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, 
StyleSheet, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appStyles from '../../styles';

const EditAccount = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '', // Remove the title from the header
      headerTintColor: '#000', 
    });
  }, [navigation]);

  const handleSaveChanges = () => {
    if (!newUsername || !newEmail || !newPassword) {
      Alert.alert('Please fill out all fields');
      return;
    }

    // Perform any other necessary validation before creating the event

    // For simplicity, just show an alert
    Alert.alert('Account information saved');

    // Clear input fields after successful event creation
    setNewUsername('');
    setNewEmail('');
    setNewPassword('');

  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          marginTop: 16,
          justifyContent: 'flex-start',
          alignContent: 'flex-center',
        }}>
        <KeyboardAvoidingView enabled>
      
      <Text style={appStyles.fonts.heading}>Edit Account</Text>

      <View style={[styles.SectionStyle, appStyles.shawdowInput]}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => setNewUsername(text)}
              placeholder="New Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="words"
              returnKeyType="next"
              blurOnSubmit={false}
              value={newUsername}
            />
          </View>
          <View style={[styles.SectionStyle, appStyles.shawdowInput]}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => setNewEmail(text)}
              placeholder="New Email"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="words"
              returnKeyType="next"
              blurOnSubmit={false}
              value={newEmail}
            />
          </View>
          <View style={[styles.SectionStyle, appStyles.shawdowInput]}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => setNewPassword(text)}
              placeholder="New Password"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="words"
              returnKeyType="next"
              blurOnSubmit={false}
              value={newPassword}
            />
          </View>
      <TouchableOpacity 
      style={styles.buttonStyle} 
      onPress={handleSaveChanges}>
        <Text style={styles.buttonTextStyle}>Save Changes</Text>
      </TouchableOpacity>

      </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignContent: 'flex-start',
  },
  SectionStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center', // Center horizontally
    height: 60,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#FFC60A',
    borderWidth: 0,
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#000',
    fontFamily: "IBMPlexSans-Medium",
      fontSize: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#dadae8',
  },
});

export default EditAccount;
