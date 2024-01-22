import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Card from '../knightlife/components/EventCard'
import Home from './pages/HOME';
import * as Font from 'expo-font';
export default function App() {

  return (
    <View styles={styles.container}>
      <Home />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 40
  }
})


