import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import AllVenuesScreen from "../Screens/Venues";
import { Button, Icon } from "react-native-elements";

//===============================================================

const Stack = createStackNavigator();

const VenuesStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="Venues"
            screenOptions={{
                headerTitleAlign: "center",
                headeerTintColor: "#84CEEB",
                headerStyle: {
                    backgroundColor: "#ffe366",
                },
            }}
        >
            <Stack.Screen
                name="Venues"
                component={AllVenuesScreen}
                options={{
                    headerLeft: () => (
                        <Button
                            color="white"
                            type="clear"
                            buttonStyle={styles.buttonStyle}
                            icon={
                                <Icon
                                    name="nav-icon-a"
                                    type="fontisto"
                                    size={15}
                                    color="black"
                                />
                            }
                            onPress={() => {
                                navigation.openDrawer();
                            }}
                        ></Button>
                    ),
                }}
            />
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

export default VenuesStack;
