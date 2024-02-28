// Accessibility.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appStyles from '../../styles';

const Accessibility = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '', // Remove the title from the header
      headerTintColor: '#000', 
    });
  }, [navigation]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    console.log('Dark Mode:', isDarkMode);
  };

  return (
    <View style={styles.container}>
      <Text style={[appStyles.fonts.heading, styles.margin]}>Accessibility Screen</Text>
      <TouchableOpacity
        style={[
          styles.darkModeButton,
          {
            backgroundColor: isDarkMode ? '#2c3e50' : '#E2E2E2',
          },
        ]} 
        
        onPress={toggleDarkMode}
        >
        <Text style={[appStyles.fonts.paragraph, { color: isDarkMode ? '#fff' : '#333'}]}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </TouchableOpacity>

      {/* Add other accessibility features/components as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    flex: 1, 
  },
  margin: {
    marginBottom: 15,
  },
  darkModeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2c3e50', // Dark mode button color
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Accessibility;

