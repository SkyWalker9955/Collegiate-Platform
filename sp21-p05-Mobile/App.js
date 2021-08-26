import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootNavigator from "./App/Router/rootNavigator";

const App = () => {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
};

export default () => {
    return <App />;
};
