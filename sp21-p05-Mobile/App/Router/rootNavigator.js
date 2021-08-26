import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import EventsStack from "./eventsStack";
import VenuesStack from "./venuesStack";
import UniversitiesStack from "./universitiesStack";
import CustomDrawerContent from "../Components/CustomDrawer";
import Url from "../Components/Url";
import axios from "axios";
import AuthStack from "./authStack";
import LogIn from "../Screens/Login";

const Drawer = createDrawerNavigator();

const RootNavigator = (props) => {
    const meEndpoint = "/api/authentication/me";
    const [User, setUser] = useState({ userName: null, role: null });
    const [Error, setError] = useState("");
    const [IsAdmin, setIsAdmin] = useState(false);
    const [Reload, setReload] = useState("");

    //Hopefully this project works

    useEffect(() => {
        axios
            .get(Url + meEndpoint)
            .then((res) => {
                //console.log(res);
                if (res.status === 200) {
                    setUser({
                        userName: res.data.userName,
                        role: res.data.role,
                    });
                }
                if (res.data.role === "Admin") {
                    setIsAdmin(true);
                }
            })
            .catch((err) => setError(err));
    }, []);

    const update = () => {
        this.forceUpdate();
    };

    return (
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: "#fffffd",
            }}
            initialRouteName="EventsStack"
            drawerContent={(props) => (
                <CustomDrawerContent
                    {...props}
                    userName={User.userName}
                    role={User.role}
                    isAdmin={IsAdmin}
                    setUser={setUser}
                    update={update}
                />
            )}
        >
            <Drawer.Screen name="Events" component={EventsStack} />
            <Drawer.Screen name="Auth" component={AuthStack} />
            <Drawer.Screen name="Venues" component={VenuesStack} />
            <Drawer.Screen name="Universities" component={UniversitiesStack} />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({});

export default RootNavigator;
