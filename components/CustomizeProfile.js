import React, { useState, useEffect } from 'react'
import appStyles from "../styles";
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import supabase from '../lib/supabase';
function CustomizeProfile({ props, route }) {
    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [major, setMajor] = useState("")
    const [campus, setCampus] = useState("")
    const [loading, setLoading] = useState(false)
    const [errortext, setErrortext] = useState("")  // Create state variables for the input fields
    const [userName, setUserName] = useState("")
    const { session } = route.params;
    supabase.auth.setSession(session)
    const handleCreateProfileButton = async () => {

        try {

            if (session && user) {
                // Use the email from the user object

                try {
                    // Update the user's profile with the input fields

                    const userId = session.user.id

                    const { data: { session } } = supabase.auth.getSession();
                    const { data: { user } } = supabase.auth.getUser();
                    const userEmail = session.user.email;
                    const userPassword = session.user.password
                    const { data: userData, error: userError } = await supabase
                        .from('users')
                        .insert([
                            {
                                id: userId,
                                username: userName,
                                email: userEmail,
                                password: userPassword,
                                campus_location: campus,
                                // other fields...
                            },
                        ]);

                    if (userError) {
                        alert("Failed to update account type. " + userError.message);
                        console.log(user);
                        return;
                    }

                    // Insert into personal_users table
                    const { data: personalData, error: personalError } = await supabase
                        .from('personal_users')
                        .insert({
                            id: userId,
                            name: name,
                            school_year: year,
                            major: major,
                        });

                    if (personalError) {
                        alert("Failed to insert into personal_users. " + personalError.message);
                        console.log(user);
                        return;
                    }

                    // Profile and account type update successful
                    alert("Profile creation successful. Account type set to personal.");
                    console.log(user);
                    props.navigation.navigate("NavBar", { isCreator: false });
                } catch (error) {
                    console.error("Error during profile creation:", error.message);
                }
            } else {
                alert("User is not signed in.");
            }
        } catch (error) {
            console.error("Error getting user session:", error.message);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: appStyles.colors.background,
                justifyContent: "center",
                flexDirection: "column",
                rowGap: 20,
            }}
        >
            <Text
                style={[
                    appStyles.fonts.headingTwo,
                    { textAlign: "center", marginTop: -40 },
                ]}
            >
                Customize your {"\n"}Profile
            </Text>
            <View>
                <Image
                    source={require("../images/profilePic_placeholder.png")}
                    style={{
                        height: 100,
                        resizeMode: "contain",
                        alignSelf: "center",
                    }}
                />
                <Text
                    style={[
                        appStyles.fonts.paragraph,
                        {
                            textAlign: "center",
                            marginTop: 5,
                            textDecorationLine: "underline",
                        },
                    ]}
                >
                    Add profile picture
                </Text>
            </View>
            <View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(userName) => setUserName(name)}
                        underlineColorAndroid="#f000"
                        placeholder="Name"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(name) => setName(name)}
                        underlineColorAndroid="#f000"
                        placeholder="Name"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(year) => setYear(year)}
                        underlineColorAndroid="#f000"
                        placeholder="School year"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(major) => setMajor(major)}
                        underlineColorAndroid="#f000"
                        placeholder="Major"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(campus) => setCampus(campus)}
                        underlineColorAndroid="#f000"
                        placeholder="Campus Location"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                    />
                </View>
            </View>
            <View
                style={[
                    appStyles.layout.section,
                    { flexDirection: "row", columnGap: 15 },
                ]}
            >
                <TouchableOpacity
                    style={[styles.goBack, appStyles.shadow]}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.goBack()}
                >
                    <Text style={styles.buttonTextStyle}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        appStyles.buttons.yellowNoWidth,
                        appStyles.shadow,
                        { width: "35%" },
                    ]}
                    activeOpacity={0.5}
                    onPress={handleCreateProfileButton}
                    disabled={!supabase.auth.getUser()}>
                    <Text style={styles.buttonTextStyle}>Finish</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default CustomizeProfile
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: "row",
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: "#7DE24E",
        borderWidth: 0,
        color: "#FFFFFF",
        borderColor: "#7DE24E",
        height: 40,
        alignItems: "center",
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: "black",
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: "IBMPlexSans-Medium",
    },
    inputStyle: {
        flex: 1,
        color: "black",
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#dadae8",
    },
    errorTextStyle: {
        color: "red",
        textAlign: "center",
        fontSize: 14,
    },
    successTextStyle: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        padding: 30,
    },
    goBack: {
        marginTop: 20,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#E2E2E2",
        width: "35%",
        alignItems: "center",
    },
    accBttn: {
        marginTop: 20,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#FFC60A",
        width: "40%",
        alignItems: "center",
    },
});