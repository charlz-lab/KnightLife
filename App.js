import React from "react"
import { StyleSheet, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { EDIT_PROFILE } from "./pages/PROFILE"
import appStyles from "./styles"
import { useFonts } from "expo-font"
import NavBar from "./components/NavBar"
const Stack = createNativeStackNavigator()

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
