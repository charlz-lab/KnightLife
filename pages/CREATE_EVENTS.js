const CREATE_EVENT = () => {
  // insert code here
  return (
    
    <View style={styles.container}>
      <Text style={styles.heading}>Create an event</Text>


      {/* Name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={handleNameChange}
        value={name}
        multiline={true}
      />
      {/* TextInput for bio input */}
      <TextInput
        style={styles.input}
        placeholder="Location"
        onChangeText={handleInput2Change}
        value={input2}
        multiline={true}
      />
      {/* TextInput for description input */}
      <TextInput
        style={styles.input}
        placeholder="Date"
        onChangeText={handleInput3Change}
        value={input3}
        multiline={true}
      />
      {/* Additional TextInput boxes */}
      <TextInput
        style={styles.input}
        placeholder="Time"
        onChangeText={handleInput4Change}
        value={input4}
        multiline={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={handleInput5Change}
        value={input5}
        multiline={true}
      />
      <TextInput
        style={styles.input}
        placeholder="External links"
        onChangeText={handleInput6Change}
        value={input6}
        multiline={true}
      />
     {/* Button to trigger an action with the entered information */}
     <Button title="Submit" onPress={handleButtonPress} />
      
      
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 25,
    marginBottom: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 2,
    marginTop: 20,
    padding: 8,
    width: '100%',
  },
})
export default CREATE_EVENT
