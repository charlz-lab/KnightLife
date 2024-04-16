import React, { useState, useEffect } from "react";
import appStyles from "../styles";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import LocationDropdown from "./LocationDropdown";
import supabase from "../lib/supabase";
import * as ImagePicker from "expo-image-picker";

function CustomizeProfileCreator({ navigation, route, session }) {
  const [name, setName] = useState("");
  const [campus, setCampus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(""); // Create state variables for the input fields
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };
  async function handleCreateProfileButton() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
      if (user) {
        try {
          // Insert into users table

          console.log("user", user.id);
          const { data: userData, error: userError } = await supabase
            .from("users")
            .update({
              name: name,
              campus_location: campus,
              image: image,
            })
            .eq("id", user.id)
            .select();

          if (userError) {
            alert("Failed to insert into users. " + userError.message);
            console.error("Error inserting into users:", userError.message);
            return;
          }

          // Insert into personal_users table
          const { data: personalData, error: creatorError } = await supabase
            .from("creator_users")
            .insert({
              id: user.id,
              name: name,
              username: userName,
              bio: bio,
              campus_location: campus,
            });

          if (creatorError) {
            alert(
              "Failed to insert into creator_users. " + creatorError.message
            );
            console.error(
              "Error inserting into creator_users:",
              creatorError.message
            );
            return;
          }

          // Profile creation successful
          alert("Profile creation successful.");
          navigation.navigate("NavBar", {
            isCreator: true,
          });
        } catch (error) {
          console.error("Error during profile creation:", error.message);
        }
      } else {
        alert("User is not signed in.");
      }
    } catch (error) {
      console.error("Error getting user session:", error.message);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appStyles.colors.background,
        justifyContent: "center",
        flexDirection: "column",
        rowGap: 30,
      }}
    >
      <View>
        <TouchableOpacity
          style={{ alignItems: "center", marginTop: 20 }}
          onPress={pickImage}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Text
              style={[
                appStyles.fonts.paragraph,
                {
                  textAlign: "center",
                  marginTop: 5,
                  textDecorationLine: "underline",
                },
              ]}
            >
              Add profile picture
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "column", rowGap: 15 }}>
        <View style={appStyles.sectionStyle}>
          <TextInput
            style={[styles.inputStyle, appStyles.fonts.paragraph]}
            onChangeText={(name) => setName(name)}
            underlineColorAndroid="#f000"
            placeholder="Organization Name"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
          />
        </View>
        <View style={appStyles.sectionStyle}>
          <TextInput
            style={[styles.inputStyle, appStyles.fonts.paragraph]}
            onChangeText={(userName) => setUserName(userName)}
            underlineColorAndroid="#f000"
            placeholder="Organization Username"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
          />
        </View>
        <LocationDropdown onLocationSelect={setCampus}></LocationDropdown>
        <View style={appStyles.sectionStyle}>
          <TextInput
            style={[styles.inputStyle, appStyles.fonts.paragraph]}
            onChangeText={(bio) => setBio(bio)}
            underlineColorAndroid="#f000"
            placeholder="Bio"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
          />
        </View>
      </View>
      <View
        style={[
          appStyles.layout.section,
          { flexDirection: "row", columnGap: 15 },
        ]}
      >
        <TouchableOpacity
          style={[styles.goBack, appStyles.shadow]}
          activeOpacity={0.5}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.buttonTextStyle}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            appStyles.buttons.yellowNoWidth,
            appStyles.shadow,
            { width: "35%" },
          ]}
          activeOpacity={0.5}
          onPress={handleCreateProfileButton}
        >
          <Text style={styles.buttonTextStyle}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomizeProfileCreator;
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "black",
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: "IBMPlexSans-Medium",
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
  goBack: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E2E2E2",
    width: "35%",
    alignItems: "center",
  },
  accBttn: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFC60A",
    width: "40%",
    alignItems: "center",
  },
});
