const EVENT = () => {
  // insert code here
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Beginner Chess Workshop</Text>
      <Text style={styles.subheading}>UCF Chess' Club</Text>
      <Text style={styles.location}>UCF Downtown, Orlando</Text>
      <Text style={styles.paragraph}>
      Come learn the basic rules and fundamentals of the game of chess. No experience necessary, experienced players are also welcome!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subheading: {
    fontSize: 18,
    color: 'gray',
  },
  location: {
    fontSize: 16,
    color: 'green',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    marginBottom: 24,
  },
});

export default EventPage;

