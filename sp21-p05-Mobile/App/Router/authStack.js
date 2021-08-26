import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import LogIn from "../Screens/Login";
import SignUp from "../Screens/SignUp";

const Stack = createStackNavigator();

const AuthStack = (props) => {
    //console.log(props);
    // console.log("This is setUser in Auth stack: \t" + props.setUser);

    return (
        <Stack.Navigator
            initialRouteName="Events"
            screenOptions={{
                headerTitleAlign: "center",
                headeerTintColor: "#84CEEB",
                headerStyle: {
                    backgroundColor: "#ffe366",
                },
            }}
        >
            <Stack.Screen name="Log In" component={LogIn} />
            <Stack.Screen name="Sign Up" component={SignUp} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({});

export default AuthStack;
