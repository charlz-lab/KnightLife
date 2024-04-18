import React, { useState, useEffect } from "react";
import appStyles from "../styles";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  KeyboardAccessoryView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import LocationDropdown from "./LocationDropdown";

import supabase from "../lib/supabase";
import * as ImagePicker from "expo-image-picker";
function CustomizeProfilePersonal({ navigation, route, session }) {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [campus, setCampus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(""); // Create state variables for the input fields
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const { height } = Dimensions.get("window");
  const [selectedImage, setSelectedImage] = useState(null);
  // Calculate the accessory view height based on the platform
  const accessoryViewHeight = Platform.select({
    ios: height * 0.2,
    android: 0,
  });

  async function handleCreateProfileButton() {
    let newImageUrl = null;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
      if (user) {
        try {
          // Insert into users table
          if (selectedImage && selectedImage.uri) {
            const arraybuffer = await fetch(selectedImage.uri).then((res) => res.arrayBuffer());
            const fileExt = selectedImage.uri.split('.').pop().toLowerCase();
            const path = `${Date.now()}.${fileExt}`;
            const { data, error: uploadError } = await supabase.storage
              .from('profile-pics')
              .upload(path, arraybuffer, {
                contentType: selectedImage.mimeType ?? 'image/jpeg',
              });

            if (uploadError) {
              console.log("Error uploading image", uploadError);
              return;
            }
            //set newImageUrl 
            newImageUrl = `https://dtfxsobdxejzzasfiiwe.supabase.co/storage/v1/object/public/profile-pics/${data.path}`;
          }
          console.log("user", user.id);
          console.log("newImageUrl", newImageUrl)
          const { data: userData, error: userError } = await supabase
            .from("users")
            .update({
              name: name,
              username: userName,
              campus_location: campus,

            })
            .eq("id", user.id)
            .select();

          if (userError) {
            alert("Failed to insert into users. " + userError.message);
            console.error("Error inserting into users:", userError.message);
            return;
          }

          // Insert into personal_users table
          const { data: personalData, error: personalError } = await supabase
            .from("personal_users")
            .insert({
              id: user.id,
              username: userName,
              name: name,
              school_year: year,
              major: major,
              campus_location: campus,
              image: newImageUrl,
            });

          if (personalError) {
            alert(
              "Failed to insert into personal_users. " + personalError.message
            );
            console.error(
              "Error inserting into personal_users:",
              personalError.message
            );
            return;
          }

          // Profile creation successful
          alert("Profile creation successful.");
          navigation.navigate("NavBar", {
            isCreator: false,
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
  const selectProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 1,
      exif: false,
    });
    console.log(result);
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0]);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      accessoryViewStyle={{ height: accessoryViewHeight }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: appStyles.colors.background }}
        contentContainerStyle={{ height: 700 }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: appStyles.colors.background,
            justifyContent: "top",
            flexDirection: "column",
            rowGap: 35,
          }}
        >
          <View>
            <TouchableOpacity
              style={{ alignItems: "center", marginTop: 40 }}
              onPress={selectProfileImage}
            >
              {selectedImage ? (
                <Image
                  source={selectedImage}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <Image
                  source={require("../images/profilePic_placeholder.png")}
                  style={{ width: 100, height: 100 }}
                />
              )}
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
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "column", rowGap: 15 }}>
            <View style={appStyles.sectionStyle}>
              <TextInput
                style={[styles.inputStyle, appStyles.fonts.paragraph]}
                onChangeText={(userName) => setUserName(userName)}
                underlineColorAndroid="#f000"
                placeholder="Username"
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
                onChangeText={(name) => setName(name)}
                underlineColorAndroid="#f000"
                placeholder="Name"
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
                onChangeText={(school_year) => setYear(school_year)}
                underlineColorAndroid="#f000"
                placeholder="School year"
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
                onChangeText={(major) => setMajor(major)}
                underlineColorAndroid="#f000"
                placeholder="Major"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>
            <LocationDropdown onLocationSelect={setCampus}></LocationDropdown>
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
              disabled={!supabase.auth.getUser()}
            >
              <Text style={styles.buttonTextStyle}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CustomizeProfilePersonal;
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
