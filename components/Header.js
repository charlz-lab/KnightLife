import React from "react"
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native"
import { SearchBar } from "@rneui/base"
import appStyles from "../styles"

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        platform="ios"
        containerStyle={{
          borderRadius: 100,
          borderWidth: 0,
          backgroundColor: "transparent",
          flex: 3,
        }}
        inputContainerStyle={{
          borderWidth: 0,
          borderRadius: 100,
        }}
      />
      <TouchableOpacity style={{ flex: 0.5 }}>
        <Text>Filter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
})
export default Header
