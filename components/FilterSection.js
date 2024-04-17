import React, { useState } from "react"
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native"
import appStyles from "../styles"
import Tag from "./Tag"

const FilterSection = (props) => {
  // Manage tag states
  const [tagStates, setTagStates] = useState({})

  // Function to toggle tag state
  const toggleTag = (tag) => {
    setTagStates((prevStates) => ({
      ...prevStates,
      [tag]: !prevStates[tag],
    }))
  }

  // Function to clear all filter tags
  const clearList = () => setTagStates({})

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
          renderItem={({ item }) => (
            <Tag
              name={item}
              enabled={tagStates[item] || false}
              onPress={() => toggleTag(item)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
})

export default FilterSection
