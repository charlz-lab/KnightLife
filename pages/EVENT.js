import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { Card, Icon } from "react-native-elements";
import appStyles from "../styles";
import Modal from "react-native-modal";
import Ionicon from "react-native-vector-icons/FontAwesome";
import UpdateList from "../components/UpdateList";

const EventPage = ({ route, navigation }) => {
  const { event } = route.params;
  const handleBack = () => {
    navigation.goBack();
  };
  const [isBookmarked, setIsBookmarked] = useState(event.isBookmarked || false);
  const [isAttending, setIsAttending] = useState(false);
  const handleBookmarkToggle = () => {
    // Add your logic for toggling the bookmark state
    setIsBookmarked(!isBookmarked);
  };
  const handleAttendToggle = () => {
    // Add your logic for toggling the attendance state
    setIsAttending(!isAttending);
  };
  //report modal usestate
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalReportVisible, setModalReportVisible] = useState(false);
  // info modal usestate
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  //toggle showing modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleReportModal = () => {
    setModalVisible(false);
    setModalReportVisible(!isModalReportVisible);
  };
  // toggel info modal
  const toggleInfoModal = () => {
    setInfoModalVisible(!isInfoModalVisible);
  };
  const updateEvents = [
    {
      creatorName: "John Doe",
      profileImage: "https://example.com/profile.jpg",
      dateTime: "Jan 01",
      description:
        "All gear nessecary will be provided for this event! Make sure you sign up with the sign up link since there are limited spots.",
    },
  ];
  //function to navigate to the previous page

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={event.image} style={styles.image} />
        {/* close page button with icon*/}
        <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
          <Icon
            name="close"
            type="ionicon"
            size={25}
            color="white"
            style={styles.close}
          />
        </TouchableOpacity>
        {/* report button with icon */}
        <TouchableOpacity onPress={toggleModal} style={styles.reportButton}>
          <Icon
            name="alert-circle-outline"
            type="ionicon"
            size={25}
            color="#FFC60A"
            style={styles.report}
          />
        </TouchableOpacity>
        <Text style={styles.dateTime}>{event.dateTime}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{event.name}</Text>
        <Text style={styles.creator}>{event.creator}</Text>
        {/* location pin icon*/}
        <View style={styles.locationContainer}>
          <Icon
            name="location-sharp"
            type="ionicon"
            size={13}
            color="#676464"
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>{event.location}</Text>
        </View>
        <Text style={styles.membersGoing}>
          {event.membersGoing} Members Going{" "}
        </Text>
        {/* description card */}
        {/* <View style={styles.toggleContainer}> */}
        <Card borderRadius={12} style={[styles.shadow, styles.card]}>
          <Text style={{ fontFamily: "IBMPlexSans-Medium" }}>
            {event.description}
          </Text>
        </Card>
        {/* </View> */}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleBookmarkToggle} style={styles.bookmarkButton}>
          <View style={styles.bookmarkBox}>
            <Ionicon
              name={isBookmarked ? "bookmark" : "bookmark-o"}
              size={25}
              color="#FFC60A"
            />
          </View>
        </Pressable>

        {/* toggle attending button if isAttending true or false */}

        <Pressable
          onPress={handleAttendToggle}
          style={isAttending ? styles.attendingButton : styles.attendButton}
        >
          <Text style={[styles.attendButtonText]}>
            {isAttending ? "Attending" : "Attend"}
          </Text>
        </Pressable>
      </View>
      <View style={styles.signUpContainer}>
        <View style={{ flexDirection: "row", columnGap: 10 }}>
          <Text style={appStyles.fonts.paragraph}>Sign up link:</Text>
          <TouchableOpacity onPress={toggleInfoModal}>
            <Image
              source={require("../assets/icons/infoIcon.png")}
              style={{ marginTop: 1, width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            { textDecorationLine: "underline" },
            appStyles.fonts.paragraph,
          ]}
        >
          signuphereucf.com
        </Text>
      </View>
      <Text style={[styles.updateTitle, appStyles.fonts.subHeadingNoSize]}>
        Event Updates:
      </Text>
      <View style={styles.updateEventListContainer}>
        <UpdateList updateEvents={updateEvents} />
      </View>

      {/* modal for report button */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Report Event</Text>
          <Text style={styles.modalAlert}>
            Your safety is important to us. Our team works hard to monitor any
            suspicious behavior on our app. Please submit this report if an
            event is seen to be suspicious or unreliable. Your report will
            remain anonymous.
          </Text>
          <View style={styles.modalOptionsContainer}>
            <TouchableOpacity
              onPress={toggleModal}
              style={[styles.modalOption, styles.modalOption1]}
            >
              <Text style={styles.modalOptionText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleReportModal}
              style={[styles.modalOption, styles.modalOption2]}
            >
              <Text style={styles.modalOptionText}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={isModalReportVisible}
        onBackdropPress={toggleReportModal}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Report Submitted!</Text>
          <Text style={styles.modalAlert}>
          Thank you for expressing your concern. The KnightLife team will be reviewing the report shortly.          </Text>
          <View style={styles.modalOptionsContainer}>
            <TouchableOpacity
              onPress={toggleReportModal}
              style={[styles.modalReportOption, styles.modalOption1]}
            >
              <Text style={styles.modalOptionText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* modal for info button */}
      <Modal
        isVisible={isInfoModalVisible}
        onBackdropPress={toggleInfoModal}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Disclaimer</Text>
          <Text style={styles.modalAlert}>
            Choosing to attend an event is not the same as signing up for the
            event itself. Please use the sign up link to sign up for this event
            externally.
          </Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "cover", // Adjust the resizeMode as needed
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: "#fff",
  },
  reportButton: {
    position: "absolute",
    top: 300,
    right: 10,
    padding: 8,
    backgroundColor: "#080808",
    borderRadius: 8,
  },
  name: {
    fontSize: 24,
    fontFamily: "Prompt-Bold",
  },
  creator: {
    fontSize: 20,
    marginTop: 5,
    fontFamily: "IBMPlexSans-Medium",
  },
  closeButton: {
    position: "absolute",
    top: 45,
    left: 16,
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 8,
  },
  dateTime: {
    position: "absolute",
    top: 45,
    right: 16,
    padding: 8,
    backgroundColor: "#080808",
    color: "#FFC60A",
    borderRadius: 12,
    fontSize: 15,
  },
  locationContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  locationIcon: {
    marginRight: 3,
  },
  locationText: {
    fontSize: 13,
    color: "#676464",
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card: {
    paddingTop: 10,
  },
  membersGoing: {
    color: "#676464",
    fontSize: 12,
    fontFamily: "IBMPlexSans-Regular",
    marginTop: 15,
    textDecorationLine: "underline",
    paddingBottom: 10,
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
    width: "80%",
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
  },
  modalOption2: {
    backgroundColor: "#FF460C",
  },
  modalReportOption: {
    flex: 1,
    padding: 8,
    marginHorizontal: 55,
    width: 10,
    padding: 8,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
  },
  buttonContainer: {
    flexDirection: "row",
    height: 65,
    alignItems: "center",
    alignSelf: "center",
    columnGap: 10,
    margin: 1,
  },
  bookmarkButton: {
    padding: 8,
    paddingTop: 10,
  },
  bookmarkBox: {
    backgroundColor: "#080808",
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 15,
    height: "96%",
  },
  attendButton: {
    width: "70%",
    borderRadius: 30,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 0,
    alignItems: "center",
    backgroundColor: "#FFC60A",
    borderColor: "#FFC60A",
  },
  attendingButton: {
    backgroundColor: "#FDF5E6",
    borderColor: "#FFC60A",
    borderWidth: 2,
    width: "70%",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  attendButtonText: {
    color: "#080808",
    fontFamily: "IBMPlexSans-Medium",
    fontSize: 16,
  },
  toggleContainer: {
    // Add any styles for the toggle container here
  },
  updateEventListContainer: {
    // Add any styles for the update event list container here
    justifyContent: "center",
    backgroundColor: "white",
    paddingBottom: 20,
    marginBottom: 30,
    borderRadius: 30,
  },
  updateTitle: {
    backgroundColor: "white",
    fontSize: 20,
    color: "#080808",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  signUpContainer: {
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
});

export default EventPage;
