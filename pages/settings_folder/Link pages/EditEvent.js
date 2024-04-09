import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import appStyles from "../../../styles";
import * as ImagePicker from "expo-image-picker";
import LocationDropdown from "../../../components/LocationDropdown";
import supabase from "../../../lib/supabase";

const EditEvents = ({ route, navigation }) => {
  const { event } = route.params;
  const [name, setName] = useState(event.name);
  const [location, setLocation] = useState(event.location);
  const [description, setDescription] = useState(event.description);
  const [roomNumber, setRoomNumber] = useState(event.room_number);
  const [date, setDate] = useState(event.date);
  const [image, setImage] = useState(event.image);
  // Add more state variables as needed for other event properties

  useEffect(() => {
    // Fetch the event data when the component mounts
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    // Fetch the event data from Supabase
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', event.id)
      .single();

    if (data) {
      setName(data.name);
      setLocation(data.location);
      setDescription(data.description);
      setRoomNumber(data.room_number);
      setDate(data.date);
      setImage(data.image);
      // Update other state variables as needed
    } else {
      console.error(error);
    }
  };
  const handleSave = async () => {
    console.log('Updating event...');

    // Update the event in the Supabase table
    const { data, error } = await supabase
      .from('events')
      .update({
        name,
        location,
        description,
        date,
        room_number: roomNumber,
        image
      })
      .eq('id', event.id);
    console.log('Update operation completed.');

    navigation.navigate("EventPage", { event })
  };

  // handle image upload
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (pickerResult.canceled === true) {
      return;
    }

    setImage({ uri: pickerResult.assets[0].uri });
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 500, backgroundColor: "white" }}
    >
      <View style={styles.container}>
        <View style={styles.imageBanner}>
          {image === null ? (
            <Text
              style={[
                appStyles.fonts.paragraph,
                {
                  textAlign: "center",
                  color: "#8b9cb5",
                },
              ]}
            >
              No image uploaded
            </Text>
          ) : (
            <Image source={{ uri: image }} style={styles.imageUpload} />
          )}
        </View>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Text
            style={[
              appStyles.fonts.paragraph,
              { textDecorationLine: "underline" },
            ]}
          >
            Click to upload image
          </Text>
        </TouchableOpacity>
        <Text style={appStyles.fonts.subHeading}>Name:</Text>
        <View style={appStyles.sectionStyle}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={[appStyles.fonts.paragraph, appStyles.textInput]}
            placeholder="Event Name"
            placeholderTextColor={"black"}
          />
        </View>

        <Text style={appStyles.fonts.subHeading}>Location:</Text>
        <LocationDropdown onLocationSelect={(selectedLocation) => setLocation(selectedLocation)} />
        <Text style={appStyles.fonts.subHeading}>Building & Room Number:</Text>
        <View style={appStyles.sectionStyle}>
          <TextInput
            value={roomNumber}
            onChangeText={setRoomNumber}
            style={[appStyles.fonts.paragraph, appStyles.textInput]}
            placeholder="Building & Room Number"
            placeholderTextColor={"black"}
          />
        </View>

        <Text style={appStyles.fonts.subHeading}>Date and Time:</Text>
        <View style={appStyles.sectionStyle}>
          <TextInput
            value={date}
            onChangeText={setDate}
            style={[appStyles.fonts.paragraph, appStyles.textInput]}
            placeholder="Date & Time"
            placeholderTextColor={"black"}
          />
        </View>

        <Text style={appStyles.fonts.subHeading}>Description:</Text>
        <View style={appStyles.sectionStyle}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={[appStyles.fonts.paragraph, appStyles.textInput]}
            multiline
            placeholder="Description"
            placeholderTextColor={"black"}
          />
        </View>

        {/* Button to update the event and close the screen */}
        <View style={{ flexDirection: "row", columnGap: 5, marginTop: 20 }}>
          <Pressable
            style={[appStyles.buttons.yellow, appStyles.shadow]}
            onPress={handleSave}
          >
            <Text style={appStyles.fonts.paragraph}>Save</Text>
          </Pressable>
          <Pressable
            style={[appStyles.buttons.black, appStyles.shadow]}
            onPress={() => navigation.goBack(updatedEvent)}
          >
            <Text style={[{ color: "white" }, appStyles.fonts.paragraph]}>
              {" "}
              Cancel{" "}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    rowGap: 20,
    backgroundColor: appStyles.colors.background,
    alignItems: "center",
    paddingTop: 20,
  },
  imageBanner: {
    marginTop: 20,
    width: "80%%",
    height: "25%",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 30,
    borderColor: "#dadae8",
    borderWidth: 1,
    justifyContent: "center",
  },
  imageUpload: {
    width: "100%%",
    height: "100%",
    borderRadius: 30,
  },
});

export default EditEvents;
