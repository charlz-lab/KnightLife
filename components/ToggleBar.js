import { Text, TouchableOpacity, View } from "react-native"
import appStyles from "../styles.js"

const ToggleBar = (props) => {
  const tabs = props.tabs.map((tab, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={{
          borderRadius: 20,
          padding: 10,
          flex: 1,
          alignItems: "center",
          backgroundColor: props.selection === tab ? "#FFC60A" : "white",
        }}
        onPress={() => props.setSelection(tab)}>
        <Text
          style={[
            appStyles.fonts.paragraph,
            { color: "black", textTransform: "capitalize" },
          ]}>
          {tab}
        </Text>
      </TouchableOpacity>
    )
  })

  return (
    <View style={[appStyles.toggleContainer, appStyles.shadow]}>{tabs}</View>
  )
}

export default ToggleBar
