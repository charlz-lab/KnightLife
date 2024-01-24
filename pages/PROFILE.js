import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import EventCard from "../components/EventCard";
import DropDownPicker from "react-native-dropdown-picker";
import events from "../components/EventList";

// jane doe's profile
let defaultProfile = {
  name: "Jane Doe",
  username: "@janedoe",
  location: "UCF Downtown, Orlando",
  year: "Senior",
  major: "Marine Biology",
};

// edit profile page
export const EDIT_PROFILE = ({ navigation, route }) => {
  let [profile, setProfile] = useState(route.params);

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
            navigation.navigate("Profile", { profile: profile });
            navigation.navigate("Profile", { profile: profile });
          },
        },
      ]
    );
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/janeDoeProfile.png")}
        style={{ width: 100, height: 100 }}
      />
      <Text>Profile Name:</Text>
      <TextInput
        value={profile.name}
        onChangeText={(value) => setProfile({ ...profile, name: value })}
      />
      <Text>Username:</Text>
      <TextInput
        value={profile.username}
        onChangeText={(value) => setProfile({ ...profile, username: value })}
      />
      <Text>Campus Location:</Text>
      <TextInput
        value={profile.location}
        onChangeText={(value) => setProfile({ ...profile, location: value })}
      />
      <Text>Year:</Text>
      <TextInput
        value={profile.year}
        onChangeText={(value) => setProfile({ ...profile, year: value })}
      />
      <Text>Major:</Text>
      <TextInput
        value={profile.major}
        onChangeText={(value) => setProfile({ ...profile, major: value })}
      />
      <Pressable onPress={saveAlert}>
        <Text>Save</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
};

// profile
const PROFILE = ({ navigation, route }) => {
  const [profile, setProfile] = useState(route.params || defaultProfile);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("upcoming");
  const [items, setItems] = useState([
    { label: "Upcoming", value: "upcoming" },
    { label: "Attended", value: "attended" },
    { label: "Saved", value: "saved" },
  ]);

  useEffect(() => {
    if (route.params?.profile) {
      setProfile(route.params.profile);
    }
  }, [route.params?.profile]);

  useEffect(() => {
    if (route.params?.profile) {
      setProfile(route.params.profile);
    }
  }, [route.params?.profile]);

  return (
    <>
      <View style={styles.container}>
        {/* Profile info */}
        <Image
          source={require("../images/janeDoeProfile.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text>{profile.name}</Text>
        <Text>{profile.username}</Text>
        <Text>{profile.location}</Text>
        <Text>
          {profile.year} - {profile.major}
        </Text>
        {/* Upcoming / attended / saved dropdown*/}
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={{ width: 200 }}
        />
        {/* display events based on dropdown */}
        {value === "upcoming" ? (
          <Text>Upcoming Events</Text>
        ) : value === "attended" ? (
          <Text>Attended Events</Text>
        ) : (
          <Text>Saved Events</Text>
        )}
        {/* display event cards */}
        <FlatList
          data={events}
          renderItem={({ item }) => {
            return <EventCard info={item} />;
          }}
          keyExtractor={(event) => event.id.toString()}
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 20 }}
        />
        {/* navigate to edit profile */}
        <Pressable onPress={() => navigation.navigate("EDIT_PROFILE", profile)}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default PROFILE;
