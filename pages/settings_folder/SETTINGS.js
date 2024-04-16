import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import supabase from "../../lib/supabase";
import appStyles from "../../styles";
import Modal from "react-native-modal";

const Settings = () => {
  const navigation = useNavigation();

  const navigateToPrivacy = () => {
    navigation.navigate("Privacy");
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
    setModalVisible(false);
    navigation.navigate("LoginScreen", { headerShown: false }); // Pass headerShown: false
  };

  return (
    <View style={styles.container}>
      {/* <View >
        <Text style={[appStyles.fonts.headingTwo, { marginTop: 20 }]}>Settings</Text>
      </View> */}
      <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          style={[appStyles.profileCard, appStyles.shadowInput]}
          onPress={navigateToPrivacy}
        >
          <Text style={appStyles.fonts.paragraph}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[appStyles.profileCard, appStyles.shadowInput]}
          onPress={navigateToAddSwitchAccounts}
        >
          <Text style={appStyles.fonts.paragraph}>Add/Switch Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[appStyles.profileCard, appStyles.shadowInput]}
          onPress={navigateToAccessibility}
        >
          <Text style={appStyles.fonts.paragraph}>Accessibility</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[appStyles.profileCard, appStyles.shadowInput]}
          onPress={navigateToEditAccount}
        >
          <Text style={appStyles.fonts.paragraph}>Edit Account</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={appStyles.buttons.yellowLogin}
          activeOpacity={0.5}
          onPress={toggleModal}
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
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalAlert}>
              Are you sure you would like to sign out?
            </Text>
            <View style={styles.modalOptionsContainer}>
              <TouchableOpacity
                onPress={toggleModal}
                style={[styles.modalOption, styles.modalOption1]}
              >
                <Text style={styles.modalOptionText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigateToLoginScreen}
                style={[styles.modalOption, styles.modalOption2]}
              >
                <Text style={styles.modalOptionText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  modal: {
    justifyContent: "center",
    alignItems: "center",
    paddingrRight: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "IBMPlexSans-Medium",
    fontSize: 20,
  },
  modalAlert: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: "center",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  modalOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
  },
  modalOption: {
    flex: 1,
    padding: 8,
    marginHorizontal: 6,

    padding: 8,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
  },
  modalOptionText: {
    color: "#fff", //
  },
  modalOption1: {
    backgroundColor: "#080808",
    paddingTop: 10,
    marginRight: 20,
  },
  modalOption2: {
    backgroundColor: "#FF460C",
    marginLeft: 20,
  },
});

export default Settings;
