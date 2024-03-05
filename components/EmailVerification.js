import appStyles from "../styles";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

export default function EmailVerification({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={[appStyles.fonts.headingTwo, { textAlign: "center" }]}>
        You're almost {"\n"} done!
      </Text>
      <Card
        borderRadius={12}
        style={{ paddingHorizontal: 50, paddingVertical: 100 }}
      >
        <Text style={appStyles.fonts.paragraph}>
          Please check your email to verify your account and finish the sign up
          process
        </Text>
      </Card>
      <TouchableOpacity
        style={appStyles.buttons.yellowLogin}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={[appStyles.fonts.paragraph, { padding: 10 }]}>
          Return to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    rowGap: 80,
    padding: 20,
    backgroundColor: "white",
    height: "100%",
  },
});
