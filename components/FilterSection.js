import React from "react"
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native"
import appStyles from "../styles"
import Tag from "./Tag"

const FilterSection = (props) => {
  // clear all filter tags
  const [isTagEnabled, setTagEnabled] = React.useState(false)
  const clearList = () => setTagEnabled(false)

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
      <View style={styles.listContainer}>
        {/* render each tag passed through props */}
        <FlatList
          data={props.tags}
          renderItem={({ item }) => <Tag name={item} enabled={isTagEnabled} />}
          contentContainerStyle={styles.listContainer}
        />
      </View>
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
