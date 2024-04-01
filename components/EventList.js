import React, { useState, useEffect } from "react"
import { StyleSheet, SafeAreaView, View, FlatList } from "react-native"
import EventCard from "../components/EventCard"
import supabase from "../lib/supabase"

const EventList = ({ events, navigation }) => {
  const [eventData, setEventData] = useState([])

  // update the event list with the creator's name
  const fetchEventCreatorNames = async (events) => {
    const updatedEvents = await Promise.all(
      events.map(async (event) => {
        let eventCreatorQuery = supabase
          .from("users")
          .select("name")
          .eq("id", event.creator_id)
        const { data, error, status } = await eventCreatorQuery
        if (error && status !== 406) {
          throw error
        } else {
          // console.log(data)
          return { ...event, creator_name: data[0].name }
        }
      })
    )
    return updatedEvents
  }

  useEffect(() => {
    if (supabase) {
      fetchEventCreatorNames(events).then((updatedEvents) => {
        setEventData(updatedEvents)
      })
    }
  }, [events])

  /*toggle the bookmarked events*/
  const handleBookmarkToggle = (eventId, isBookmarked) => {
    const updatedData = eventData.map((event) =>
      event.id === eventId ? { ...event, isBookmarked } : event
    )
    setEventData(updatedData)
  }
  // console.log(eventData)

  return (
    <SafeAreaView style={styles.container}>
      {/*flatlist to render the event cards*/}
      <FlatList
        data={eventData}
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
