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
import DropDownPicker from "react-native-dropdown-picker";
import appStyles from "../styles";
import EventList from "../components/EventList";

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
    <>
      <View style={styles.editContainer}>
        <View
          style={{ flexDirection: "column", rowGap: 10, alignItems: "center" }}
        >
          <Image
            source={require("../images/janeDoeProfile.png")}
            style={{ width: 125, height: 125 }}
          />
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
          <Text style={appStyles.fonts.subHeading}>Year:</Text>
          <TextInput
            value={profile.year}
            onChangeText={(value) => setProfile({ ...profile, year: value })}
            style={[
              appStyles.fonts.paragraph,
              appStyles.textInput,
              appStyles.shadow,
            ]}
          />
          <Text style={appStyles.fonts.subHeading}>Major:</Text>
          <TextInput
            value={profile.major}
            onChangeText={(value) => setProfile({ ...profile, major: value })}
            style={[
              appStyles.fonts.paragraph,
              appStyles.textInput,
              appStyles.shadow,
            ]}
          />
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
              navigation.navigate("Profile");
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
const PROFILE = ({ navigation, route }) => {
  const [profile, setProfile] = useState(route.params || defaultProfile);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Upcoming");
  const [events, setEvents] = useState([]);

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
            <Image
              source={require("../images/janeDoeProfile.png")}
              style={{ width: 125, height: 125 }}
            />
            <Text style={appStyles.fonts.heading}>{profile.name}</Text>
            <Text style={appStyles.fonts.paragraph}>{profile.username}</Text>
            <Text style={appStyles.fonts.paragraph}>{profile.location}</Text>
            <Text style={appStyles.fonts.paragraph}>
              {profile.year} - {profile.major}
            </Text>
          </View>
          {/* Upcoming / attended / saved dropdown*/}
          <View style={{ alignItems: "center" }}>
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{ width: "80%" }}
              renderListItem={({ item, itemIndex, isSelected, onPress }) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: isSelected ? "#FAFAFA" : "#FFFFFF",
                  }}
                  onPress={() => {
                    setValue(item.value);
                  }}
                >
                  <Text style={appStyles.fonts.paragraph}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          {/* display events based on dropdown */}
          {value === "upcoming" ? (
            <Text style={appStyles.fonts.paragraph}>Upcoming Events</Text>
          ) : value === "attended" ? (
            <Text style={appStyles.fonts.paragraph}>Attended Events</Text>
          ) : (
            <Text style={appStyles.fonts.paragraph}>Saved Events</Text>
          )}
          {/* display event cards */}
          <EventList events={events} navigation={navigation}></EventList>
          {/* navigate to edit profile */}
        </View>
      </ScrollView>
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
export default PROFILE;
