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
// import Animated, { Easing } from "react-native-reanimated"
// import FilterModal from "../components/FilterModal"
import appStyles from "../styles"
import filterIcon from "../assets/icons/fi-filter.png"
import EventCard from "../components/EventCard"
import EventList from "../components/EventList"

const HOME = ({ navigation }) => {
  // list events
  const [events, setEvents] = React.useState([])
  const addEvent = (newEvent) => {
    // Update the events state with the new event
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  // enable filter modal
  const [isModalVisible, setModalVisible] = React.useState(false)
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter & search section */}
      <View style={styles.topLine}>
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
          onPress={toggleModal}
          style={{ flex: 0.5, alignItems: "center" }}>
          <Image source={filterIcon} style={{ height: 24, width: 24 }} />
        </Pressable>
      </View>
      {/* List of event cards */}
      {/* Filter modal */}
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        onBackdropPress={toggleModal}
        style={styles.modal}>
        <View style={styles.modalCard}>
          <View style={styles.vertical}>
            <View style={[styles.vertical, appStyles.fonts.heading]}>
              <Image source={filterIcon} style={{ height: 24, width: 24 }} />
              <Text>Filter</Text>
            </View>
            <Pressable onPress={toggleModal}>
              <Text>Close</Text>
            </Pressable>
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
  vertical: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  topLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    paddingHorizontal: 10,
  },
  modal: {
    margin: 0,
    padding: 0,
    justifyContent: "flex-end",
  },
  modalCard: {
    padding: 40,
    backgroundColor: appStyles.colors.background,
    borderRadius: 25,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    width: "100%",
  },
})
export default HOME
