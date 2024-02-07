import React from "react";
import { Image } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CREATE_EVENTS from "../pages/CREATE_EVENTS";
import HOME from "../pages/HOME";
import { PERSONAL_PROFILE, CREATOR_PROFILE } from "../pages/PROFILE";
import appStyles from "../styles";
import { StyleSheet, View, Platform } from "react-native";

const Tab = createBottomTabNavigator();
let isCreator = false;

function NavBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: appStyles.colors.mainBackground },
      }}
    >
      {isCreator ? (
        <>
          <Tab.Screen
            name="Create_Events"
            component={CREATE_EVENTS}
            options={{
              title: "",
              tabBarIcon: ({ size, focused, color }) => {
                if (focused) {
                  return (
                    <View style={styles.tabSelected}>
                      <Image
                        style={{ width: size, height: size }}
                        source={require("../assets/icons/fi-br-addYellow.png")}
                      />
                    </View>
                  );
                }
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={require("../assets/icons/fi-br-add.png")}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Creator Profile"
            component={CREATOR_PROFILE}
            options={{
              title: "",
              tabBarIcon: ({ size, focused, color }) => {
                if (focused) {
                  return (
                    <View style={styles.tabSelected}>
                      <Image
                        style={{ width: size, height: size }}
                        source={require("../assets/icons/fi-bs-profileYellow.png")}
                      />
                    </View>
                  );
                }
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={require("../assets/icons/fi-bs-profile.png")}
                  />
                );
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
                if (focused) {
                  return (
                    <View style={styles.tabSelected}>
                      <Image
                        style={{ width: size, height: size }}
                        source={require("../assets/icons/fi-ss-homeYellow.png")}
                      />
                    </View>
                  );
                }
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={require("../assets/icons/fi-ss-home.png")}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Personal Profile"
            component={PERSONAL_PROFILE}
            options={{
              title: "",
              tabBarIcon: ({ size, focused, color }) => {
                if (focused) {
                  return (
                    <View style={styles.tabSelected}>
                      <Image
                        style={{ width: size, height: size }}
                        source={require("../assets/icons/fi-bs-profileYellow.png")}
                      />
                    </View>
                  );
                }
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={require("../assets/icons/fi-bs-profile.png")}
                  />
                );
              },
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabSelected: {
    backgroundColor: appStyles.colors.mainBackground,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, .7)",
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        shadowColor: "rgba(0,0,0, .7)",
      },
    }),
  },
});

export default NavBar;
