// AddSwitchAccounts.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import appStyles from "../../styles";

const userAccounts = [
  {
    profilePic: require("../../images/janeDoeProfile.png"),
    profileName: "Jane Doe",
    accountType: "Personal",
  },
  {
    profilePic: require("../../images/chessClubPic.png"),
    profileName: "Chess Club",
    accountType: "Creator",
  },
];

const AddSwitchAccounts = ({ navigation }) => {
  const [activeAccount, setActiveAccount] = useState(1);
  const [accountCount, setAccountCount] = useState(2);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the title from the header
      headerTintColor: "#000",
    });
  }, [navigation]);

  const switchAccount = (index) => {
    setActiveAccount(index);
  };

  const navigateToCreateAccount = () => {
    navigation.navigate("CreateAccount");
    // Increment account count when navigating to create account
    setAccountCount(accountCount + 1);
    // Set the newly created account as active
    setActiveAccount(accountCount + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={appStyles.fonts.heading}>Add/Switch Accounts</Text>

      {userAccounts.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.accountCard,
            appStyles.shadowInput,
            {
              backgroundColor:
                activeAccount === index + 1 ? "#FDF5E6" : "white",
              borderColor: activeAccount === index + 1 ? "#FFC60A" : "white",
            },
          ]}
          onPress={() => switchAccount(index + 1)}
        >
          <Image source={_.profilePic} style={{ width: 60, height: 60 }} />
          <View style={{ marginTop: 10 }}>
            <Text style={[appStyles.fonts.paragraphNoSize, { fontSize: 20 }]}>
              {_.profileName}
            </Text>
            <Text
              style={[
                appStyles.fonts.paragraphNoSize,
                { fontSize: 15, color: "#676464" },
              ]}
            >
              {_.accountType}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={navigateToCreateAccount}>
        <Image
          source={require("../../assets/icons/fi-br-add.png")}
          style={{ width: 25, height: 25 }}
        />
        <Text style={[appStyles.fonts.paragraph, { color: "white" }]}>
          Add Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "top",
    padding: 16,
    flex: 1,
  },
  accountContainer: {
    flexDirection: "row",
    alignContent: "left",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText1: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  accountCard: {
    width: "85%",
    borderRadius: 25,
    paddingVertical: 17,
    paddingHorizontal: 22,
    gap: 10,
    marginVertical: 20,
    flexDirection: "row",
    borderWidth: 2,
  },
  button: {
    backgroundColor: "black",
    width: "50%",
    borderRadius: 30,
    paddingVertical: 17,
    paddingHorizontal: 22,
    gap: 10,
    alignItems: "center",
    marginVertical: 20,
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: 25,
  },
});

export default AddSwitchAccounts;
