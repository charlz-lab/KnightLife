// SavedEvent.js
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import EventCard from "./EventCard";
const SavedEventList = ({ navigation, onBookmarkToggle }) => {
  //list for when isBookmarked (saved) set to true
  const [events, setEvents] = useState([
    {
      name: "Beekeeping: Hive Inspection",
      creator: "Beekeepers of UCF",
      location: "Arboretum - UCF Main Campus",
      description:
        "Embark on a bee-autiful journey into the heart of nature as we invite you to a captivating Hive Inspection Event! Delve into the fascinating world of bees and witness the intricate workings of their bustling colonies.",
      membersGoing: "14",
      dateTime: "Jan 10, 3:00PM",
      isBookmarked: true,
      isAttending: false,
      image: require("../assets/pexels-anete-lusina-5247994.jpg"),
      id: "1",
    },
    {
      name: "Beginners: Chess Workshop",
      creator: "UCF Chess Club",
      location: "CB2 103 - UCF Main Campus",
      description:
        "Are you ready to make your move in the world of chess? Join us for an exciting and immersive Beginner Chess Workshop, where we&#39;ll unravel the secrets of the chessboard and ignite your passion for this timeless game.",
      membersGoing: "17",
      dateTime: "Jan 12, 2:00PM",
      isBookmarked: false,
      isAttending: true,
      image: require("../assets/pexels-lars-mai-4815483.jpg"),
      id: "2",
    },
  ]);

  {
    /*filters the bookmarked events*/
  }
  const savedEvents = events.filter((event) => event.isBookmarked);
  const toggleBookmark = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, isBookmarked: !event.isBookmarked }
          : event
      )
    );
  };
  return (
    <View style={styles.container}>
      {/*flatlist that renders only saved events*/}
      {savedEvents.length > 0 ? (
        <FlatList
          data={savedEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              navigation={navigation}
              onBookmarkToggle={toggleBookmark}
            />
          )}
        />
      ) : (
        <Text>No saved events.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "IBMPlexSans-Medium",
    marginBottom: 16,
  },
  eventContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
  },
});

export default SavedEventList;
