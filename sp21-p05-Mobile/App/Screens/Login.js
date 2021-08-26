import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, TextInput } from "react-native";
import Url from "../Components/Url";
import { Button, Image } from "react-native-elements";
import axios from "axios";

const LogIn = (props) => {
    //console.log("This is setUser in Login screen: \t" + setUser);
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState("");

    const LoginURL = Url + "/api/authentication/login";

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
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Log In"
                        type="outline"
                        onPress={() => {
                            axios
                                .post(LoginURL, { Username, Password })
                                .then((res) => {
                                    if (res.status === 200) {
                                        axios
                                            .get(Url + "/api/authentication/me")
                                            .then((res) => {
                                                if (res.status === 200) {
                                                    let username = res.data.userName;
                                                    let role = res.data.role;
                                                    props.navigation.navigate("Events", {
                                                        username: username,
                                                        role: role,
                                                    });
                                                }
                                            })
                                            .catch((err) => setError(err));
                                    }
                                })
                                .catch((err) => {
                                    setError(err);
                                    alert("Invalid credentials. Try again!");
                                    console.log(err);
                                });
                        }}
                        raised="true"
                        spellCheck={false}
                        autoCorrect={false}
                        buttonStyle={styles.button}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

/* function LoginRequest(LoginURL, { Username, Password }, navigation, setIsAuthenticated) {
    return axios
        .post(LoginURL, { Username, Password })
        .then(function (responce) {
            console.log(responce);
            if (responce.status == 200) {
                setIsAuthenticated(true);
                navigation.navigate("Events");
            }
        })
        .catch(function (err) {
            alert("Invalid username or Password. Try again" + err);
        });
} */

const styles = StyleSheet.create({
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
    button: {
        backgroundColor: "#ffe366",
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

export default LogIn;
