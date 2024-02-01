// Accessibility.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import appStyles from '../../styles';

const Accessibility = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    console.log('Dark Mode:', isDarkMode);
  };

  return (
    <View style={styles.container}>
      <Text style={appStyles.fonts.heading}>Accessibility Screen</Text>
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
    flexDirection: 'colum',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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

