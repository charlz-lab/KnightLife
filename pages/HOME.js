import React from "react"
import { StatusBar } from "expo-status-bar"
import { useFonts } from "expo-font"
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Pressable,
  Image,
} from "react-native"
import { SearchBar } from "@rneui/themed"
import Modal from "react-native-modal"
import FilterModal from "../components/FilterModal"
import appStyles from "../styles"
import filterIcon from "../assets/icons/fi-filter.png"
import EventCard from "../components/EventCard"
import EventList from "../components/EventList"

const HOME = ({ navigation }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false)
  const openFilterCard = () => {
    setIsFilterModalOpen(!isFilterModalOpen)
    console.log("Open filter")
  }
  const [events, setEvents] = React.useState([])
  const addEvent = (newEvent) => {
    // Update the events state with the new event
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter & search section */}
      <View style={styles.filters}>
        <SearchBar
          platform="ios"
          containerStyle={{
            borderRadius: 100,
            borderWidth: 0,
            flex: 3,
          }}
          inputContainerStyle={{
            borderWidth: 0,
            borderRadius: 100,
          }}
        />
        {/* note: "pressable" is more customizable than "button" */}
        <Pressable
          onPress={openFilterCard}
          style={{ flex: 0.5, alignItems: "center" }}>
          <Image source={filterIcon} style={{ height: 24, width: 24 }} />
        </Pressable>
      </View>
      {/* List of event cards */}
      {/* Filter modal */}
      {/* <FilterModal isVisible={isFilterModalOpen} /> */}
      <Modal
        style={styles.filterModal}
        // isVisible={isFilterModalOpen}
        isVisible={isFilterModalOpen}
        onBackdropPress={() => setIsFilterModalOpen(false)}
        onSwipeComplete={() => setIsFilterModalOpen(false)}
        swipeDirection="down">
        <View>
          <View style={styles.verticalLine}>
            <View style={styles.verticalLine}>
              <Image source={filterIcon} style={{ height: 24, width: 24 }} />
              <Text>Filter</Text>
            </View>
            <Pressable>
              <Text>Close</Text>
            </Pressable>
          </View>
          <View>
            <View style={styles.verticalLine}>
              <Text>Campus Location</Text>
              <Pressable>
                <Text>Clear</Text>
              </Pressable>
            </View>
            <View>
              <Text>Main Campus</Text>
            </View>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
      <View>
        <EventList events={events} navigation={navigation} />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: appStyles.colors.background,
    alignItems: "center",
  },
  verticalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filters: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  filterModal: {
    backgroundColor: appStyles.colors.background,
    borderRadius: 25,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    maxHeight: "60%",
    width: "100%",
    margin: 0,
    justifyContent: "flex-start",
    padding: 30,
  },
})
export default HOME
