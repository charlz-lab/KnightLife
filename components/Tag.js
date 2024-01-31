import React from "react"
import { Text, Pressable, StyleSheet } from "react-native"
import appStyles from "../styles"

const Tag = (props) => {
  const [isTagEnabled, setTagEnabled] = React.useState(props.enabled)
  const toggleTag = () => setTagEnabled(!isTagEnabled)

  return (
    <Pressable key={props.key} onPress={toggleTag}>
      <Text
        style={[
          appStyles.fonts.paragraph,
          styles.tag,
          isTagEnabled ? styles.enabled : styles.disabled,
        ]}>
        {props.name}
      </Text>
    </Pressable>
  )
}

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
})

export default Tag
