import { React, useState, useEffect } from "react"
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
} from "react-native"
import { ScrollView } from "react-native-virtualized-view"
import appStyles from "../styles"
import ProfileCard from "../components/ProfileCard"
import ToggleBar from "../components/ToggleBar"
import EventList from "../components/EventList"
import AttendingEventList from "../components/AttendingEventList"
import SavedEventList from "../components/SavedEventList"
import supabase from "../lib/supabase"

// jane doe's profile
let defaultProfile = {
  name: "Jane Doe",
  username: "@janedoe",
  year: "Senior",
  major: "Marine Biology",
  location: "UCF Downtown, Orlando",
  pic: require("../images/janeDoeProfile.png"),
  isCreator: false,
}

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
}

// fetch events from database
const fetchEvents = async (creatorId) => {
  const { data, error, status } = await supabase
    .from("events")
    .select("*")
    .eq("creator_id", creatorId)
    .order("date", { ascending: true })
  if (error && status !== 406) {
    throw error
  } else {
    return data
  }
}

// edit profile page
export const EDIT_PROFILE = ({ navigation, route }) => {
  let [profile, setProfile] = useState(route.params)

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
              : navigation.navigate("Personal Profile", { profile: profile })
          },
        },
      ]
    )
  return (
    <>
      <View style={styles.editContainer}>
        <View
          style={{
            flexDirection: "column",
            rowGap: 5,
            alignItems: "center",
            marginTop: 25,
          }}>
          <Image source={profile.pic} style={{ width: 125, height: 125 }} />
          <Text style={appStyles.fonts.paragraph}>Change photo</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "90%",
            alignItems: "center",
            rowGap: 5,
          }}>
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
              style={[appStyles.fonts.regular, appStyles.textInput]}
            />
          </View>
          <Text style={appStyles.fonts.subHeading}>Campus Location:</Text>
          <View style={appStyles.sectionStyle}>
            <TextInput
              value={profile.location}
              onChangeText={(value) =>
                setProfile({ ...profile, location: value })
              }
              style={[appStyles.fonts.regular, appStyles.textInput]}
            />
          </View>
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
                  value={profile.year}
                  onChangeText={(value) =>
                    setProfile({ ...profile, year: value })
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
    </>
  )
}

// profile
export const PERSONAL_PROFILE = ({ navigation, route }) => {
  const [profile, setProfile] = useState(route.params || defaultProfile)
  const [events, setEvents] = useState([])
  const [selection, setSelection] = useState("upcoming")

  // changes profile if changes where made in EDIT_PROFILE
  useEffect(() => {
    if (route.params?.profile) {
      setProfile(route.params.profile)
      console.log("profile changed")
    }
  }, [route.params?.profile])

  return (
    <>
      <ScrollView>
        <View style={styles.profileContainer}>
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
          {/* <View style={[appStyles.toggleContainer, appStyles.shadow]}>
                        
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
              onPress={() => setSelection("upcoming")}>
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
              onPress={() => setSelection("saved")}>
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
              onPress={() => setSelection("attended")}>
              <Text style={[appStyles.fonts.paragraph, { color: "black" }]}>
                Attended
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* display event cards */}
          {/* {selection === "upcoming" ? (
            <EventList events={events} navigation={navigation}></EventList>
          ) : selection === "saved" ? (
            <SavedEventList
              events={events}
              navigation={navigation}></SavedEventList>
          ) : (
            <AttendingEventList
              events={events}
              navigation={navigation}></AttendingEventList>
          )} */}
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </>
  )
}

export const CREATOR_PROFILE = ({ navigation, route }) => {
  const [profile, setProfile] = useState(route.params || defaultCreator)
  const [selection, setSelection] = useState("upcoming")
  const [events, setEvents] = useState([])
  const creatorId = "92365ee0-44d3-46b8-a408-c1f319043821"

  useEffect(() => {
    if (supabase) {
      fetchEvents(creatorId).then((data) => {
        setEvents(data)
      })
    }
  }, [])

  // changes profile if changes where made in EDIT_PROFILE
  useEffect(() => {
    if (route.params?.profile) {
      setProfile(route.params.profile)
    }
  }, [route.params?.profile])

  return (
    <>
      <ScrollView>
        <View style={styles.profileContainer}>
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
          {/* <View style={[appStyles.toggleContainer, appStyles.shadow]}>
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
              onPress={() => setSelection("upcoming")}>
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
              onPress={() => setSelection("past")}>
              <Text style={[appStyles.fonts.paragraph, { color: "black" }]}>
                Past
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* display event cards */}
          {console.log(events)}
          {/* <EventList events={events} navigation={navigation}></EventList> */}
          {/* {selection === "upcoming" ? (
            <EventList events={events} navigation={navigation}></EventList>
          ) : (
            // replace with past
            <SavedEventList
              events={events}
              navigation={navigation}></SavedEventList>
          )} */}
          {/* navigate to edit profile */}
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </>
  )
}

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
  },
})
