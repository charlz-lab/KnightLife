import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appStyles from '../../styles';

const Privacy = () => {
  const [isPublic, setIsPublic] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '', // Remove the title from the header
      headerTintColor: '#000', 
    });
  }, [navigation]);

  const togglePrivacy = () => {
    setIsPublic(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={[appStyles.fonts.heading, styles.margin]}>Account Privacy:</Text>
      <TouchableOpacity
        style={[
          appStyles.buttons.buttonClick,
          appStyles.shawdowInput,
          {
            backgroundColor: isPublic ? '#FFC60A' : '#E2E2E2',
            borderColor: isPublic ? '#27ae60' : '#d4ac0d',
          },
        ]}
        onPress={togglePrivacy}
      >
        <Text style={[appStyles.fonts.paragraph, { color: isPublic ? '#fff' : '#333' }]}>
          {isPublic ? 'Public' : 'Private'}
        </Text>
      </TouchableOpacity>

      <Text style={[appStyles.fonts.paragraph, styles.margin2]}>
        Your account is set to {isPublic ? 'public' : 'private'}.{'\n'}
        {isPublic
          ? 'Anyone can see your profile and events.'
          : 'Only the followers that you approve will be able to see your profile and events.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    padding: 16,
    flex: 1,
  },
  margin: {
    marginBottom: 15,
  },
  margin2: {
    marginTop: 15,
    textAlign: 'center', // change to textAlign
  },
});

export default Privacy;

