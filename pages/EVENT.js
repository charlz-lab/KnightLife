import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import events from '../components/EventList';
import { Card, Icon } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appStyles from '../styles';

const EventPage = ({ route, navigation }) => {
  const { event } = route.params;
  //function to navigate to the previous page
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Image source={event.image} style={styles.image} />
      <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
        <Icon
          name="close"
          type='ionicon'
          size={25}
          color="#676464"
          style={styles.locationIcon}
        />
      </TouchableOpacity>
      <Text style={styles.dateTime}>{event.dateTime}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{event.name}</Text>
        <Text style={styles.creator}>{event.creator}</Text>
        {/* Add more details or components as needed */}
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
        <View>
          <Card width="225" borderRadius={12} style={[styles.shadow, styles.card]}><Text>{event.description}</Text></Card>
        </View>
      </View>

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
    borderRadius: 12
  },
  membersGoing: {
    color: "#676464",
    fontSize: 12,
    fontFamily: "IBMPlexSans-Regular",
    marginTop: 15,
    textDecorationLine: 'underline'
  },
});

export default EventPage;

