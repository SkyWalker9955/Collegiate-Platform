import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button, Icon } from "react-native-elements";
import { StyleSheet } from "react-native";
import EventFullScreen from "../Screens/EventFullScreen";
import Events from "../Screens/Events";
import LogIn from "../Screens/Login";
import UpdateEvent from "../Screens/UpdateEvent";

const Stack = createStackNavigator();

const EventsStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="Events"
            screenOptions={{
                headerTitleAlign: "center",
                headeerTintColor: "#84CEEB",
                headerStyle: {
                    backgroundColor: "#7bcaea",
                },
            }}
        >
            <Stack.Screen name="Log In" component={LogIn} />
            <Stack.Screen
                name="Events"
                component={Events}
                options={{
                    headerLeft: () => (
                        <Button
                            color="white"
                            type="clear"
                            buttonStyle={styles.buttonStyle}
                            icon={<Icon name="nav-icon-a" type="fontisto" size={15} color="black" />}
                            onPress={() => {
                                navigation.openDrawer();
                            }}
                        ></Button>
                    ),
                }}
            />
            <Stack.Screen name="EventFullScreen" component={EventFullScreen} options={{ title: "RSVP" }} />
            <Stack.Screen name="Update Event" component={UpdateEvent} options={{ title: "Update Event" }} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        width: 40,
        height: 40,
        marginLeft: 8,
    },
});

export default EventsStack;
