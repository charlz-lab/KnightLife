const appStyles = {
  colors: {
    mainBackground: "#232323",
    foreground: "#222222",
    background: "#FFFFFF",
    accent1: "#080808",
    accent2: "#FFC60A",
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
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      padding: 10,
      backgroundColor: "black",
      width: "25%",
      alignItems: "center",
    },
  },
  fonts: {
    // paragraph text
    paragraph: {
      fontFamily: "IBMPlexSans-Medium",
      fontSize: 15,
    },
    // sub headings
    subHeading: {
      fontFamily: "IBMPlexSans-Regular",
      fontSize: 15,
    },
    // heading
    heading: {
      fontFamily: "Prompt-Bold",
      fontSize: 20,
    },
  },
  // drop shadow
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  shawdowInput: {
    shadowColor: "#000000",
    shadowOpacity: 0.40,
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
  textInput: {
    alignItems: "center",
    borderRadius: 12,
    height: 35,
    width: "70%",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    padding: 5,
  },
};
export default appStyles;
