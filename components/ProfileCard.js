import { Image, Pressable, Text, View } from "react-native";
import appStyles from "../styles";

const ProfileCard = (props) => {
  return (
    <View style={[appStyles.profileCard, appStyles.shadow]}>
      <View
        style={{
          flexDirection: "row-reverse",
          alignSelf: "flex-end",
          columnGap: 10,
        }}
      >
        <Pressable onPress={() => props.navigation.navigate("Settings")}>
          <Image
            source={require("../assets/icons/fi-br-settings.png")}
            style={{ width: 21, height: 21 }}
          ></Image>
        </Pressable>
        <Pressable
          onPress={() =>
            props.navigation.navigate("EDIT_PROFILE", props.profile)
          }
        >
          <Image
            source={require("../assets/icons/fi-br-edit.png")}
            style={{ width: 20, height: 20 }}
          ></Image>
        </Pressable>
      </View>
      <View style={appStyles.profileCard}>
        <Image
          source={props.profile.pic}
          style={{ width: 125, height: 125, borderRadius: 125 / 2 }}
        />
        <Text style={appStyles.fonts.heading}>{props.profile.name}</Text>
        <Text style={appStyles.fonts.paragraph}>{props.profile.username}</Text>
        <Text style={appStyles.fonts.paragraph}>{props.profile.location}</Text>
        {/* Render creator's bio if creator account; else render personal account's year and major */}
        {props.accountType === "creator" ? (
          <Text style={[appStyles.fonts.paragraph, { textAlign: "center" }]}>
            {props.profile.bio}
          </Text>
        ) : (
          <Text style={appStyles.fonts.paragraph}>
            {props.profile.year} - {props.profile.major}
          </Text>
        )}
      </View>

      {props.accountType === "creator" ? (
        <View style={{ flexDirection: "row", columnGap: 25, marginTop: 10 }}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={appStyles.fonts.paragraph}>
              {props.profile.eventsNum}
            </Text>
            <Text style={appStyles.fonts.paragraph}>Events</Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={appStyles.fonts.paragraph}>
              {props.profile.followersNum}
            </Text>
            <Text style={appStyles.fonts.paragraph}>Followers</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ProfileCard;
