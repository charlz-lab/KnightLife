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
} from "react-native";

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

  useEffect(() => {
    navigation.setParams({ profile });
  }, [profile]);

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
            navigation.navigate("Profile", profile);
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
  let [profile, setProfile] = useState(defaultProfile);

  let [isUpcoming, setState] = useState(true);

  // useEffect(() => {
  //   navigation.setParams({ profile });
  // }, [profile]);

  // if (profile !== route.params) {
  //   setProfile(route.params);
  // }
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
        {/* Upcoming / attended tabs */}
        <Pressable
          onPress={() => {
            setState(true);
          }}
        >
          <Text>Upcoming</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setState(false);
          }}
        >
          <Text>Attended</Text>
        </Pressable>
        {/* display upcoming or attended events */}
        {isUpcoming ? (
          <>
            <Text>Upcoming events</Text>
          </>
        ) : (
          <>
            <Text>Attended Events</Text>
          </>
        )}
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
