import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Divider, Icon, Button, Avatar } from "react-native-elements";
import axios from "axios";
import Url from "./Url";

const CustomDrawerContent = (props) => {
    //console.log(props.setUser);

    return (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerHeaderContainer}>
                    <View>
                        <Avatar
                            containerStyle={{
                                //marginVertical: 45,
                                // marginLeft: 25,
                                backgroundColor: "#ccffee",
                                marginRight: 35,
                            }}
                            size="large"
                            rounded
                            title="Avatar"
                            titleStyle={styles.avatarTitleStyle}
                        />
                    </View>

                    {props.userName === null ? (
                        <View style={styles.topViewContainer}>
                            <View style={styles.usernameViewStyle}>
                                <Icon name="person" type="fontisto" size={20} />
                                <Text style={styles.textStyle}>Username</Text>
                            </View>
                            <View style={styles.usernameViewStyle}>
                                <Icon name="sitemap" type="fontisto" size={20} />
                                <Text style={styles.textStyle}>Role</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.topViewContainer}>
                            <View style={styles.usernameViewStyle}>
                                <Icon name="person" type="fontisto" size={20} />
                                <Text style={styles.textStyle}>{props.userName}</Text>
                            </View>
                            <View style={styles.usernameViewStyle}>
                                <Icon name="sitemap" type="fontisto" size={20} />
                                <Text style={styles.textStyle}>{props.role}</Text>
                            </View>
                        </View>
                    )}
                </View>

                <Divider style={styles.divider} />

                {props.isAdmin ? (
                    <View>
                        <DrawerItem
                            labelStyle={styles.drawerLabelStyle}
                            label="Events"
                            icon={() => <Icon name="calendar" type="fontisto" size={22} />}
                            onPress={() => {
                                props.navigation.navigate("Events");
                            }}
                        ></DrawerItem>
                        <DrawerItem
                            labelStyle={styles.drawerLabelStyle}
                            label="Venues"
                            icon={() => <Icon name="shopping-store" type="fontisto" size={20} />}
                            onPress={() => {
                                props.navigation.navigate("Venues");
                            }}
                        ></DrawerItem>
                        <DrawerItem
                            labelStyle={styles.drawerLabelStyle}
                            label="Universities"
                            icon={() => <Icon name="map" type="fontisto" size={20} />}
                            onPress={() => {
                                props.navigation.navigate("Universities");
                            }}
                        ></DrawerItem>
                    </View>
                ) : (
                    <View>
                        <DrawerItem
                            labelStyle={styles.drawerLabelStyle}
                            label="Events"
                            icon={() => <Icon name="calendar" type="fontisto" size={22} />}
                            onPress={() => {
                                props.navigation.navigate("Events");
                            }}
                        ></DrawerItem>
                    </View>
                )}
                <Divider style={styles.divider} />

                {/* /////////////////LOGIN OR LOGOUT/////////////////// */}
                <View>
                    {props.userName === null ? (
                        <View style={styles.loginContainer}>
                            <Button
                                type="solid"
                                buttonStyle={styles.button_login_style}
                                title="Log In"
                                onPress={() => {
                                    props.navigation.navigate("Auth", {
                                        screen: "Log In",
                                    });
                                }}
                                titleStyle={{ color: "black" }}
                            ></Button>
                            <Text style={styles.orStyle}>or</Text>
                            <Text style={styles.accountText}>Don't have an account yet ?</Text>

                            <Button
                                title="Sign Up"
                                type="outline"
                                buttonStyle={styles.button_signup_style}
                                onPress={() => {
                                    props.navigation.navigate("Auth", {
                                        screen: "Sign Up",
                                    });
                                }}
                            ></Button>
                        </View>
                    ) : (
                        <View style={{ flex: 1, justifyContent: "space-between" }}>
                            <Button
                                title="Log Out"
                                titleStyle={{ color: "black" }}
                                type="solid"
                                buttonStyle={styles.button_logout_style}
                                onPress={() =>
                                    axios
                                        .post(Url + "/api/authentication/logout")
                                        .then((res) => {
                                            if (res.status == 200) {
                                                props.setUser({ userName: null, role: null });
                                                alert("Logged out successfully!");
                                                console.log("This is LogOut responce : " + responce);
                                            }
                                        })
                                        .catch((e) => {
                                            console.log(e);
                                            props.navigation.navigate("Auth", {
                                                screen: "Log In",
                                            });
                                        })
                                }
                            ></Button>
                        </View>
                    )}
                </View>
            </DrawerContentScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        marginTop: 220,
    },
    drawerHeaderContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 30,
    },
    avatarTitleStyle: {
        color: "black",
        fontSize: 18,
    },
    usernameViewStyle: {
        flexDirection: "row",
        paddingVertical: 10,
        // paddingLeft: 15,
        alignItems: "center",
    },
    drawerLabelStyle: {
        fontFamily: "sans-serif",
        fontSize: 16,
        marginLeft: 10,
        fontWeight: "normal",
    },
    textStyle: {
        fontFamily: "sans-serif",
        fontSize: 16,
        marginLeft: 10,
        fontWeight: "normal",
    },
    logoutStyle: {
        fontFamily: "sans-serif",
        fontSize: 16,
        marginLeft: 10,
        fontWeight: "normal",
        marginTop: 150,
    },
    topViewContainer: {
        //borderStyle: "solid",
        //borderColor: "#000000",
        //borderWidth: 3,
        //paddingVertical: 30,
        //backgroundColor: "#000000",
    },
    divider: {
        height: 1,
        width: 270,
        marginVertical: 15,
        marginLeft: 5,
        backgroundColor: "#c1c8e4",
    },
    ///////////////////////////////////
    orStyle: {
        fontSize: 22,
        fontWeight: "bold",
        alignSelf: "center",
    },
    accountText: {
        fontSize: 16,
        alignSelf: "center",
    },
    button_login_style: {
        width: 230,
        height: 37,
        alignSelf: "center",
        backgroundColor: "#ffe366",
    },
    button_signup_style: {
        width: 230,
        height: 37,
        alignSelf: "center",
        borderWidth: 2,
        marginTop: 5,
        borderColor: "#ff80d5",
        backgroundColor: "#ffe366",
    },
    button_logout_style: {
        width: 230,
        height: 37,
        alignSelf: "center",
        marginTop: 290,
        backgroundColor: "#ffe366",
    },
});

export default CustomDrawerContent;
