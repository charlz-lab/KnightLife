const appStyles = {
  colors: {
    mainBackground: "#232323",
    foreground: "#222222",
    background: "#FFFFFF",
    accent1: "#080808",
    accent2: "#FFC60A",
    lightAccent: "#FDF5E6",
    inactive: "#E2E2E2",
  },
  buttons: {
    yellow: {
      borderRadius: 20,
      padding: 10,
      backgroundColor: "#FFC60A",
      width: "25%",
      alignItems: "center",
    },
    black: {
      borderRadius: 20,
      padding: 10,
      backgroundColor: "black",
      width: "25%",
      alignItems: "center",
    },
    white: {
      borderRadius: 20,
      padding: 10,
      backgroundColor: "white",
      width: "25%",
      alignItems: "center",
    },
  },
  fonts: {
    // paragraph text
    paragraph: {
      fontFamily: "IBMPlexSans-Medium",
      fontSize: 16,
    },
    // sub headings
    subHeading: {
      fontFamily: "IBMPlexSans-Bold",
      fontSize: 16,
      textTransform: "uppercase",
    },
    // heading
    heading: {
      fontFamily: "Prompt-Bold",
      fontSize: 20,
    },
    // heading 2
    heading2: {
      fontFamily: "IBMPlexSans-Bold",
      fontSize: 16,
    },
    // action text
    actionText: {
      fontFamily: "IBMPlexSans-Bold",
      fontSize: 14,
      color: "#676464",
    },
  },
  layout: {
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    },
  },
  // drop shadow
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileCard: {
    backgroundColor: "white",
    width: "85%",
    borderRadius: 12,
    paddingVertical: 17,
    paddingHorizontal: 22,
    gap: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    columnGap: 15,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 10,
  },
  textInput: {
    borderRadius: 12,
    height: 35,
    width: "70%",
    backgroundColor: "white",
    padding: 5,
  },
};
export default appStyles;