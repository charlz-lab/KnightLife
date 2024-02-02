import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import appStyles from '../styles';

const AccountType = ({navigation}) => {

  return (
    <View style={styles.mainBody}>
        
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
            <View style={{alignItems: 'center'}}>
              <Text style={appStyles.fonts.headingTwo}>
            Account Types
              </Text>
            </View>
            
        <View style={appStyles.layout.section}>
            <TouchableOpacity
              style={appStyles.buttons.black}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("RegisterScreenPersonal")}>
              <Text style={styles.buttonTextStyle}>Personal Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={appStyles.buttons.black}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("RegisterScreenCreator")}>
              <Text style={styles.buttonTextStyle}>Creator Account</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
export default AccountType;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});