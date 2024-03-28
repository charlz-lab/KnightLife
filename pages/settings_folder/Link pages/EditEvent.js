import React, { useState } from "react";
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

const EditEvents = ({ route, navigation }) => {
  const { event, onEventUpdate } = route.params;
  const [image, setImage] = useState(null);

  const [updatedEventDetails, setUpdatedEventDetails] = useState({
    name: event.name,
    location: event.location,
    buildingRoomNum: event.buildingRoomNum,
    dateTime: event.dateTime,
    description: event.description,
  });

  const handleChange = (field, value) => {
    setUpdatedEventDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const saveAlert = () =>
    Alert.alert(
      "Save Changes",
      "Are you sure you would like to save your changes?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Save",
          onPress: () => {
            const updatedEvent = {
              ...event,
              name: updatedEventDetails.name,
              location: updatedEventDetails.location,
              buildingRoomNum: event.buildingRoomNum,
              dateTime: updatedEventDetails.dateTime,
              description: updatedEventDetails.description,
            };

            onEventUpdate(updatedEvent);
            navigation.goBack();
          },
        },
      ]
    );

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
      aspect: [0, 0],
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
            <Image source={image} style={styles.imageUpload} />
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
            value={updatedEventDetails.name}
            onChangeText={(value) => handleChange("name", value)}
            style={[appStyles.fonts.paragraph, appStyles.textInput]}
            placeholder="Event Name"
            placeholderTextColor={"black"}
          />
        </View>

        <Text style={appStyles.fonts.subHeading}>Location:</Text>
        <LocationDropdown></LocationDropdown>
        <Text style={appStyles.fonts.subHeading}>Building & Room Number:</Text>
        <View style={appStyles.sectionStyle}>
          <TextInput
            value={updatedEventDetails.buildingRoomNum}
            onChangeText={(value) => handleChange("buildingRoomNum", value)}
            style={[appStyles.fonts.paragraph, appStyles.textInput]}
            placeholder="Building & Room Number"
            placeholderTextColor={"black"}
          />
        </View>

        <Text style={appStyles.fonts.subHeading}>Date and Time:</Text>
        <View style={appStyles.sectionStyle}>
          <TextInput
            value={updatedEventDetails.dateTime}
            onChangeText={(value) => handleChange("dateTime", value)}
            style={[appStyles.fonts.paragraph, appStyles.textInput]}
            placeholder="Date & Time"
            placeholderTextColor={"black"}
          />
        </View>

        <Text style={appStyles.fonts.subHeading}>Description:</Text>
        <View style={appStyles.sectionStyle}>
          <TextInput
            value={updatedEventDetails.description}
            onChangeText={(value) => handleChange("description", value)}
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
            onPress={saveAlert}
          >
            <Text style={appStyles.fonts.paragraph}>Save</Text>
          </Pressable>
          <Pressable
            style={[appStyles.buttons.black, appStyles.shadow]}
            onPress={() => navigation.goBack()}
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
