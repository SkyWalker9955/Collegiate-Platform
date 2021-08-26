import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import AllUniversitiesScreen from "../Screens/Universities";
import { Button, Icon } from "react-native-elements";

const Stack = createStackNavigator();

const UniversitiesStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="Universities"
            screenOptions={{
                headerTitleAlign: "center",
                headeerTintColor: "#84CEEB",
                headerStyle: {
                    backgroundColor: "#85e085",
                },
            }}
        >
            <Stack.Screen
                name="Universities"
                component={AllUniversitiesScreen}
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

export default UniversitiesStack;
