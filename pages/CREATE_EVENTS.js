import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

const CREATE_EVENTS = () => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleSubmitPress = () => {
    // Check if all fields are filled out
    if (!eventName || !eventLocation || !eventDate || !eventTime || !eventDescription) {
      Alert.alert('Please fill out all fields');
      return;
    }

    // Perform any other necessary validation before creating the event

    // For simplicity, just show an alert
    Alert.alert('Event Created');
  };

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <KeyboardAvoidingView enabled>
          <Text style={styles.heading}>Create an Event</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => setEventName(text)}
              placeholder="Event Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="words"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => setEventLocation(text)}
              placeholder="Event Location"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="words"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => setEventDate(text)}
              placeholder="Event Date"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => setEventTime(text)}
              placeholder="Event Time"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => setEventDescription(text)}
              placeholder="Event Description"
              placeholderTextColor="#8b9cb5"
              multiline
              returnKeyType="done"
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitPress}>
            <Text style={styles.buttonTextStyle}>CREATE EVENT</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default CREATE_EVENTS;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#FFC60A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
