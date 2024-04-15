import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import appStyles from "../styles";

const AccountType = ({ navigation }) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View style={styles.mainBody}>
        <View style={[appStyles.layout.section, { marginTop: -40 }]}>
          <TouchableOpacity
            style={styles.accountTypeBttn}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("RegisterScreenPersonal")}
          >
            <Text style={styles.buttonTextStyle}>Personal Account</Text>
          </TouchableOpacity>
          <View style={styles.descripContainer}>
            <Text style={appStyles.fonts.paragraph}>
              “I am interested in attending events happening around me!”
            </Text>
          </View>
          <TouchableOpacity
            style={styles.accountTypeBttn}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("RegisterScreenCreator")}
          >
            <Text style={styles.buttonTextStyle}>Creator Account</Text>
          </TouchableOpacity>
          <View style={styles.descripContainer}>
            <Text style={appStyles.fonts.paragraph}>
              “I want to create events, have the ability to promote them, and
              manage my event demographics!”
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default AccountType;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    alignContent: "center",
  },
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
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: "IBMPlexSans-Medium",
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  accountTypeBttn: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "black",
    width: "70%",
    alignItems: "center",
    zIndex: 1,
  },
  descripContainer: {
    marginTop: -20,
    paddingVertical: 10,
    paddingTop: 30,
    paddingHorizontal: 20,
    borderRadius: 0,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    padding: 10,
    backgroundColor: "#F8F8F8",
    width: "70%",
    position: "relative",
  },
});
