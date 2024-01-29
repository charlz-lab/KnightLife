import { StatusBar } from "expo-status-bar"
import React from "react"
import { useFonts } from "expo-font"
import appStyles from "../styles"
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity
} from "react-native";

import EventCard from "../components/EventCard"
import EventList from "../components/EventList"
const HOME = ({ navigation }) => {
  const [events, setEvents] = useState([])
  const addEvent = (newEvent) => {
    // Update the events state with the new event
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };
  // insert code here
  /*"touchableOpacity" is more customizable than "button"*/
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* Filter section */}
      <View style={styles.filters}>
        <Text style={appStyles.fonts.paragraph}>Followed Accounts</Text>
        <TouchableOpacity style={appStyles.buttons.borders}>
          <Text>Filter</Text>
        </TouchableOpacity>
      </View>
      {/* List of event cards */}
      <View>
        <EventList events={events} navigation={navigation} />
      </View>

    </SafeAreaView >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFC60A",
  },
  filters: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
})
export default HOME
