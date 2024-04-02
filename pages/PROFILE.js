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
import supabase from "../lib/supabase"
import appStyles from "../styles"
import ProfileCard from "../components/ProfileCard"
import ToggleBar from "../components/ToggleBar"
import EventList from "../components/EventList"
import { handleEventList } from "../lib/utils"
import * as ImagePicker from "expo-image-picker"

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
//fetch personal user data
const fetchPersonalProfile = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const { data, error, status } = await supabase
      .from("personal_users")
      .select("*")
      .eq("id", user.id) // Use user.id to get the user's ID

    if (error && status !== 406) {
      throw error
    } else {
      return data[0]
    }
  } catch (error) {
    console.error("Error fetching personal user data:", error.message)
    return null
  }
}
//fetch creator profile data
const fetchCreatorProfile = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const { data, error, status } = await supabase
      .from("creator_users")
      .select("*")
      .eq("id", user.id) // Use user.id to get the user's ID

    if (error && status !== 406) {
      throw error
    } else {
      return data[0]
    }
  } catch (error) {
    console.error("Error fetching creator user data:", error.message)
    return null
  }
}
// fetch events from database
const fetchEvents = async (creatorId) => {
  let eventsListQuery = supabase.from("events").select("*")
  if (creatorId) {
    eventsListQuery = eventsListQuery.eq("creator_id", creatorId)
  }
  eventsListQuery = eventsListQuery.order("date", { ascending: true })
  const { data, error, status } = await eventsListQuery
  if (error && status !== 406) {
    throw error
  } else {
    return data
  }
}

const subscribeToEvents = (creatorId, setEvents) => {
  const eventsListQuery = supabase
    .from("events")
    .select("*")
    .eq("creator_id", creatorId)
    .order("date", { ascending: true })

  const subscription = supabase
    .channel("event_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "events" },
      (payload) => {
        if (payload.eventType === "INSERT") {
          // Handle new event insertion
          const newEvent = payload.new
          // Update events list
          setEvents((prevEvents) => [...prevEvents, newEvent])
        } else if (payload.eventType === "UPDATE") {
          // Handle event update
          const updatedEvent = payload.new
          // Update events list
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event.id === updatedEvent.id ? updatedEvent : event
            )
          )
        } else if (payload.eventType === "DELETE") {
          // Handle event deletion
          const deletedEventId = payload.old.id
          // Update events list
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== deletedEventId)
          )
        }
      }
    )
    .subscribe()

  return subscription
}

// edit profile page
export const EDIT_PROFILE = ({ navigation, route }) => {
  let [profile, setProfile] = useState(route.params)
  const [image, setImage] = useState(null)

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!")
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (pickerResult.canceled === true) {
      return
    }

    setImage({ localUri: pickerResult.assets[0].uri })
    setProfile({ ...profile, image: { uri: pickerResult.assets[0].uri } })
  }

  const saveAlert = () => {
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
          onPress: async () => {
            try {
              const {
                data: { user },
              } = await supabase.auth.getUser()
              if (profile.isCreator) {
                // Update the creator_users table
                const { error } = await supabase
                  .from("creator_users")
                  .update({
                    name: profile.name,
                    username: profile.username,
                    campus_location: profile.campus_location,
                    bio: profile.bio,
                  })
                  .eq("id", user.id)

                if (error) {
                  throw error
                }
              } else {
                // Update the personal_users table
                const { error } = await supabase
                  .from("personal_users")
                  .update({
                    name: profile.name,
                    username: profile.username,
                    campus_location: profile.campus_location,
                    school_year: profile.school_year,
                    major: profile.major,
                  })
                  .eq("id", user.id)

                if (error) {
                  throw error
                }
              }

              // navigate to the respective profile page after successful update
              profile.isCreator
                ? navigation.navigate("Creator Profile", { profile })
                : navigation.navigate("Personal Profile", { profile })
            } catch (error) {
              console.error("Error updating profile:", error.message)
            }
          },
        },
      ]
    )
  }
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
          <Image
            source={profile.image}
            style={{ width: 125, height: 125, borderRadius: 125 / 2 }}
          />

          <TouchableOpacity onPress={openImagePickerAsync}>
            <Text
              style={[
                appStyles.fonts.paragraph,
                { textDecorationLine: "underline" },
              ]}>
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
              style={[appStyles.fonts.paragraph, appStyles.textInput]}
            />
          </View>
          <Text style={appStyles.fonts.subHeading}>Campus Location:</Text>
          <View style={appStyles.sectionStyle}>
            <TextInput
              value={profile.campus_location}
              onChangeText={(value) =>
                setProfile({ ...profile, campus_location: value })
              }
              style={[appStyles.fonts.paragraph, appStyles.textInput]}
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
  const [savedEvents, setSavedEvents] = useState([])
  const [attendingEvents, setAttendingEvents] = useState([])
  const [selection, setSelection] = useState("upcoming")

  // fetch events from database
  useEffect(() => {
    handleEventList(setSavedEvents, "saved")
    handleEventList(setAttendingEvents, "attending")
  }, [])
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's profile data
        const userData = await fetchPersonalProfile() // Remove route.params.userId from here
        setProfile(userData)
      } catch (error) {
        console.error("Error fetching user data:", error.message)
      }
    }

    fetchUserData()
  }, [])
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
              navigation={navigation}></EventList>
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
              navigation={navigation}></EventList>
          )}
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

  // fetch events from database
  useEffect(() => {
    handleEventList(setEvents, "creator")
  }, [])
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's profile data
        const userData = await fetchCreatorProfile() // Remove route.params.userId from here
        setProfile(userData)
      } catch (error) {
        console.error("Error fetching user data:", error.message)
      }
    }

    fetchUserData()
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
              navigation={navigation}></EventList>
          ) : (
            <EventList
              events={
                // filter past events
                events.filter((event) => new Date(event.date) < new Date())
              }
              navigation={navigation}></EventList>
          )}
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
    paddingVertical: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
})
