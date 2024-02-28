import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import appStyles from "../../styles";

const Settings = () => {
  const navigation = useNavigation();

  const navigateToPrivacy = () => {
    navigation.navigate("Privacy");
  };

  const navigateToAddSwitchAccounts = () => {
    navigation.navigate("AddSwitchAccounts");
  };

  const navigateToAccessibility = () => {
    navigation.navigate("Accessibility");
  };

  const navigateToEditAccount = () => {
    navigation.navigate("EditAccount");
  };

  const navigateToLoginScreen = () => {
    navigation.navigate("LoginScreen", { headerShown: false }); // Pass headerShown: false
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={appStyles.fonts.headingTwo}>Settings</Text>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={[appStyles.profileCard, appStyles.shawdowInput]}
          onPress={navigateToPrivacy}
        >
          <Text style={appStyles.fonts.paragraph}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[appStyles.profileCard, appStyles.shawdowInput]}
          onPress={navigateToAddSwitchAccounts}
        >
          <Text style={appStyles.fonts.paragraph}>Add/Switch Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[appStyles.profileCard, appStyles.shawdowInput]}
          onPress={navigateToAccessibility}
        >
          <Text style={appStyles.fonts.paragraph}>Accessibility</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[appStyles.profileCard, appStyles.shawdowInput]}
          onPress={navigateToEditAccount}
        >
          <Text style={appStyles.fonts.paragraph}>Edit Account</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={appStyles.buttons.yellowLogin}
          activeOpacity={0.5}
          onPress={navigateToLoginScreen}
        >
          <Text
            style={[
              appStyles.fonts.paragraph,
              { color: "black", paddingVertical: 10 },
            ]}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    flexDirection: "column",
    rowGap: 80,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
    flex: 1,
  },
});

export default Settings;
