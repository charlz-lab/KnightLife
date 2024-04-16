import appStyles from "../styles";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function LocationDropdown(props) {
  const items = [
    "Main Campus",
    "Downtown",
    "Rosen College",
    "Cocoa Beach",
    "Other",
  ];
  const [showInput, setShowInput] = useState(false);
  const [otherLocation, setOtherLocation] = useState("");

  useEffect(() => {
    if (showInput) {
      props.onLocationSelect(otherLocation);
    }
  }, [otherLocation]);
  return (
    <>
      <SelectDropdown
        data={items}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setShowInput(selectedItem === "Other");
          if (selectedItem !== "Other") {
            props.onLocationSelect(selectedItem);
          }
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text
                style={
                  selectedItem == props.location
                    ? styles.dropdownButtonTxtStyleDefault
                    : styles.dropdownButtonTxtStyle
                }
              >
                {selectedItem || props.location || "Location"}
              </Text>
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      {showInput && (
        <View style={appStyles.sectionStyle}>
          <TextInput
            style={[appStyles.textInput, appStyles.fonts.paragraph]}
            placeholderTextColor="#8b9cb5"
            placeholder="Please specify"
            onChangeText={(text) => {
              setOtherLocation(text);
            }}
            value={otherLocation}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    height: 40,
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#dadae8",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    color: "black",
    fontFamily: appStyles.fonts.paragraph.fontFamily,
  },
  dropdownButtonTxtStyleDefault: {
    flex: 1,
    fontSize: 16,
    color: "#8b9cb5",
    fontFamily: appStyles.fonts.paragraph.fontFamily,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: "#8b9cb5",
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 10,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
    fontFamily: appStyles.fonts.paragraph.fontFamily,
  },
});
