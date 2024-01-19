import { React } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
} from "react-native";

// jane doe's profile
let defaultProfile = {
  name: "Jane Doe",
  username: "@janedoe",
  location: "UCF Downtown, Orlando",
  year: "Senior",
  major: "Marine Biology",
};

//upcoming + attended tabs
const PROFILE_TABS = () => {
  return (
    <>
      <Pressable>
        <Text>Upcoming</Text>
      </Pressable>
      <Pressable>
        <Text>Attended</Text>
      </Pressable>
    </>
  );
};

// edit profile page
export const EDIT_PROFILE = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/janeDoeProfile.png")}
        style={{ width: 100, height: 100 }}
      />
      <Text>{defaultProfile.name}</Text>
      <Text>{defaultProfile.username}</Text>
      <Text>{defaultProfile.location}</Text>
      <Text>
        {defaultProfile.year} - {defaultProfile.major}
      </Text>
    </View>
  );
};

// profile
const PROFILE = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../images/janeDoeProfile.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text>{defaultProfile.name}</Text>
        <Text>{defaultProfile.username}</Text>
        <Text>{defaultProfile.location}</Text>
        <Text>
          {defaultProfile.year} - {defaultProfile.major}
        </Text>
        <PROFILE_TABS></PROFILE_TABS>
        <Pressable onPress={() => navigation.navigate("EDIT_PROFILE")}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
export default PROFILE
