import React from "react"
import { StyleSheet } from "react-native"
import { View, Text } from "react-native"
import Modal from "react-native-modal"
import appStyles from "../styles"

const FilterModal = (props) => {
  const [isModalVisible, setIsModalVisible] = React.useState(true)
  console.log("Hello - from Filter")
  return (
    <View>
      <Modal
        style={styles.modalView}
        isVisible={isModalVisible}
        onSwipeComplete={() => setIsModalVisible(false)}>
        <View>
          <Text>Filter modal activated</Text>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: appStyles.colors.background,
    borderRadius: appStyles.profileCard.borderRadius,
  },
})

export default FilterModal
