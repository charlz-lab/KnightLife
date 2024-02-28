import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appStyles from '../../styles';
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

  const navigateToLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={appStyles.fonts.heading}>Settings Screen</Text>
      <TouchableOpacity style={[appStyles.profileCard, appStyles.shawdowInput]} onPress={navigateToPrivacy}>
        <Text>Privacy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[appStyles.profileCard, appStyles.shawdowInput]} onPress={navigateToAddSwitchAccounts}>
        <Text>Add/Switch Accounts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[appStyles.profileCard, appStyles.shawdowInput]} onPress={navigateToAccessibility}>
        <Text>Accessibility</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[appStyles.profileCard, appStyles.shawdowInput]} onPress={navigateToEditAccount}>
        <Text>Edit Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[appStyles.buttons.yellow]} onPress={navigateToLoginScreen}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flexDirection: 'colum',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
});

export default Settings;


