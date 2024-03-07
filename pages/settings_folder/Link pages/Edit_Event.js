import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import appStyles from "../styles";
import EventList from "../components/EventList";
import AttendingEventList from "../components/AttendingEventList";
import SavedEventList from "../components/SavedEventList";

export const Edit_Event = ({ navigation, route }) => {
    let [profile, setProfile] = useState(route.params);
  
    const saveAlert = () =>
      Alert.alert(
        "Save Changes",
        "Are you sure you would like to save your changes?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Save",
            onPress: () => {
              profile.isCreator
                ? navigation.navigate("Creator Profile", { profile: profile })
                : navigation.navigate("Personal Profile", { profile: profile });
            },
          },
        ]
      );
    return (
      <>
        <View style={styles.editContainer}>
          <View
            style={{
              flexDirection: "column",
              rowGap: 5,
              alignItems: "center",
              marginTop: 25,
            }}
          >
            <Image source={profile.pic} style={{ width: 125, height: 125 }} />
            <Text style={appStyles.fonts.paragraph}>Change photo</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "90%",
              alignItems: "center",
              rowGap: 5,
            }}
          >
            <Text style={appStyles.fonts.subHeading}>Profile Name:</Text>
            <View style={appStyles.sectionStyle}>
              <TextInput
                value={profile.name}
                onChangeText={(value) => setProfile({ ...profile, name: value })}
                style={[appStyles.fonts.paragraph, appStyles.textInput]}
                placeholder="Profile Name"
                placeholderTextColor={"black"}
              />
            </View>
            <Text style={appStyles.fonts.subHeading}>Username:</Text>
            <View style={appStyles.sectionStyle}>
              <TextInput
                value={profile.username}
                onChangeText={(value) =>
                  setProfile({ ...profile, username: value })
                }
                style={[appStyles.fonts.regular, appStyles.textInput]}
              />
            </View>
            <Text style={appStyles.fonts.subHeading}>Campus Location:</Text>
            <View style={appStyles.sectionStyle}>
              <TextInput
                value={profile.location}
                onChangeText={(value) =>
                  setProfile({ ...profile, location: value })
                }
                style={[appStyles.fonts.regular, appStyles.textInput]}
              />
            </View>
            {profile.isCreator ? (
              <>
                <Text style={appStyles.fonts.subHeading}>Bio:</Text>
                <View style={appStyles.sectionStyle}>
                  <TextInput
                    value={profile.bio}
                    onChangeText={(value) =>
                      setProfile({ ...profile, bio: value })
                    }
                    style={[appStyles.fonts.paragraph, appStyles.textInput]}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={appStyles.fonts.subHeading}>Year:</Text>
                <View style={appStyles.sectionStyle}>
                  <TextInput
                    value={profile.year}
                    onChangeText={(value) =>
                      setProfile({ ...profile, year: value })
                    }
                    style={[appStyles.fonts.paragraph, appStyles.textInput]}
                  />
                </View>
                <Text style={appStyles.fonts.subHeading}>Major:</Text>
                <View style={appStyles.sectionStyle}>
                  <TextInput
                    value={profile.major}
                    onChangeText={(value) =>
                      setProfile({ ...profile, major: value })
                    }
                    style={[appStyles.fonts.paragraph, appStyles.textInput]}
                  />
                </View>
              </>
            )}
          </View>
          <View style={{ flexDirection: "row", columnGap: 5, marginTop: 20 }}>
            <Pressable
              style={[appStyles.buttons.yellow, appStyles.shadow]}
              onPress={saveAlert}
            >
              <Text style={appStyles.fonts.paragraph}>Save</Text>
            </Pressable>
            <Pressable
              style={[appStyles.buttons.black, appStyles.shadow]}
              onPress={() => {
                profile.isCreator
                  ? navigation.navigate("Creator Profile")
                  : navigation.navigate("Personal Profile");
              }}
            >
              <Text style={[{ color: "white" }, appStyles.fonts.paragraph]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  };