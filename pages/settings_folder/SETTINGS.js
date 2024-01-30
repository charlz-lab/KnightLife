// SettingsScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Privacy from './PRIVACY';

const Settings = () => {
  const navigation = useNavigation();

  const navigateToPrivacy = () => {
    navigation.navigate('Privacy');
  };

  const navigateToAddSwitchAccounts = () => {
    navigation.navigate('AddSwitchAccounts');
  };

  const navigateToAccessibility = () => {
    navigation.navigate('Accessibility');
  };

  const navigateToEditAccount = () => {
    navigation.navigate('EditAccount');
  };

  return (
    <View>
      <Text>Settings Screen</Text>
      <Button title="Privacy" onPress={navigateToPrivacy} />
      <Button title="Add/Switch Accounts" onPress={navigateToAddSwitchAccounts} />
      <Button title="Accessibility" onPress={navigateToAccessibility} />
      <Button title="Edit Account" onPress={navigateToEditAccount} />
    </View>
  );
};

export default Settings;
