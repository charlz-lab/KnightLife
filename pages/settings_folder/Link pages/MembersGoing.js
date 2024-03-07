import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import appStyles from "../../../styles";

const MembersAccounts = [
  {
    profilePic: require("../../../images/profilePic_placeholder.png"),
    profileName: "Sierra Williams",
  },
  {
    profilePic: require("../../../images/profilePic_placeholder.png"),
    profileName: "Julia Zapata",
  },
  {
    profilePic: require("../../../images/profilePic_placeholder.png"),
    profileName: "David Thompson",
  },
  {
    profilePic: require("../../../images/profilePic_placeholder.png"),
    profileName: "Jorge Osorio",
  },
  {
    profilePic: require("../../../images/profilePic_placeholder.png"),
    profileName: "Cristina Bettaglio",
  },
  {
    profilePic: require("../../../images/profilePic_placeholder.png"),
    profileName: "Jessie Jalca",
  },
  {
    profilePic: require("../../../images/profilePic_placeholder.png"),
    profileName: "Tommy Le",
  },
  {
    profilePic: require("../../../images/profilePic_placeholder.png"),
    profileName: "Charlie Carpenter",
  },
];

const MembersGoing = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the title from the header
      headerTintColor: "#000",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={appStyles.fonts.heading}>Members Going</Text>
      <Text style={appStyles.fonts.paragraph}>Total Members: {""}</Text>

      <ScrollView contentContainerStyle={[styles.scrollView, { paddingTop: 20 }]}>
        {MembersAccounts.map((member, index) => (
          <View key={index} style={[styles.accountCard, appStyles.shadowInput]}>
            <Image source={member.profilePic} style={{ width: 60, height: 60 }} />
            <View style={{ marginLeft: 10 }}>
              <Text style={[appStyles.fonts.paragraphNoSize, { fontSize: 20 }]}>
                {member.profileName}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the top
    padding: 16,
    flex: 1,
  },
  accountCard: {
    width: "100%",
    borderRadius: 25,
    paddingVertical: 17,
    paddingHorizontal: 22,
    marginVertical: 10, // Use marginVertical instead of gap
    flexDirection: "row",
    borderWidth: 2,
    alignItems: "center", // Align items vertically
  },
});

export default MembersGoing;
