import React, { useState, createRef } from "react"
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Text,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native"
import appStyles from "../styles"
import Modal from "react-native-modal";
import supabase from "../lib/supabase"

const CREATE_EVENTS = () => {
  const [eventName, setEventName] = useState("")
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [eventLocation, setEventLocation] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const locationInputRef = createRef()
  const dateInputRef = createRef()
  const timeInputRef = createRef()
  const descriptionInputRef = createRef()
  const handleSubmitPress = () => {
    // Check if all fields are filled out
    if (
      !eventName ||
      !eventLocation ||
      !eventDate ||
      !eventTime ||
      !eventDescription
    ) {
      Alert.alert("Please fill out all fields")
      return
    }

    // Perform any other necessary validation before creating the event

    // Add the event to the database
    supabase
      .from("events")
      .insert({
        name: eventName,
        date: new Date(eventDate + " " + eventTime),
        location: eventLocation,
        description: eventDescription,
        creator_id: "ef1e9b2b-53f6-4342-a77c-e1c74b2f627a", // This would be the logged in user's ID
      })
      .then((data, error) => {
        console.log(data, error)
        if (error) {
          Alert.alert("Error creating event")
          return
        } else {
          // For simplicity, just show an alert
          // Eventually, we would want to navigate to the event details page of the newly created event
         setModalVisible(true)

          // Clear input fields after successful event creation
          setEventName("")
          setEventLocation("")
          setEventDate("")
          setEventTime("")
          setEventDescription("")
        }
      })
  }
  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          marginTop: 16,
          justifyContent: "flex-start",
          alignContent: "flex-center",
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <Text style={[appStyles.fonts.heading]}>Create an Event</Text>
            <View style={[styles.SectionStyle, appStyles.shadowInput]}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setEventName(text)}
                placeholder="Event Name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() =>
                  locationInputRef.current && locationInputRef.current.focus()
                }
                blurOnSubmit={false}
                value={eventName}
              />
            </View>
            <View style={[styles.SectionStyle, appStyles.shadowInput]}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setEventLocation(text)}
                placeholder="Event Location"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="words"
                returnKeyType="next"
                ref={locationInputRef}
                onSubmitEditing={() =>
                  dateInputRef.current && dateInputRef.current.focus()
                }
                blurOnSubmit={false}
                value={eventLocation}
              />
            </View>
            <View style={[styles.SectionStyle, appStyles.shadowInput]}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setEventDate(text)}
                placeholder="Event Date"
                placeholderTextColor="#8b9cb5"
                returnKeyType="next"
                ref={dateInputRef}
                onSubmitEditing={() =>
                  timeInputRef.current && timeInputRef.current.focus()
                }
                blurOnSubmit={false}
                value={eventDate}
              />
            </View>
            <View style={[styles.SectionStyle, appStyles.shadowInput]}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setEventTime(text)}
                placeholder="Event Time"
                placeholderTextColor="#8b9cb5"
                returnKeyType="next"
                ref={timeInputRef}
                onSubmitEditing={() =>
                  descriptionInputRef.current &&
                  descriptionInputRef.current.focus()
                }
                blurOnSubmit={false}
                value={eventTime}
              />
            </View>
            <View style={[styles.SectionStyle, appStyles.shadowInput]}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setEventDescription(text)}
                placeholder="Event Description"
                placeholderTextColor="#8b9cb5"
                returnKeyType="done"
                value={eventDescription}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>CREATE EVENT</Text>
              </TouchableOpacity>
            </View>
            <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalAlert}>
            Event has been created!
          </Text>
          <View style={styles.modalOptionsContainer}>
            <TouchableOpacity
              onPress={toggleModal}
              style={[styles.modalOption, styles.modalOption1]}
            >
              <Text style={styles.modalOptionText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  )
}

export default CREATE_EVENTS

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    alignContent: "flex-start",
  },
  SectionStyle: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center", // Center horizontally
    height: 60,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#FFC60A",
    borderWidth: 0,
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 12,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#000",
    fontFamily: "IBMPlexSans-Medium",
    fontSize: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#dadae8",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    paddingrRight: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "IBMPlexSans-Medium",
    fontSize: 20,
  },
  modalAlert: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: "center",
    marginTop: 30,
    textAlign: "center",
    fontSize: 20,
    marginLeft:10,
    marginRight:10,
  },
  modalOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
    marginTop:30,
  },
  modalOption: {
    flex: 1,
    padding: 8,
    marginHorizontal: 55,
    width: 10,
    padding: 8,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
  },
  modalOptionText: {
    color: "#fff", //
  },

  modalOption1: {
    backgroundColor: "#080808",
    paddingTop: 10,
  },
})
