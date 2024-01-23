
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HOME from "./pages/HOME";
import PROFILE from "./pages/PROFILE";
import { EDIT_PROFILE } from "./pages/PROFILE";
import SEARCH from "./pages/SEARCH";
import SAVED_EVENTS from "./pages/SAVED_EVENTS";
import CREATE_EVENTS from "./pages/CREATE_EVENTS";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
var isCreator = true;

// navigation for nav bar
function NavBar() {
  return (
    <Tab.Navigator>
      {isCreator ? (
        <>
          <Tab.Screen name="Saved Events" component={SAVED_EVENTS} />
          <Tab.Screen name="Create_Events" component={CREATE_EVENTS} />
          <Tab.Screen name="Profile" component={PROFILE} />
        </>
      ) : (
        <>
          <Tab.Screen name="Home" component={HOME} />
          <Tab.Screen name="Search" component={SEARCH} />
          <Tab.Screen name="Saved Events" component={SAVED_EVENTS} />
          <Tab.Screen name="Profile" component={PROFILE} />
        </>
      )}
    </Tab.Navigator>
  );
}

// navigation outside of nav bar
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NavBar" component={NavBar}></Stack.Screen>
        <Stack.Screen
          name="EDIT_PROFILE"
          component={EDIT_PROFILE}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
