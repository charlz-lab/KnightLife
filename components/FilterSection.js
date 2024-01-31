import React from "react"
import { View, Text, Pressable, StyleSheet } from "react-native"
import appStyles from "../styles"

const FilterSection = (props) => {
  const optionList = props.options.map((option, index) => (
    <Pressable id={index}>
      <Text style={[appStyles.fonts.paragraph, styles.tag, styles.disabled]}>
        {option}
      </Text>
    </Pressable>
  ))

  return (
    <View style={styles.listContainer}>
      <View
        style={[
          appStyles.layout.horizontal,
          { width: "100%", marginBottom: 8 },
        ]}>
        <Text style={appStyles.fonts.heading2}>{props.title}</Text>
        <Pressable>
          <Text style={appStyles.fonts.actionText}>Clear</Text>
        </Pressable>
      </View>
      <View style={styles.listContainer}>{optionList}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 8,
    marginBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  tag: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 22,
    textAlign: "center",
  },
  disabled: {
    borderColor: appStyles.colors.inactive,
  },
})

export default FilterSection
