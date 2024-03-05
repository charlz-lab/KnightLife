import React, { useState } from "react"
import { StyleSheet, SafeAreaView, View, FlatList } from "react-native"
import EventCard from "../components/EventCard"

const EventList = async ({ events, navigation }) => {
  {
    /*event data list*/
  }
  // const eventsData = [
  //     {
  //         name: 'Beekeeping: Hive Inspection',
  //         creator: 'Beekeepers of UCF',
  //         location: 'Arboretum - UCF Main Campus',
  //         description: 'Embark on a bee-autiful journey into the heart of nature as we invite you to a captivating Hive Inspection Event! Delve into the fascinating world of bees and witness the intricate workings of their bustling colonies.',
  //         membersGoing: '14',
  //         dateTime: "Jan 10, 3:00PM",
  //         isBookmarked: true,
  //         isAttending: true,
  //         image: require('../assets/pexels-anete-lusina-5247994.jpg'),
  //         id: '1',
  //     },
  //     {
  //         name: 'Beginners: Chess Workshop',
  //         creator: 'UCF Chess Club',
  //         location: 'CB2 103 - UCF Main Campus',
  //         description: 'Are you ready to make your move in the world of chess? Join us for an exciting and immersive Beginner Chess Workshop, where we&#39;ll unravel the secrets of the chessboard and ignite your passion for this timeless game.',
  //         membersGoing: '17',
  //         dateTime: "Jan 12, 2:00PM",
  //         isBookmarked: false,
  //         isAttending: true,
  //         image: require('../assets/pexels-lars-mai-4815483.jpg'),
  //         id: '2',
  //     },
  // ]
  const [eventData, setEventData] = useState(events)
  {
    /*toggle the bookmarked events*/
  }
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
