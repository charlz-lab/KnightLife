import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import appStyles from "../../../styles";

const EditEvents = ({ route, navigation }) => {
  const { event, onEventUpdate } = route.params;

  const [updatedEventDetails, setUpdatedEventDetails] = useState({
    name: event.name,
    dateTime: event.dateTime,
    location: event.location,
    description: event.description,
  });

  const handleChange = (field, value) => {
    setUpdatedEventDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const saveAlert = () =>
    Alert.alert("Save Changes", "Are you sure you would like to save your changes?", [
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
            dateTime: updatedEventDetails.dateTime,
            location: updatedEventDetails.location,
            description: updatedEventDetails.description,
          };

          onEventUpdate(updatedEvent);
          navigation.goBack();
        },
      },
    ]);

  return (
    <View style={styles.container}>
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
      

<Text style={appStyles.fonts.subHeading}>Location:</Text>
<View style={appStyles.sectionStyle}>
        <TextInput
          value={updatedEventDetails.location}
          onChangeText={(value) => handleChange("location", value)}
          style={[appStyles.fonts.paragraph, appStyles.textInput]}
          placeholder="Location"
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
            onPress={saveAlert}>
            <Text style={appStyles.fonts.paragraph}>Save</Text>
          </Pressable>
          <Pressable
            style={[appStyles.buttons.black, appStyles.shadow]}
            onPress={() => {
              profile.isCreator
                ? navigation.navigate("Creator Profile")
                : navigation.navigate("Personal Profile")
            }}>
            <Text style={[{ color: "white" }, appStyles.fonts.paragraph]}>
              Cancel
            </Text>
          </Pressable>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    rowGap: 45,
    backgroundColor: appStyles.colors.background,
    alignItems: "center",
  },
  profileContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: appStyles.colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
})

export default EditEvents;
