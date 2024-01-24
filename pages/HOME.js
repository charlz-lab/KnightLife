import { StatusBar } from "expo-status-bar"
import React from "react"
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Button,
} from "react-native"
import EventCard from '../components/EventCard'
import EventList from '../components/EventList'
const HOME = () => {
  // insert code here
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* Filter section */}
      <View style={styles.filters}>
        <Text>Followed Accounts</Text>
        <Button title="Filter" />
      </View>
      {/* List of event cards */}
      <FlatList
        data={<EventList/>}
        renderItem={({ item }) => {
          return <EventCard info={item} />;
        }}
        keyExtractor={(event) => event.id.toString()}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 20 }}
      />
      {/* Navbar */}
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
export default HOME
