import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View, TouchableHighlight } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HOME from "./pages/HOME"
import SEARCH from "./pages/SEARCH"

const Stack = createNativeStackNavigator()

const HeaderHomeToggle = () => {
  return (
    <View style={styles.toggle}>
      <TouchableHighlight style={[styles.highlighted, styles.options]}>
        <Text>Following</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.options}>
        <Text>Discover</Text>
      </TouchableHighlight>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: styles.header }}>
        <Stack.Screen
          name="HOME"
          component={HOME}
          options={{
            headerStyle: styles.header,
            headerTitle: () => <HeaderHomeToggle />,
          }}
        />
        <Stack.Screen name="SEARCH" component={SEARCH} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#FFC60A",
    paddingVertical: 15,
    paddingHorizontal: 30,
    height: "100%",
    width: "100%",
  },
  toggle: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 50,
    marginVertical: 10,
    padding: 5,
  },
  options: {
    paddingHorizontal: 38,
    paddingVertical: 10,
    borderRadius: 50,
  },
  highlighted: {
    backgroundColor: "#FFC60A",
  },
})
