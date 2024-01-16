import React from "react"
import { StyleSheet, Text, View, StatusBar } from "react-native"

const CREATE_EVENTS = () => {
  // insert code here
  return (
    <View style={styles.container}>
      <Text>Create events page</Text>
      <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
export default CREATE_EVENTS
