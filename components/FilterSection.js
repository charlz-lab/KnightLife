import React from "react"
import { View, Text, Pressable, StyleSheet } from "react-native"
import appStyles from "../styles"
import Tag from "./Tag"

const FilterSection = (props) => {
  // clear all filter tags
  const [isTagForcedDisabled, setTagForceDisabled] = React.useState(false)
  const clearList = () => setTagForceDisabled(true)

  // render each tags passed through props
  const tagsList = props.tags.map((tag, index) => (
    <Tag name={tag} key={index} forceDisabled={isTagForcedDisabled} />
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
        <Pressable onPress={clearList}>
          <Text style={appStyles.fonts.actionText}>Clear</Text>
        </Pressable>
      </View>
      {/* filter section list of tags */}
      <View style={styles.listContainer}>{tagsList}</View>
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
