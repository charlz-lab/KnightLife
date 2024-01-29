import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

import { Card, Icon } from 'react-native-elements';

import appStyles from '../styles';
import Modal from 'react-native-modal';

const EventPage = ({ route, navigation }) => {
  const { event } = route.params;
  const handleBack = () => {
    navigation.goBack();
  };
  //report modal usestate
  const [isModalVisible, setModalVisible] = useState(false);
  //toggle showing modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  //function to navigate to the previous page

  return (
    <View style={styles.container}>
      <Image source={event.image} style={styles.image} />
      {/* close page button*/}
      <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
        <Icon
          name="close"
          type='ionicon'
          size={25}
          color="#676464"
          style={styles.close}
        />
      </TouchableOpacity>
      {/* report button  */}
      <TouchableOpacity onPress={toggleModal} style={styles.reportButton}>
        <Icon
          name="alert-circle-outline"
          type='ionicon'
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
            type='ionicon'
            size={13}
            color="#676464"
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>{event.location}</Text>

        </View>
        <Text style={styles.membersGoing}>{event.membersGoing} Members Going </Text>
        {/* description card */}
        <View>
          <Card width="225" borderRadius={12} style={[styles.shadow, styles.card]}><Text>{event.description}</Text></Card>
        </View>
      </View>
      {/* modal for report button */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Report Event</Text>
          <View style={styles.modalOptionsContainer}>
            <TouchableOpacity onPress={toggleModal} style={styles.modalOption}>
              <Text>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.modalOption}>
              <Text>Cancel</Text>
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
    width: '100%',
    height: 350,
    resizeMode: 'cover', // Adjust the resizeMode as needed
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  reportButton: {
    position: 'absolute',
    top: 300,
    right: 10,
    padding: 8,
    backgroundColor: "#080808",
    borderRadius: 8,
  },
  name: {
    fontSize: 24,
    fontFamily: "Prompt-Bold"
  },
  creator: {
    fontSize: 20,
    marginTop: 5,
    fontFamily: "IBMPlexSans-Medium"
  },
  closeButton: {
    position: 'absolute',
    top: 45,
    left: 16,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  dateTime: {
    position: 'absolute',
    top: 45,
    right: 16,
    padding: 8,
    backgroundColor: '#080808',
    color: "#FFC60A",
    borderRadius: 12,
    fontSize: 15
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  locationIcon: {
    marginRight: 3
  },
  locationText: {
    fontSize: 13,
    color: "#676464",

  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card: {
    paddingTop: 10
  },
  membersGoing: {
    color: "#676464",
    fontSize: 12,
    fontFamily: "IBMPlexSans-Regular",
    marginTop: 15,
    textDecorationLine: 'underline',
    paddingBottom: 10
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingrRight: 20
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalOptionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalOption: {
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#FFC60A",
    borderRadius: 12,
    width: 120,
    alignItems: 'center'
  },
});

export default EventPage;

