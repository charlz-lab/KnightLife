import React from "react"
import { Image } from "react-native-elements"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import CREATE_EVENTS from "../pages/CREATE_EVENTS"
import HOME from "../pages/HOME"
import PROFILE from "../pages/PROFILE"
import appStyles from "../styles"
const Tab = createBottomTabNavigator()
let isCreator = false

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
                      uri: require("../assets/icons/fi-br-add.png"),
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
                      uri: require("../assets/icons/fi-bs-profile.png"),
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
                      uri: require("../assets/icons/fi-ss-home.png"),
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
                      uri: require("../assets/icons/fi-bs-profile.png"),
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
export default NavBar
