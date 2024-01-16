import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import HOME from "./pages/HOME"
import PROFILE from "./pages/PROFILE"
import SEARCH from "./pages/SEARCH"
import CALENDAR from "./pages/CALENDAR"

const Stack = createBottomTabNavigator();

export default function App() {
  return (<NavigationContainer><Stack.Navigator>
    <Stack.Screen name="Home" component={HOME} />
    <Stack.Screen name="Search" component={SEARCH} />
    <Stack.Screen name="Calendar" component={CALENDAR} />
    <Stack.Screen name="Profile" component={PROFILE} />
    </Stack.Navigator></NavigationContainer>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
