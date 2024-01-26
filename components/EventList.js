import { StatusBar } from "expo-status-bar"
import React from "react"
import {
    StyleSheet,
    SafeAreaView,
    View,
    FlatList
} from "react-native"

import EventCard from "../components/EventCard"
import { useNavigation } from "@react-navigation/native"


const EventList = ({ navigation }) => {
    // insert code here
    const events = [
        {
            name: 'Beekeeping: Hive Inspection',
            creator: 'Beekeepers of UCF',
            location: 'Oviedo',
            description: 'Inspect the new hive!',
            membersGoing: '14',
            savedEvent: true,
            image: require('../assets/pexels-anete-lusina-5247994.jpg'),
            id: '1',
        },
        {
            name: 'Beginners: Chess Workshop',
            creator: 'UCF Chess Club',
            location: 'UCF Main Campus',
            description: 'Inspect the new hive!',
            membersGoing: '17',
            savedEvent: false,
            image: require('../assets/pexels-lars-mai-4815483.jpg'),
            id: '2',
        },
        {
            name: 'Game Knights: Arcade Monsters',
            creator: 'Gaming Knights',
            location: 'Oviedo',
            membersGoing: '23',
            savedEvent: false,
            image: require('../assets/pexels-cottonbro-studio-4835419.jpg'),
            id: '3',
        }]
    return (
        <SafeAreaView style={styles.container}>


            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <EventCard event={item} navigation={navigation} />}
            />


        </SafeAreaView >
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
export default EventList