import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// Define a functional component named UserProfileForm
const UserProfileForm = () => {
  // States to store user's information
  const [name, setName] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');

  // Function to handle name input changes
  const handleNameChange = (text) => {
    setName(text);
  };

  // Function to handle bio input changes
  const handleInput2Change = (text) => {
    setInput2(text);
  };

  // Function to handle description input changes
  const handleInput3Change = (text) => {
    setInput3(text);
  };

  // Function to handle input4 changes
  const handleInput4Change = (text) => {
    setInput4(text);
  };

  // Function to handle input5 changes
  const handleInput5Change = (text) => {
    setInput5(text);
  };

  // Function to handle input6 changes
  const handleInput6Change = (text) => {
    setInput6(text);
  };

  // Function to handle button press
  const handleButtonPress = () => {
    // Validate if all fields are entered
    if (
      name.trim() === '' ||
      input2.trim() === '' ||
      input3.trim() === '' ||
      input4.trim() === '' ||
      input5.trim() === '' ||
      input6.trim() === ''
    ) {
      Alert.alert('Error', 'Please enter all fields.');
    } else {
      // Do something with the entered information
      Alert.alert(
        'Event Created',
        `Name: ${name}\nLocation: ${input2}\nDate: ${input3}\nTime: ${input4}\nDescription: ${input5}\nExternal Links: ${input6}`
      );
    }
  };


  return (
    
    <View style={styles.container}>
      <Text style={styles.heading}>Create an event</Text>


      {/* Name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={handleNameChange}
        value={name}
        multiline={true}
      />
      {/* TextInput for bio input */}
      <TextInput
        style={styles.input}
        placeholder="Location"
        onChangeText={handleInput2Change}
        value={input2}
        multiline={true}
      />
      {/* TextInput for description input */}
      <TextInput
        style={styles.input}
        placeholder="Date"
        onChangeText={handleInput3Change}
        value={input3}
        multiline={true}
      />
      {/* Additional TextInput boxes */}
      <TextInput
        style={styles.input}
        placeholder="Time"
        onChangeText={handleInput4Change}
        value={input4}
        multiline={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={handleInput5Change}
        value={input5}
        multiline={true}
      />
      <TextInput
        style={styles.input}
        placeholder="External links"
        onChangeText={handleInput6Change}
        value={input6}
        multiline={true}
      />
     {/* Button to trigger an action with the entered information */}
     <Button title="Submit" onPress={handleButtonPress} />
      
      
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 25,
    marginBottom: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 2,
    marginTop: 20,
    padding: 8,
    width: '100%',
  },
});

// Export the UserProfileForm component
export default UserProfileForm;