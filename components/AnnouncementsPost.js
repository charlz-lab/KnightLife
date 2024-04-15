import React from "react";
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import appStyles from "../styles";

const AnnoucementsPost = ({ updateAnnoucements }) => {
    return (
        <Card borderRadius={12}>
          <View style={styles.container}>
            <TextInput
              style={[appStyles.textInput, appStyles.fonts.paragraph, styles.textInput]}
              placeholder="Create Anouncement..."
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              multiline
            />
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[appStyles.buttons.yellowNoWidth, styles.submitButton]}
              activeOpacity={0.5}
            >
              <Text style={[appStyles.fonts.paragraph, styles.submitTag]}>Add Tag</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[appStyles.buttons.yellowNoWidth, styles.submitButton]}
              activeOpacity={0.5}
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
  
export default AnnoucementsPost;
