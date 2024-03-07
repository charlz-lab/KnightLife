import React, { useEffect, useState } from "react"
import { Image } from "react-native-elements"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import CREATE_EVENTS from "../pages/CREATE_EVENTS"
import HOME from "../pages/HOME"
import { PERSONAL_PROFILE, CREATOR_PROFILE } from "../pages/PROFILE"
import appStyles from "../styles"
import { StyleSheet, View, Platform } from "react-native"
import supabase from '../lib/supabase';
const Tab = createBottomTabNavigator()

function NavBar() {
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    // This effect runs once when the component mounts
    // Define your navigation options here
    HOME.navigationOptions = {
      headerLeft: null,
    }
  }, []) // Empty dependency array ensures it runs only once

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: appStyles.colors.mainBackground,
          height: 90, // Adjust the height as needed
        },
      }}>
      {isCreator ? (
        <>
          <Tab.Screen
            name="Create_Events"
            component={CREATE_EVENTS}
            options={{
              title: "",
              tabBarIcon: ({ size, focused, color }) => (
                <TabIcon
                  focused={focused}
                  icon={require("../assets/icons/fi-br-add.png")}
                  selectedIcon={require("../assets/icons/fi-br-addYellow.png")}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Creator Profile"
            component={CREATOR_PROFILE}
            options={{
              title: "",
              tabBarIcon: ({ size, focused, color }) => (
                <TabIcon
                  focused={focused}
                  icon={require("../assets/icons/fi-bs-profile.png")}
                  selectedIcon={require("../assets/icons/fi-bs-profileYellow.png")}
                />
              ),
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
              tabBarIcon: ({ size, focused, color }) => (
                <TabIcon
                  focused={focused}
                  icon={require("../assets/icons/fi-ss-home.png")}
                  selectedIcon={require("../assets/icons/fi-ss-homeYellow.png")}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Personal Profile"
            component={PERSONAL_PROFILE}
            options={{
              title: "",
              tabBarIcon: ({ size, focused, color }) => (
                <TabIcon
                  focused={focused}
                  icon={require("../assets/icons/fi-bs-profile.png")}
                  selectedIcon={require("../assets/icons/fi-bs-profileYellow.png")}
                />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  )
}

const TabIcon = ({ focused, icon, selectedIcon }) => (
  <View style={[styles.tabIconContainer, focused ? styles.tabSelected : null]}>
    <Image
      style={[styles.tabIcon, focused && styles.tabIconFocused]}
      source={focused ? selectedIcon : icon}
    />
  </View>
)

const styles = StyleSheet.create({
  tabIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28, //icon position
    width: 50,
    height: 50,
    borderRadius: 10, // Adjust border radius to create curved square shape
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginTop: 0,
  },
  tabIconFocused: {
    marginTop: 0, // Adjust margin top for the focused state if needed
  },
  tabSelected: {
    backgroundColor: appStyles.colors.mainBackground, // Background color for selected tab
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 5,

        secondShadow: {
          shadowColor: "#fff",
          shadowOffset: { height: -9, width: -5 },
          shadowOpacity: 1,
          shadowRadius: 5,
        },
      },
      android: {
        elevation: 5,
        shadowColor: "rgba(0,0,0, .7)",
      },
    }),
  },
})

export default NavBar
