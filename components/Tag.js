import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import appStyles from "../styles";

const Tag = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <Text
        style={[
          appStyles.fonts.paragraph,
          styles.tag,
          props.enabled ? styles.enabled : styles.disabled,
        ]}
      >
        {props.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 22,
    textAlign: "center",
    overflow: "hidden",
  },
  disabled: {
    borderColor: appStyles.colors.inactive,
  },
  enabled: {
    borderColor: appStyles.colors.accent2,
    backgroundColor: appStyles.colors.lightAccent,
  },
});

export default Tag;

