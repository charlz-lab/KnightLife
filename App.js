import React, { useState } from "react"
import { StyleSheet, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { EDIT_PROFILE } from "./pages/PROFILE"
import appStyles from "./styles"
import { useFonts } from "expo-font"
import NavBar from "./components/NavBar"
import Header from "./components/Header"
import Settings from "./pages/settings_folder/SETTINGS"
import Privacy from "./pages/settings_folder/PRIVACY"
import AddSwitchAccounts from "./pages/settings_folder/ADD_SWITCH_ACCOUNTS"
import Accessibility from "./pages/settings_folder/ACCESSIBILITY"
import EditAccount from "./pages/settings_folder/EDIT_ACCOUNT"
import CreateAccount from "./pages/settings_folder/CREATEACCOUNT"

const Stack = createNativeStackNavigator()
import EventList from "./components/EventList"
import EventPage from "./pages/EVENT"
import HOME from "./pages/HOME"

// navigation outside of nav bar
export default function App() {
  const [fontsLoaded] = useFonts({
    "IBMPlexSans-Bold": require("./assets/fonts/IBMPlexSans-Bold.ttf"),
    "IBMPlexSans-Medium": require("./assets/fonts/IBMPlexSans-Medium.ttf"),
    "IBMPlexSans-Regular": require("./assets/fonts/IBMPlexSans-Regular.ttf"),
  })
  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="NavBar"
          component={NavBar}
          options={{
            // headerTitle: () => <Header />,
            title: "",
            headerStyle: styles.header,
          }}></Stack.Screen>
        <Stack.Screen name="EventsList" component={EventList} />
        <Stack.Screen
          name="EventPage"
          component={EventPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EDIT_PROFILE"
          component={EDIT_PROFILE}
          options={{ title: "" }}></Stack.Screen>
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: "" }}></Stack.Screen>

        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="AddSwitchAccounts" component={AddSwitchAccounts} />
        <Stack.Screen name="Accessibility" component={Accessibility} />
        <Stack.Screen name="EditAccount" component={EditAccount} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
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
