import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
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
  //toggle showing modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const updateEvents = [
    {
      creatorName: "John Doe",
      profileImage: "https://example.com/profile.jpg",
      dateTime: "Jan 01",
      description: "Join us for an exciting event!",
    },
  ];
  //function to navigate to the previous page

  return (
    <View style={styles.container}>
      <Image source={event.image} style={styles.image} />
      {/* close page button with icon*/}
      <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
        <Icon
          name="close"
          type="ionicon"
          size={25}
          color="#676464"
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
        <View style={styles.toggleContainer}>
          <Card
            width="225"
            borderRadius={12}
            style={[styles.shadow, styles.card]}
          >
            <Text style={{ fontFamily: "IBMPlexSans-Medium " }}>
              {event.description}
            </Text>
          </Card>
        </View>
        {/* <Text style={styles.updateTitle}>Updates!</Text>
        <UpdateList updateEvents={updateEvents} />*/}
        <TouchableOpacity
          onPress={handleBookmarkToggle}
          style={styles.bookmarkButton}
        >
          <View style={styles.bookmarkBox}>
            <Ionicon
              name={isBookmarked ? "bookmark" : "bookmark-o"}
              size={25}
              color="#FFC60A"
            />
          </View>
        </TouchableOpacity>
        {/* toggle attending button if isAttending true or false */}
        <TouchableOpacity
          onPress={handleAttendToggle}
          style={isAttending ? styles.attendingButton : styles.attendButton}
        >
          <Text style={[styles.attendButtonText]}>
            {isAttending ? "Attending" : "Attend"}
          </Text>
        </TouchableOpacity>
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
              onPress={toggleModal}
              style={[styles.modalOption, styles.modalOption2]}
            >
              <Text style={styles.modalOptionText}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "cover", // Adjust the resizeMode as needed
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
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
    borderRadius: 8,
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
  bookmarkButton: {
    position: "absolute",
    top: 285,
    left: 27,
    padding: 8,
    paddingTop: 10,
  },
  bookmarkBox: {
    backgroundColor: "#080808",
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  attendButton: {
    position: "absolute",
    top: 295,
    right: 35, // Adjust the position as needed
    padding: 12,
    backgroundColor: "#FFC60A",
    borderRadius: 20,
    width: 260,
    alignItems: "center",
    justifyContent: "center",
  },
  attendingButton: {
    position: "absolute",
    top: 295,
    right: 35, // Adjust the position as needed
    padding: 10,
    backgroundColor: "#FDF5E6",
    borderColor: "#FFC60A",
    borderWidth: 2,
    borderRadius: 20,
    width: 260,
    alignItems: "center",
    justifyContent: "center",
  },
  attendButtonText: {
    color: "#080808",
    fontFamily: "IBMPlexSans-Medium",
    fontSize: 16,
  },
  toggleContainer: {
    marginBottom: 80,

    // Add any styles for the toggle container here
  },
  updateEventListContainer: {
    // Add any styles for the update event list container here
    justifyContent: "center",
    backgroundColor: "white",
    paddingBottom: 20,
  },
  updateTitle: {
    backgroundColor: "white",
    fontSize: 20,
    color: "#080808",
    fontFamily: "IBMPlexSans-Medium",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default EventPage;
