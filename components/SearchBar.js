import React, { useState } from "react"
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  Text,
} from "react-native"
import { Card, Icon } from "react-native-elements"
import searchIcon from "../assets/icons/fi-br-search.png"
import appStyles from "../styles"

const SearchBar = ({
  searchText,
  setSearchText,
  events,
  setFilteredEvents,
}) => {
  // clear search text
  const handleClear = () => {
    setSearchText("")
    setFilteredEvents(events)
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          appStyles.layout.horizontal,
          { flex: 5, justifyContent: "flex-start" },
        ]}>
        <Image source={searchIcon} style={{ height: 20, width: 20 }} />
        <TextInput
          style={styles.input}
          placeholder="Search for events..."
          onChangeText={(text) => {
            setSearchText(text)
            const lowercasedSearchText = text.toLowerCase()
            // filter events by beginning of words
            const filtered = events.filter((event) => {
              eventName = " " + event.name.toLowerCase()
              return eventName.includes(" " + lowercasedSearchText)
            })
            setFilteredEvents(filtered)
          }}
          value={searchText}
        />
      </View>
      {searchText.length > 0 && (
        <Pressable style={styles.clearButton} onPress={handleClear}>
          <Icon
            name="close"
            type="ionicon"
            size={25}
            color={appStyles.colors.accent1}
          />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
    marginVertical: 8,
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    paddingLeft: 10,
    marginRight: 8,
    flex: 1,
    textAlign: "left",
  },
  clearButton: {
    marginLeft: 8,
    flex: 0.5,
    backgroundColor: "#f0f0f0",
  },
})

export default SearchBar
