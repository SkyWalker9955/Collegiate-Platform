import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, TextInput, Text } from "react-native";
import Url from "../Components/Url";
import { Button, Image, ButtonGroup } from "react-native-elements";
import axios from "axios";

const SignUp = ({ navigation }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [SelectedRoleIndex, setSelectedRoleIndex] = useState(1);

    const roles = ["Admin", "User"];

    selectRoleType = (NewRoleTypeIndex) => {
        setSelectedRoleIndex(NewRoleTypeIndex);
    };

    return (
        <View style={styles.page}>
            <Image
                source={require("../../assets/appLogo/logo_v2.png")}
                style={{ width: 250, height: 250, marginTop: 35 }}
            />
            <KeyboardAvoidingView behavior="padding" style={styles.kav}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Username"
                        onChangeText={(val) => setUsername(val)}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Password"
                        onChangeText={(val) => setPassword(val)}
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <ButtonGroup
                        onPress={() => {}}
                        selectedIndex={SelectedRoleIndex}
                        buttons={roles}
                        containerStyle={{ height: 100 }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={styles.button}
                        title="Sign Up"
                        type="outline"
                        onPress={() => {
                            console.log(Username);
                            console.log(Password);
                            alert("Registered Successfully!");
                            navigation.navigate("Events");
                        }}
                        raised="true"
                        spellCheck={false}
                        autoCorrect={false}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#ffe366",
    },
    page: {
        backgroundColor: "#FFFFFF",
        flex: 6,
        alignItems: "center",
    },
    inputContainer: {
        width: 300,
        height: 200,
        justifyContent: "center",
    },
    buttonContainer: {
        marginTop: 70,
        width: 150,
    },
    //kav - keyboarAvoidingView
    kav: {
        alignItems: "center",
    },
    textInputStyle: {
        borderBottomWidth: 1,
        borderColor: "#C1C8E4",
        marginVertical: 15,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        fontSize: 16,
    },
});

export default SignUp;
