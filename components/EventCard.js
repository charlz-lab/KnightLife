import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native"
import { Icon } from "react-native-elements"
import Ionicon from "react-native-vector-icons/FontAwesome"
import BookmarkButton from "./BookmarkButton"
import * as Font from "expo-font"
import { useNavigation } from "@react-navigation/native"

const EventCard = ({ event, navigation, onBookmarkToggle }) => {
  const handlePress = () => {
    // navigates to the event details page with event data
    navigation.navigate("EventPage", { event })
  }
  const [isBookmarked, setIsBookmarked] = useState(event.isBookmarked || false)

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked)
    onBookmarkToggle(event.id, !isBookmarked) // Notify parent component about the bookmark toggle
  }
  //loadAsync google fonts
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "IBMPlexSans-Regular": require("../assets/fonts/IBMPlexSans-Regular.ttf"),
        "IBMPlexSans-Medium": require("../assets/fonts/IBMPlexSans-Medium.ttf"),
        "IBMPlexSans-Bold": require("../assets/fonts/IBMPlexSans-Bold.ttf"),
        "Prompt-Bold": require("../assets/fonts/Prompt-Bold.ttf"),
      })

      setFontLoaded(true)
    }

    loadFont()
  }, [])

  if (!fontLoaded) {
    return <Text>Loading...</Text>
  }

  //building card w props

  return (
    <TouchableOpacity onPress={handlePress}>
      {/* event card info */}
      <View style={styles.container}>
        <View style={[styles.cardContainer, styles.shadow]}>
          <ImageBackground
            source={event.image}
            imageStyle={{ borderRadius: 14, width: 290 }}
            style={styles.imageBanner}>
            <View style={styles.buttonContainer}>
              {/* bookmark toggle saved events, using ionicons */}
              {/* <TouchableOpacity
                onPress={handleBookmarkToggle}
                style={styles.bookmarkButton}>
                <Ionicon
                  name={isBookmarked ? "bookmark" : "bookmark-o"}
                  size={20}
                  color="#FFC60A"
                  style={styles.bookmark}
                />
              </TouchableOpacity> */}
            </View>
          </ImageBackground>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{event.name}</Text>
            <Text style={styles.creator}>
              Hosted By: {event.creator_name || ""}
            </Text>
            {/*adding the location pin icon using ionicons*/}
            <View style={styles.locationContainer}>
              <Icon
                name="location-sharp"
                type="ionicon"
                size={13}
                color="#676464"
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>{event.location}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.membersGoing}>
                {event.attending_count} Members Going{" "}
              </Text>
              <Icon
                name="alert-circle-outline"
                type="ionicon"
                size={17}
                color="#676464"
                style={{ justifyContent: "space-between" }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
  },
  //card container style
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 12,
    width: "100%",
    marginBottom: 16,
  },
  //style the drop shadow
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  //style of all text in card
  textContainer: {
    paddingHorizontal: 10,
  },
  //container for image and button
  imageContainer: {
    margin: 5,
    width: 160,
    height: 200,
  },
  imageBanner: {
    flex: 1,
    height: 115,
    width: 328,
    borderRadius: 14,
    paddingHorizontal: 10,
    backgroundColor: "#E2E2E2",
  },
  bookmarkButton: {
    paddingTop: 10,
  },

  title: {
    fontSize: 20,
    color: "black",
    paddingVertical: 10,
    fontFamily: "IBMPlexSans-Regular",
  },
  creator: {
    color: "black",
    fontSize: 15,
    fontFamily: "IBMPlexSans-Medium",
  },
  locationContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  locationIcon: {
    marginRight: 3,
  },
  locationText: {
    fontSize: 13,
    color: "#676464",
  },
  membersGoing: {
    color: "#676464",
    fontSize: 12,
    fontFamily: "IBMPlexSans-Regular",
    marginTop: 8,
  },
  button: {
    width: 25,
    height: 25,
    left: 0,
    right: 20,
    top: 0,
    bottom: 0,

    backgroundColor: "black",
  },
})
export default EventCard
