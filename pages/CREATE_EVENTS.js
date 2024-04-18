import React, { useState, createRef, useEffect } from "react";
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
  Image,
} from "react-native";
import appStyles from "../styles";
import Modal from "react-native-modal";
import supabase from "../lib/supabase";
import * as ImagePicker from "expo-image-picker";
import LocationDropdown from "../components/LocationDropdown";
import DateTime from "../components/DateTime";

const CREATE_EVENTS = ({ size = 150 }) => {
  const [eventName, setEventName] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [eventLocation, setEventLocation] = useState("");
  const [eventRoomNumber, setEventRoomNumber] = useState("");
  const [eventDateTime, setDateTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [signUp, setSignUp] = useState("");
  const locationInputRef = createRef();
  const buildingInputRef = createRef();
  const dateInputRef = createRef();
  const descriptionInputRef = createRef();
  const [uploading, setUploading] = useState(false)
  const [eventUrl, setEventUrl] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmitPress = async () => {
    // Check if all fields are filled out

    if (!eventName || !eventLocation || !eventDateTime || !eventDescription) {
      Alert.alert("Please fill out all fields");
      return;
    }
    let newImageUrl = null;
    if (selectedImage && selectedImage.uri) {
      const arraybuffer = await fetch(selectedImage.uri).then((res) => res.arrayBuffer());
      const fileExt = selectedImage.uri.split('.').pop().toLowerCase();
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('event-image-banners')
        .upload(path, arraybuffer, {
          contentType: selectedImage.mimeType ?? 'image/jpeg',
        });

      if (uploadError) {
        Alert.alert("Error uploading image");
        return;
      }
      //set newImageUrl 
      newImageUrl = `https://dtfxsobdxejzzasfiiwe.supabase.co/storage/v1/object/public/event-image-banners/${data.path}`;
    }
    // Get user ID from the logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("eventUrl", newImageUrl)
    // add event to database
    supabase
      .from("events")
      .insert({
        name: eventName,
        date: new Date(eventDateTime),
        location: eventLocation,
        room_number: eventRoomNumber,
        description: eventDescription,
        creator_id: user.id, // This would be the logged in user's ID
        link: signUp,
        image: newImageUrl, // image url from storage
      })
      .then((data, error) => {
        console.log(data, error);
        if (error) {
          Alert.alert("Error creating event");
          return;
        } else {
          // For simplicity, just show an alert
          // Eventually, we would want to navigate to the event details page of the newly created event
          setModalVisible(true);

          // Clear input fields after successful event creation
          setEventName("");
          setEventRoomNumber("");
          setEventDescription("");
          setSignUp("");
          setEventLocation("");
          setEventUrl(null);
        }
      });
  };

  //image upload


  //select image 
  const selectEventImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 1,
      exif: false,
    });
    console.log(result);
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0]);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ height: 1100 }}
    >
      <KeyboardAvoidingView enabled>
        <Text style={[appStyles.fonts.heading, { marginTop: 16 }]}>
          Create an Event
        </Text>
        <View style={{ flexDirection: "column", rowGap: 30 }}>
          <TouchableOpacity
            style={styles.imageBanner}
            //selects image but does not input to supabase
            onPress={selectEventImage}
            disabled={uploading}

          >
            {selectedImage === null ? (
              <Text
                style={[
                  appStyles.fonts.paragraph,
                  {
                    textAlign: "center",
                    color: "#8b9cb5",
                  },
                ]}
              >
                Add Image Banner
              </Text>
            ) : (
              //show selected image
              <Image source={selectedImage} style={styles.imageUpload} />
            )}
          </TouchableOpacity>
          <View style={appStyles.sectionStyle}>
            <TextInput
              style={[appStyles.textInput, appStyles.fonts.paragraph]}
              onChangeText={(text) => setEventName(text)}
              placeholder="Event Title"
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
          <LocationDropdown
            onLocationSelect={setEventLocation}
          ></LocationDropdown>
          <View style={appStyles.sectionStyle}>
            <TextInput
              style={[appStyles.textInput, appStyles.fonts.paragraph]}
              onChangeText={(text) => setEventRoomNumber(text)}
              placeholder="Building & Room Number (Optional)"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="words"
              returnKeyType="next"
              ref={buildingInputRef}
              onSubmitEditing={() =>
                dateInputRef.current && dateInputRef.current.focus()
              }
              blurOnSubmit={false}
              value={eventRoomNumber}
            />
          </View>
          <DateTime onDateTimeSelect={setDateTime}></DateTime>
          <View style={appStyles.sectionStyle}>
            <TextInput
              style={[appStyles.textInput, appStyles.fonts.paragraph]}
              onChangeText={(text) => setEventDescription(text)}
              placeholder="Description"
              placeholderTextColor="#8b9cb5"
              returnKeyType="done"
              value={eventDescription}
            />
          </View>
          <View style={appStyles.sectionStyle}>
            <TextInput
              style={[appStyles.textInput, appStyles.fonts.paragraph]}
              onChangeText={(text) => setSignUp(text)}
              placeholder="External Sign-Up Link (Optional)"
              placeholderTextColor="#8b9cb5"
              returnKeyType="done"
              value={signUp}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={[appStyles.buttons.yellowLogin, { alignSelf: "center" }]}
            activeOpacity={0.5}
            onPress={handleSubmitPress}
          >
            <Text
              style={[
                appStyles.fonts.paragraph,
                { color: "black", paddingVertical: 10 },
              ]}
            >
              Create Event
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalAlert}>Event has been created!</Text>
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
    </ScrollView>
  );
};

export default CREATE_EVENTS;

const styles = StyleSheet.create({
  mainBody: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    alignContent: "flex-start",
    height: "100%",
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
    marginLeft: 10,
    marginRight: 10,
  },
  modalOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
    marginTop: 30,
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
  imageBanner: {
    marginTop: 20,
    width: "80%",
    height: "25%",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 30,
    borderColor: "#dadae8",
    borderWidth: 1,
    justifyContent: "center",
  },
  imageUpload: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
});
