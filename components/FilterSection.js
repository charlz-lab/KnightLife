import React from "react"
import { View, Text, Pressable, StyleSheet } from "react-native"
import appStyles from "../styles"
import Tag from "./Tag"

const FilterSection = (props) => {
  // render each option passed through props
  const optionList = props.options.map((option, index) => (
    <Tag name={option} key={index} />
  ))

  return (
    <View style={styles.listContainer}>
      {/* filter section header */}
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
      {/* filter section list of options */}
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
})

export default FilterSection
