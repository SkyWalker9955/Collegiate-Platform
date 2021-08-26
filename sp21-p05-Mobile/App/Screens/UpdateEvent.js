import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Button, Input, Divider, Card } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import Url from "../Components/Url";

const UpdateEvent = (props) => {
    ///////////////////////////////////////
    const [Error, setError] = useState("");

    const timeFunct = (occurs) => {
        return moment(occurs).format("DD/MM/YYYY hh:mm:ss a");
    };

    ////////////////////////////////////////
    const id = props.route.params?.id;
    const name = props.route.params?.eventName;
    const time = props.route.params?.eventTime;
    const venueCapacity = props.route.params?.eventVenueCapacity;
    const venueId = props.route.params?.eventVenueId;
    ///console.log(tttime);

    const [Name, setName] = useState(name);
    const [Time, setTime] = useState(timeFunct(time));
    const [VenueId, setVenueId] = useState(venueId);

    console.log("------------------------------------------");
    console.log("Raw azure time: ", time);
    console.log("Formated time: ", Time);
    const newTime = moment().toISOString(Time);
    console.log("Moment ISO: ", newTime);
    console.log("------------------------------------------");
    /////////////////////////////////////////////
    // This is what we send to API
    /*Event Object  {
        "id": 0,
        "name": "string",
        "occurs": "2021-05-02T17:42:12.067Z",
        "venueCapacity": 0,
        "venueId": 0
    } */
    /////////////////////////////////////////////
    //Use in GET or PUT
    const EventLink = Url + "/api/events/" + id;

    return (
        <View style={styles.menuContainer1}>
            <Text style={styles.title}>Update {Name} Event</Text>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.menuContainer2}>
                        <Input
                            label="Enter new name:"
                            value={Name}
                            onChangeText={(val) => {
                                setName(val);
                            }}
                        ></Input>
                        <Input
                            label="Enter date and time:"
                            value={Time}
                            onChangeText={(val) => {
                                setTime(val);
                            }}
                        ></Input>
                        <Input
                            label="Enter venue id:"
                            value={VenueId.toString()}
                            onChangeText={(val) => {
                                setVenueId(val);
                            }}
                        ></Input>
                        <Button
                            buttonStyle={styles.button}
                            title="Update"
                            type="outline"
                            titleStyle={{ color: "black" }}
                            onPress={() => {
                                const newTime = moment().toISOString(Time);
                                //console.log(newTime);
                                axios
                                    .put(EventLink, { id, Name, newTime, VenueId })
                                    .then((res) => {
                                        if (res.status === 200) {
                                            alert("Update Successful!");
                                            props.navigation.goBack();
                                        }
                                    })
                                    .catch((err) => {
                                        setError(err);
                                        //console.log(err);
                                    });
                            }}
                        ></Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        alignSelf: "center",
        fontSize: 34,
        marginVertical: 30,
        marginHorizontal: 15,
    },
    menuContainer1: {
        flex: 1,
        backgroundColor: "#d3eef8",
    },
    menuContainer2: {
        flex: 1,
        width: 340,
        alignSelf: "center",
        marginTop: 35,
    },
    button: {
        width: 230,
        height: 37,
        marginVertical: 20,
        alignSelf: "center",
        backgroundColor: "#fdf8f2",
        marginTop: 80,
    },
});

export default UpdateEvent;
