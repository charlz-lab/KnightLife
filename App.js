import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View, TouchableHighlight, Image } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HOME from "./pages/HOME"
import PROFILE from "./pages/PROFILE"
import { EDIT_PROFILE } from "./pages/PROFILE"
import CREATE_EVENTS from "./pages/CREATE_EVENTS"
import appStyles from "./styles"
import { useFonts } from "expo-font"
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
var isCreator = false

// navigation for nav bar
function NavBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: appStyles.colors.mainBackground },
      }}>
      {isCreator ? (
        <>
          <Tab.Screen
            name="Create_Events"
            component={CREATE_EVENTS}
            options={{
              title: "",
              tabBarIcon: ({ size, focused, color }) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={{
                      uri: require("./assets/icons/fi-br-add.png"),
                    }}
                  />
                )
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={PROFILE}
            options={{
              title: "",
              tabBarIcon: ({ size, focused, color }) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={{
                      uri: require("./assets/icons/fi-bs-profile.png"),
                    }}
                  />
                )
              },
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Home"
            component={HOME}
            options={{
              title: "",
              tabBarIcon: ({ size, focused, color }) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={{
                      uri: require("./assets/icons/fi-ss-home.png"),
                    }}
                  />
                )
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={PROFILE}
            options={{
              title: "",
              tabBarIcon: ({ size, focused, color }) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={{
                      uri: require("./assets/icons/fi-bs-profile.png"),
                    }}
                  />
                )
              },
            }}
          />
        </>
      )}
    </Tab.Navigator>
  )
}

// navigation outside of nav bar
export default function App() {
  const [fontsLoaded] = useFonts({
    "IBMPlexSans-Medium": require("./assets/fonts/IBMPlexSans-Medium.ttf"),
    "IBMPlexSans-Regular": require("./assets/fonts/IBMPlexSans-Regular.ttf"),
  })
  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="NavBar"
          component={NavBar}
          options={{ headerStyle: styles.header, title: "" }}></Stack.Screen>
        <Stack.Screen
          name="EDIT_PROFILE"
          component={EDIT_PROFILE}
          options={{ title: "" }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: appStyles.colors.accent2,
    paddingHorizontal: 30,
  },
})
