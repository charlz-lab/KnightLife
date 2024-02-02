import React, { useState } from "react"
import { StyleSheet, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { EDIT_PROFILE } from "./pages/PROFILE"
import appStyles from "./styles"
import { useFonts } from "expo-font"
import NavBar from "./components/NavBar"
import SplashScreen from "./components/SplashScreen"
import Header from "./components/Header"
import Settings from "./pages/settings_folder/SETTINGS"
import Privacy from "./pages/settings_folder/PRIVACY"
import AddSwitchAccounts from "./pages/settings_folder/ADD_SWITCH_ACCOUNTS"
import Accessibility from "./pages/settings_folder/ACCESSIBILITY"
import EditAccount from "./pages/settings_folder/EDIT_ACCOUNT"
import CreateAccount from "./pages/settings_folder/CREATEACCOUNT"
import LoginScreen from "./components/LoginScreen"
import RegisterScreenPersonal from "./components/RegisterScreenPersonal"
import RegisterScreenCreator from "./components/RegisterScreenCreator"
import AccountType from "./components/AccountType"

const Stack = createNativeStackNavigator()
import EventList from "./components/EventList"
import EventPage from "./pages/EVENT"
import HOME from "./pages/HOME"
import SavedEventList from "./components/SavedEventList";
import AttendingEventList from "./components/AttendingEventList";

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountType"
        component={AccountType}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: appStyles.colors.accent2, //Set Header color
          },
          headerTintColor: appStyles.colors.mainBackground, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="RegisterScreenPersonal"
        component={RegisterScreenPersonal}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: appStyles.colors.accent2, //Set Header color
          },
          headerTintColor: appStyles.colors.mainBackground, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
       <Stack.Screen
        name="RegisterScreenCreator"
        component={RegisterScreenCreator}
        options={{
          title: '', //Set Header Title
          headerStyle: {
            backgroundColor: appStyles.colors.accent2, //Set Header color
          },
          headerTintColor: appStyles.colors.mainBackground, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};


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
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: true }}>
      <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NavBar"
          component={NavBar}
          options={{
            // headerTitle: () => <Header />,
            title: "",
            headerStyle: styles.header,
          }}></Stack.Screen>
        <Stack.Screen name="EventsList" component={EventList} />
        <Stack.Screen name="SavedEventList" component={SavedEventList} />
        <Stack.Screen name="AttendingEventList" component={AttendingEventList} />
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
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
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
