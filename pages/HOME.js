import React from "react"
import { StatusBar } from "expo-status-bar"
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
import appStyles from "../styles"
import filterIcon from "../assets/icons/fi-filter.png"

const HOME = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Filter & search section */}
      <View style={styles.filters}>
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
        {/* note: "touchableOpacity" is more customizable than "button" */}
        <Pressable style={{ flex: 0.5, alignItems: "center" }}>
          <Image source={filterIcon} style={{ height: 24, width: 24 }} />
        </Pressable>
      </View>
      {/* List of event cards */}
      <StatusBar style="auto" />
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
  filters: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})
export default HOME
