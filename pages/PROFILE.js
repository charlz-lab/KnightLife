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
  TouchableOpacity,
  ScrollView,
} from "react-native";
import appStyles from "../styles";
import EventList from "../components/EventList";
import AttendingEventList from "../components/AttendingEventList";
import SavedEventList from "../components/SavedEventList";

// jane doe's profile
let defaultProfile = {
  name: "Jane Doe",
  username: "@janedoe",
  location: "UCF Downtown, Orlando",
  year: "Senior",
  major: "Marine Biology",
  pic: require("../images/janeDoeProfile.png"),
  isCreator: false,
};

// creator profile
let defaultCreator = {
  name: "UCF Chess Club",
  username: "@chessclub",
  location: "UCF Downtown, Orlando",
  bio: "Community for students to keep up with existing chess skills and meet others with similar interests. Beginners welcome!",
  eventsNum: 14,
  followersNum: 1746,
  pic: require("../images/chessClubPic.png"),
  isCreator: true,
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
            profile.isCreator
              ? navigation.navigate("Creator Profile", { profile: profile })
              : navigation.navigate("Personal Profile", { profile: profile });
          },
        },
      ]
    );
  return (
    <>
      <View style={styles.editContainer}>
        <View
          style={{ flexDirection: "column", rowGap: 10, alignItems: "center" }}
        >
          <Image source={profile.pic} style={{ width: 125, height: 125 }} />
          <Text style={appStyles.fonts.paragraph}>Change photo</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "90%",
            alignItems: "center",
            rowGap: 5,
          }}
        >
          <Text style={appStyles.fonts.subHeading}>Profile Name:</Text>
          <TextInput
            value={profile.name}
            onChangeText={(value) => setProfile({ ...profile, name: value })}
            style={[
              appStyles.fonts.paragraph,
              appStyles.textInput,
              appStyles.shadow,
            ]}
          />
          <Text style={appStyles.fonts.subHeading}>Username:</Text>
          <TextInput
            value={profile.username}
            onChangeText={(value) =>
              setProfile({ ...profile, username: value })
            }
            style={[
              appStyles.fonts.paragraph,
              appStyles.textInput,
              appStyles.shadow,
            ]}
          />
          <Text style={appStyles.fonts.subHeading}>Campus Location:</Text>
          <TextInput
            value={profile.location}
            onChangeText={(value) =>
              setProfile({ ...profile, location: value })
            }
            style={[
              appStyles.fonts.paragraph,
              appStyles.textInput,
              appStyles.shadow,
            ]}
          />
          {profile.isCreator ? (
            <>
              <Text style={appStyles.fonts.subHeading}>Bio:</Text>
              <TextInput
                value={profile.bio}
                onChangeText={(value) => setProfile({ ...profile, bio: value })}
                style={[
                  appStyles.fonts.paragraph,
                  appStyles.textInput,
                  appStyles.shadow,
                ]}
              />
            </>
          ) : (
            <>
              <Text style={appStyles.fonts.subHeading}>Year:</Text>
              <TextInput
                value={profile.year}
                onChangeText={(value) =>
                  setProfile({ ...profile, year: value })
                }
                style={[
                  appStyles.fonts.paragraph,
                  appStyles.textInput,
                  appStyles.shadow,
                ]}
              />
              <Text style={appStyles.fonts.subHeading}>Major:</Text>
              <TextInput
                value={profile.major}
                onChangeText={(value) =>
                  setProfile({ ...profile, major: value })
                }
                style={[
                  appStyles.fonts.paragraph,
                  appStyles.textInput,
                  appStyles.shadow,
                ]}
              />
            </>
          )}
        </View>
        <View style={{ flexDirection: "row", columnGap: 5, marginTop: 20 }}>
          <Pressable
            style={[appStyles.buttons.yellow, appStyles.shadow]}
            onPress={saveAlert}
          >
            <Text style={appStyles.fonts.paragraph}>Save</Text>
          </Pressable>
          <Pressable
            style={[appStyles.buttons.black, appStyles.shadow]}
            onPress={() => {
              profile.isCreator
                ? navigation.navigate("Creator Profile")
                : navigation.navigate("Personal Profile");
            }}
          >
            <Text style={[{ color: "white" }, appStyles.fonts.paragraph]}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

// profile
export const PERSONAL_PROFILE = ({ navigation, route }) => {
  const [profile, setProfile] = useState(route.params || defaultProfile);
  const [events, setEvents] = useState([]);
  const [selection, setSelection] = useState("upcoming");

  // changes profile if changes where made in EDIT_PROFILE
  useEffect(() => {
    if (route.params?.profile) {
      setProfile(route.params.profile);
      console.log("profile changed");
    }
  }, [route.params?.profile]);

  return (
    <>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View style={[appStyles.profileCard, appStyles.shadow]}>
            <View
              style={{
                flexDirection: "row-reverse",
                alignSelf: "flex-end",
                columnGap: 10,
              }}
            >
              <Pressable onPress={() => navigation.navigate("Settings")}>
                <Image
                  source={require("../assets/icons/fi-br-settings.png")}
                  style={{ width: 21, height: 21 }}
                ></Image>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("EDIT_PROFILE", profile)}
              >
                <Image
                  source={require("../assets/icons/fi-br-edit.png")}
                  style={{ width: 20, height: 20 }}
                ></Image>
              </Pressable>
            </View>
            {/* Profile info */}
            <Image source={profile.pic} style={{ width: 125, height: 125 }} />
            <Text style={appStyles.fonts.heading}>{profile.name}</Text>
            <Text style={appStyles.fonts.paragraph}>{profile.username}</Text>
            <Text style={appStyles.fonts.paragraph}>{profile.location}</Text>
            <Text style={appStyles.fonts.paragraph}>
              {profile.year} - {profile.major}
            </Text>
          </View>
          {/* Upcoming / attended / saved toggle*/}
          <View style={[appStyles.toggleContainer, appStyles.shadow]}>
            <TouchableOpacity
              style={
                selection === "upcoming"
                  ? {
                      borderRadius: 20,
                      padding: 10,
                      backgroundColor: "#FFC60A",
                      width: "25%",
                      alignItems: "center",
                    }
                  : {
                      borderRadius: 20,
                      padding: 10,
                      backgroundColor: "white",
                      width: "25%",
                      alignItems: "center",
                    }
              }
              onPress={() => setSelection("upcoming")}
            >
              <Text style={[appStyles.fonts.paragraph, { color: "black" }]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selection === "saved"
                  ? {
                      borderRadius: 20,
                      padding: 10,
                      backgroundColor: "#FFC60A",
                      width: "25%",
                      alignItems: "center",
                    }
                  : {
                      borderRadius: 20,
                      padding: 10,
                      backgroundColor: "white",
                      width: "25%",
                      alignItems: "center",
                    }
              }
              onPress={() => setSelection("saved")}
            >
              <Text style={[appStyles.fonts.paragraph, { color: "black" }]}>
                Saved
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selection === "attended"
                  ? {
                      borderRadius: 20,
                      padding: 10,
                      backgroundColor: "#FFC60A",
                      width: "25%",
                      alignItems: "center",
                    }
                  : {
                      borderRadius: 20,
                      padding: 10,
                      backgroundColor: "white",
                      width: "25%",
                      alignItems: "center",
                    }
              }
              onPress={() => setSelection("attended")}
            >
              <Text style={[appStyles.fonts.paragraph, { color: "black" }]}>
                Attended
              </Text>
            </TouchableOpacity>
          </View>

          {/* display event cards */}
          {selection === "upcoming" ? (
            <EventList events={events} navigation={navigation}></EventList>
          ) : selection === "saved" ? (
            <SavedEventList
              events={events}
              navigation={navigation}
            ></SavedEventList>
          ) : (
            <AttendingEventList
              events={events}
              navigation={navigation}
            ></AttendingEventList>
          )}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </>
  );
};

export const CREATOR_PROFILE = ({ navigation, route }) => {
  const [profile, setProfile] = useState(route.params || defaultCreator);
  const [events, setEvents] = useState([]);
  const [selection, setSelection] = useState("upcoming");

  // changes profile if changes where made in EDIT_PROFILE
  useEffect(() => {
    if (route.params?.profile) {
      setProfile(route.params.profile);
    }
  }, [route.params?.profile]);

  return (
    <>
      <View style={styles.profileContainer}>
        <View style={[appStyles.profileCard, appStyles.shadow]}>
          <View
            style={{
              flexDirection: "row-reverse",
              alignSelf: "flex-end",
              columnGap: 10,
            }}
          >
            <Pressable onPress={() => navigation.navigate("Settings")}>
              <Image
                source={require("../assets/icons/fi-br-settings.png")}
                style={{ width: 21, height: 21 }}
              ></Image>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("EDIT_PROFILE", profile)}
            >
              <Image
                source={require("../assets/icons/fi-br-edit.png")}
                style={{ width: 20, height: 20 }}
              ></Image>
            </Pressable>
          </View>
          {/* Profile info */}
          <Image source={profile.pic} style={{ width: 100, height: 100 }} />
          <Text style={appStyles.fonts.heading}>{profile.name}</Text>
          <Text style={appStyles.fonts.paragraph}>{profile.username}</Text>
          <Text style={appStyles.fonts.paragraph}>{profile.location}</Text>
          <Text style={[appStyles.fonts.paragraph, { textAlign: "center" }]}>
            {profile.bio}
          </Text>
          {/* style events and followers */}
          <View style={{ flexDirection: "row", columnGap: 25, marginTop: 10 }}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={appStyles.fonts.paragraph}>{profile.eventsNum}</Text>
              <Text style={appStyles.fonts.paragraph}>Events</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={appStyles.fonts.paragraph}>
                {profile.followersNum}
              </Text>
              <Text style={appStyles.fonts.paragraph}>Followers</Text>
            </View>
          </View>
        </View>
        {/* Upcoming / attended / saved toggle*/}
        <View style={[appStyles.toggleContainer, appStyles.shadow]}>
          <TouchableOpacity
            style={
              selection === "upcoming"
                ? {
                    borderRadius: 20,
                    padding: 10,
                    backgroundColor: "#FFC60A",
                    width: "40%",
                    alignItems: "center",
                  }
                : {
                    borderRadius: 20,
                    padding: 10,
                    backgroundColor: "white",
                    width: "40%",
                    alignItems: "center",
                  }
            }
            onPress={() => setSelection("upcoming")}
          >
            <Text style={[appStyles.fonts.paragraph, { color: "black" }]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selection === "past"
                ? {
                    borderRadius: 20,
                    padding: 10,
                    backgroundColor: "#FFC60A",
                    width: "40%",
                    alignItems: "center",
                  }
                : {
                    borderRadius: 20,
                    padding: 10,
                    backgroundColor: "white",
                    width: "40%",
                    alignItems: "center",
                  }
            }
            onPress={() => setSelection("past")}
          >
            <Text style={[appStyles.fonts.paragraph, { color: "black" }]}>
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {/* display event cards */}
        {selection === "upcoming" ? (
          <EventList events={events} navigation={navigation}></EventList>
        ) : (
          // replace with past
          <SavedEventList
            events={events}
            navigation={navigation}
          ></SavedEventList>
        )}
        {/* navigate to edit profile */}
      </View>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    flex: 1,
    flexDirection: "column",
    rowGap: 45,
    backgroundColor: appStyles.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: appStyles.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
