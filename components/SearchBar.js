import React, { useEffect, useState } from "react"
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

const SearchBar = ({ handleSearch, clearEvents, hasFilter }) => {
  const [searchText, setSearchText] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const placeholder = "Search events"

  // clear search text
  const handleClear = () => {
    setSearchText("")
    clearEvents()
    setIsSearching(false)
  }

  return (
    <>
      {hasFilter ? (
        // show clear search button if search results are displayed
        <Pressable style={styles.clearSearch} onPress={handleClear}>
          <View style={styles.clearSearchBtn}>
            <Icon name="close" type="ionicon" size={25} color="#ffffff" />
          </View>
          <Text style={styles.clearSearchText}>Clear Search</Text>
        </Pressable>
      ) : (
        // otherwise, show search bar
        <View style={styles.container}>
          <View
            style={[
              appStyles.layout.horizontal,
              { flex: 5, justifyContent: "flex-start" },
            ]}>
            <Image source={searchIcon} style={{ height: 20, width: 20 }} />
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                // update search text
                setSearchText(text)
              }}
              onEndEditing={() => {
                // search events
                handleSearch(searchText)
              }}
              // show placeholder text when not searching
              value={isSearching ? searchText : placeholder}
              onPressIn={() => setIsSearching(true)}
              returnKeyType="search"
            />
          </View>
          {/* show clear text button when search text is not empty */}
          {searchText.length > 0 && (
            <Pressable style={styles.clearTextBtn} onPress={handleClear}>
              <Icon
                name="close"
                type="ionicon"
                size={25}
                color={appStyles.colors.accent1}
              />
            </Pressable>
          )}
        </View>
      )}
    </>
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
    fontSize: 16,
    textAlign: "left",
  },
  clearTextBtn: {
    marginLeft: 8,
    flex: 0.5,
    backgroundColor: "#f0f0f0",
  },
  clearSearch: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 100,
    backgroundColor: appStyles.colors.mainBackground,
  },
  clearSearchText: {
    color: appStyles.colors.background,
    fontSize: 16,
  },
  clearSearchBtn: {
    marginRight: 8,
  },
})

export default SearchBar
