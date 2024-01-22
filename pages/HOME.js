import React from "react"
import { StyleSheet, Text, View, StatusBar, FlatList } from "react-native"
import Card from "../components/EventCard"
import MyComponent from "../components/ToggleButton";
import { Button } from "react-native-paper";
const events = [
  {
    name: 'Beekeeping: Hive Inspection',
    creator: 'Beekeepers of UCF',
    location: 'Oviedo',
    membersGoing: '14',
    savedEvent: true,
    image: require('../assets/pexels-anete-lusina-5247994.jpg'),
    id: 1,
  },
  {
    name: 'Beginners: Chess Workshop',
    creator: 'UCF Chess Club',
    location: 'UCF Main Campus',
    membersGoing: '17',
    savedEvent: false,
    image: require('../assets/pexels-lars-mai-4815483.jpg'),
    id: 2,
  },
  {
    name: 'Game Knights: Arcade Monsters',
    creator: 'Gaming Knights',
    location: 'Oviedo',
    membersGoing: '23',
    savedEvent: false,
    image: require('../assets/pexels-cottonbro-studio-4835419.jpg'),
    id: 3,
  }]

//useState for toggle button

const Home = () => {
  // insert code here
  return (

    <View styles={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => {
          return <Card info={item} />;
        }}
        keyExtractor={(event) => event.id.toString()}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 20 }}
      />
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

})
export default Home;
