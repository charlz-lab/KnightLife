import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import events from '../components/EventList';
import { Icon } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EventPage = ({ route }) => {
  const { event } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Text>{event.name}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

});

export default EventPage;

