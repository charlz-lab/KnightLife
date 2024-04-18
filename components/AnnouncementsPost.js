import React, { useState } from "react";
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import appStyles from "../styles";
import supabase from "../lib/supabase";

const AnnouncementsPost = ({ fetchAnnouncements, event }) => {
  const [announcementText, setAnnouncementText] = useState('');
  const handlePostSubmission = async () => {
    if (!announcementText) {
      alert("Please enter an announcement");
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('event_updates')
      .insert([
        { event_id: event.id, update_text: announcementText, user_id: user.id },
      ]);
    fetchAnnouncements();
    if (error) {
      console.error(error);
      Alert.alert("Error posting announcement");
      return;
    } else {
      console.log("Announcement posted successfully");
    }
    setAnnouncementText('');

  };
  return (
    <Card borderRadius={12}>
      <View style={styles.container}>
        <TextInput
          style={[appStyles.textInput, appStyles.fonts.paragraph, styles.textInput]}
          placeholder="Create Anouncement..."
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
          multiline
          value={announcementText}
          onChangeText={setAnnouncementText}
        />
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={[appStyles.buttons.yellowNoWidth, styles.submitButton]}
            activeOpacity={0.5}
            onPress={handlePostSubmission}
          >
            <Text style={[appStyles.fonts.paragraph, styles.submitPost]}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    marginTop: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#8b9cb5",
    borderRadius: 8,
    opacity: .6,
    paddingHorizontal: 10,
    paddingVertical: 70,
    marginBottom: 10,
  },
  submitButton: {
    alignSelf: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  submitTag: {
    color: "black",
    paddingVertical: 0,
    paddingLeft: 4,
    paddingRight: 4,
  },
  submitPost: {
    color: "black",
    paddingVertical: 0,
    paddingLeft: 15,
    paddingRight: 15,

  },
});

export default AnnouncementsPost;
