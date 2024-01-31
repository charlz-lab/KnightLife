import React, { useState } from "react"
import { View, TextInput, StyleSheet, Image } from "react-native"
import searchIcon from "../assets/icons/fi-br-search.png"

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("")

  const handleSearch = () => {
    // Search logic goes here

    // For now, I'm just passing the search text to the parent component
    onSearch(searchText)
  }

  return (
    <View style={styles.container}>
      <Image source={searchIcon} style={{ height: 20, width: 20 }} />
      <TextInput
        style={styles.input}
        placeholder="Search for events or creator accounts"
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
    marginVertical: 8,
  },
  input: {
    height: 40,
    paddingLeft: 10,
    width: "100%",
    marginRight: 8,
  },
})

export default SearchBar
