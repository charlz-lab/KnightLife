import React, { useState } from "react"
import { StyleSheet, SafeAreaView, View, FlatList } from "react-native"
import EventCard from "../components/EventCard"

const EventList = ({ events, navigation }) => {
  {
    /*event data list*/
  }
  const [eventData, setEventData] = useState(events)
  /*toggle the bookmarked events*/
  const handleBookmarkToggle = (eventId, isBookmarked) => {
    const updatedData = eventData.map((event) =>
      event.id === eventId ? { ...event, isBookmarked } : event
    )
    setEventData(updatedData)
  }
  console.log(events)

  return (
    <SafeAreaView style={styles.container}>
      {/*flatlist to render the event cards*/}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            navigation={navigation}
            onBookmarkToggle={handleBookmarkToggle}
          />
        )}
      />
    </SafeAreaView>
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
export default EventList
