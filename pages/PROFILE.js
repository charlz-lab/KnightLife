import React from "react"
import { StyleSheet, Text, View, StatusBar } from "react-native"

const PROFILE = () => {
  // insert code here
  return (
    <View style={styles.container}>
      <Text>Testing push</Text>
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
export default PROFILE
