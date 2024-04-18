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
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import supabase from "../lib/supabase";
import appStyles from "../styles";
import ProfileCard from "../components/ProfileCard";
import ToggleBar from "../components/ToggleBar";
import EventList from "../components/EventList";
import { handleEventList } from "../lib/utils";
import * as ImagePicker from "expo-image-picker";
import LocationDropdown from "../components/LocationDropdown";

// jane doe's profile
let defaultProfile = {
  name: "",
  username: "",
  year: "",
  major: "",
  location: "",
  pic: require("../images/janeDoeProfile.png"),
  isCreator: false,
};

// creator profile
let defaultCreator = {
  name: "",
  username: "",
  location: "",
  bio: "",
  eventsNum: "",
  followersNum: "",
  pic: require("../images/chessClubPic.png"),
  isCreator: true,
};
//fetch personal user data
const fetchPersonalProfile = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error, status } = await supabase
      .from("personal_users")
      .select("*")
      .eq("id", user.id); // Use user.id to get the user's ID

    if (error && status !== 406) {
      throw error;
    } else {
      return { ...data[0], isCreator: false };
    }
  } catch (error) {
    console.error("Error fetching personal user data:", error.message);
    return null;
  }
};
//fetch creator profile data
const fetchCreatorProfile = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error, status } = await supabase
      .from("creator_users")
      .select("*")
      .eq("id", user.id); // Use user.id to get the user's ID

    if (error && status !== 406) {
      throw error;
    } else {
      return { ...data[0], isCreator: true };
    }
  } catch (error) {
    console.error("Error fetching creator user data:", error.message);
    return null;
  }
};

// edit profile page
export const EDIT_PROFILE = ({ navigation, route }) => {
  let [profile, setProfile] = useState(route.params);
  let [campus, setCampus] = useState(profile.campus_location);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  let newImageUrl = null;
  const selectProfileImage = async () => {
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

  const saveAlert = () => {
    Alert.alert(
      "Save Changes",
      "Are you sure you would like to save your changes?",
      [
        // ...
        {
          text: "Save",
          onPress: async () => {
            const {
              data: { user },
            } = await supabase.auth.getUser()
            console.log("user", user)
            try {
              // ...
              if (selectedImage && selectedImage.uri) {
                const arraybuffer = await fetch(selectedImage.uri).then((res) => res.arrayBuffer());
                const fileExt = selectedImage.uri.split('.').pop().toLowerCase();
                const path = `${Date.now()}.${fileExt}`;
                const { data, error: uploadError } = await supabase.storage
                  .from('profile-pics')
                  .upload(path, arraybuffer, {
                    contentType: selectedImage.mimeType ?? 'image/jpeg',
                  });

                if (uploadError) {
                  console.log("Error uploading image", uploadError);
                  return;
                }
                //set newImageUrl 
                newImageUrl = `https://dtfxsobdxejzzasfiiwe.supabase.co/storage/v1/object/public/profile-pics/${data.path}`;
              }
              // Update the profile in the database
              if (profile.isCreator) {
                // Update the creator_users table
                const { error } = await supabase
                  .from("creator_users")
                  .update({
                    name: profile.name,
                    username: profile.username,
                    campus_location: campus,
                    image: newImageUrl,
                    bio: profile.bio,
                  })
                  .eq("id", user.id);

                if (error) {
                  console.log("Error updating creator profile:", error.message);
                  throw error;
                }
              } else {
                // Update the personal_users table
                const { error } = await supabase
                  .from("personal_users")
                  .update({
                    name: profile.name,
                    username: profile.username,
                    campus_location: campus,
                    school_year: profile.school_year,
                    image: newImageUrl,
                    major: profile.major,
                  })
                  .eq("id", user.id);

                if (error) {
                  console.log("Error updating personal profile:", error.message);
                  throw error;
                }
              }

              // Update the profile state variable
              setProfile({
                ...profile,
                name: profile.name,
                username: profile.username,
                campus_location: campus,
                bio: profile.bio,
                major: profile.major,
                school_year: profile.school_year,
                image: profile.image,
              });

              // Navigate back to the respective profile page
              profile.isCreator
                ? navigation.navigate("Creator Profile", { profile: { ...profile, campus_location: campus } })
                : navigation.navigate("Personal Profile", { profile: { ...profile, campus_location: campus } });
            } catch (error) {
              console.error("Error updating profile:", error.message);
            }
          },
        },
      ]
    );
  };
  return (
    <>
      <View style={styles.editContainer}>
        <View
          style={{
            flexDirection: "column",
            rowGap: 5,
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <Image
            source={{ uri: selectedImage?.uri ?? profile.image ?? "" }}
            style={{ width: 125, height: 125, borderRadius: 125 / 2 }}
          />

          <TouchableOpacity onPress={selectProfileImage}>
            <Text
              style={[
                appStyles.fonts.paragraph,
                { textDecorationLine: "underline" },
              ]}
            >
              Change photo
            </Text>
          </TouchableOpacity>
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
          <View style={appStyles.sectionStyle}>
            <TextInput
              value={profile.name}
              onChangeText={(value) => setProfile({ ...profile, name: value })}
              style={[appStyles.fonts.paragraph, appStyles.textInput]}
              placeholder="Profile Name"
              placeholderTextColor={"black"}
            />
          </View>
          <Text style={appStyles.fonts.subHeading}>Username:</Text>
          <View style={appStyles.sectionStyle}>
            <TextInput
              value={profile.username}
              onChangeText={(value) =>
                setProfile({ ...profile, username: value })
              }
              style={[appStyles.fonts.paragraph, appStyles.textInput]}
            />
          </View>
          <Text style={appStyles.fonts.subHeading}>Campus Location:</Text>
          <LocationDropdown
            onLocationSelect={setCampus}
            location={profile.campus_location}
          ></LocationDropdown>
          {profile.isCreator ? (
            <>
              <Text style={appStyles.fonts.subHeading}>Bio:</Text>
              <View style={appStyles.sectionStyle}>
                <TextInput
                  value={profile.bio}
                  onChangeText={(value) =>
                    setProfile({ ...profile, bio: value })
                  }
                  style={[appStyles.fonts.paragraph, appStyles.textInput]}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={appStyles.fonts.subHeading}>Year:</Text>
              <View style={appStyles.sectionStyle}>
                <TextInput
                  value={profile.school_year}
                  onChangeText={(value) =>
                    setProfile({ ...profile, school_year: value })
                  }
                  style={[appStyles.fonts.paragraph, appStyles.textInput]}
                />
              </View>
              <Text style={appStyles.fonts.subHeading}>Major:</Text>
              <View style={appStyles.sectionStyle}>
                <TextInput
                  value={profile.major}
                  onChangeText={(value) =>
                    setProfile({ ...profile, major: value })
                  }
                  style={[appStyles.fonts.paragraph, appStyles.textInput]}
                />
              </View>
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
  const [savedEvents, setSavedEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [selection, setSelection] = useState("upcoming");

  // fetch events from database
  useEffect(() => {
    handleEventList(setSavedEvents, "saved");
    handleEventList(setAttendingEvents, "attending");
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's profile data
        const userData = await fetchPersonalProfile(); // Remove route.params.userId from here
        setProfile(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);
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
          {/* Profile info */}
          <ProfileCard
            profile={profile}
            accountType="personal"
            navigation={navigation}
          />
          {/* Upcoming / attended / saved toggle*/}
          <ToggleBar
            tabs={["upcoming", "saved", "attended"]}
            selection={selection}
            setSelection={setSelection}
          />

          {/* display event cards */}
          {selection === "upcoming" ? (
            <EventList
              events={
                // filter upcoming events
                attendingEvents.filter(
                  (event) => new Date(event.date) > new Date()
                )
              }
              navigation={navigation}
            ></EventList>
          ) : selection === "saved" ? (
            <EventList
              events={savedEvents.filter(
                (event) => new Date(event.date) > new Date()
              )}
              navigation={navigation}
            />
          ) : (
            <EventList
              events={
                // filter upcoming events
                attendingEvents.filter(
                  (event) => new Date(event.date) < new Date()
                )
              }
              navigation={navigation}
            ></EventList>
          )}
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </>
  );
};

export const CREATOR_PROFILE = ({ navigation, route }) => {
  const [profile, setProfile] = useState(route.params || defaultCreator);
  const [selection, setSelection] = useState("upcoming");
  const [events, setEvents] = useState([]);

  // fetch events from database
  useEffect(() => {
    handleEventList(setEvents, "creator");
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's profile data
        const userData = await fetchCreatorProfile(); // Remove route.params.userId from here
        setProfile(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);
  // changes profile if changes where made in EDIT_PROFILE
  useEffect(() => {
    if (route.params?.profile) {
      setProfile(route.params.profile);
    }
  }, [route.params?.profile]);

  return (
    <>
      <ScrollView>
        <View style={styles.profileContainer}>
          {/* Profile info */}
          <ProfileCard
            profile={profile}
            accountType="creator"
            navigation={navigation}
          />
          {/* Upcoming / attended / saved toggle*/}
          <ToggleBar
            tabs={["upcoming", "past"]}
            selection={selection}
            setSelection={setSelection}
          />
          {/* display event cards */}
          {selection === "upcoming" ? (
            <EventList
              events={
                // filter upcoming events
                events.filter((event) => new Date(event.date) > new Date())
              }
              navigation={navigation}
            ></EventList>
          ) : (
            <EventList
              events={
                // filter past events
                events.filter((event) => new Date(event.date) < new Date())
              }
              navigation={navigation}
            ></EventList>
          )}
          {/* navigate to edit profile */}
        </View>
        <StatusBar style="auto" />
      </ScrollView>
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
});
