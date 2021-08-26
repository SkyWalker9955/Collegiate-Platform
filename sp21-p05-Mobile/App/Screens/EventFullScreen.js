import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Image, Input, Divider, Card, CheckBox, Button } from "react-native-elements";
import Url from "../Components/Url";
import UpdateEvent from "../Screens/UpdateEvent";
import moment from "moment";

const EventFullScreen = ({ navigation, route }) => {
    const [PeopleCounter, setPeopleCounter] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [Events, setEvents] = useState(null);

    const time = (occurs) => {
        return moment(occurs).format("DD/MM/YYYY hh:mm:ss a");
    };

    //////////////////////////////////////////
    const [GuestNum, setGuestNum] = useState(0);
    const [Comment, setComment] = useState("");
    const [User, setUser] = useState({ userName: null, role: null });
    const [Error, setError] = useState("");
    const [University, setUnversity] = useState({});
    const [Venue, setVenue] = useState({});
    const meEndpoint = "/api/authentication/me";
    /*Venue {
        "capacity": 25,
        "id": 1,
        "name": "International Hall",
        "universityId": 1,
    } */
    //console.log(Venue.universityId);
    /////////////////////////////////////////////////////
    //react v4
    //navigation.getParam("id")
    //react v5
    const itemId = route.params?.id;
    const itemName = route.params?.name;
    const itemOccurs = route.params?.occurs;
    const itemVenueCapacity = route.params?.venueCapacity;
    const venueId = route.params?.venueId;
    const rsvped = route.params?.rsvped;
    const setrsvped = route.params?.setrsvped;
    const [isLoading, setIsLoading] = useState(true);
    // console.log(venueId);
    // console.log(itemId);
    // console.log(User.role);
    // console.log(itemName);
    ////////////////////////////////////////////////////
    const getVenueById = "/api/venues/" + venueId;
    const getUniversityById = "/api/universities/" + Venue.universityId;

    useEffect(() => {
        axios
            .get(Url + meEndpoint)
            .then((res) => setUser({ userName: res.data.userName, role: res.data.role }))
            .catch((err) => setError(err));
    }, []);

    useEffect(() => {
        axios
            .get(Url + "/api/events")
            .then((res) => setEvents(res.data))
            .catch((err) => setError(err));
    }, []);

    // console.log(User);
    // console.log(Venue);
    // console.log(University);
    //get Venue by Id, University by Id and ME to Pupulate card
    /*     useEffect(() => {
        axios
            .get(Url + meEndpoint)
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    setUser({ userName: res.data.userName, role: res.data.role });
                    axios
                        .get(Url + getVenueById)
                        .then((res) => {
                            if (res.status === 200) {
                                setVenue(res.data);
                                console.log(res.data);
                                const universityId = res.data.universityId;
                                axios
                                    .get(`/api/universities/${universityId}`)
                                    .then((res) => {
                                        //console.log(res.data);
                                        if (res.status === 200) {
                                            setUniversity(res.data);
                                            setIsLoading(false);
                                            forceUpdate();
                                        }
                                    })
                                    .catch((err) => setError(err));
                            }
                        })
                        .catch((err) => setError(err));
                }
            })
            .catch((err) => setError(err));
    }, []);

    console.log(Venue);
    console.log(University); */

    // console.log(Venue);
    //////////////////////////////////////////

    return (
        <View style={styles.eventContainer}>
            <SafeAreaView>
                <ScrollView>
                    {User.role === "Admin" ? (
                        <View style={styles.conditionalContainer}>
                            <Text style={styles.eventTitle}>{itemName}</Text>
                            <Card containerStyle={styles.CardContainer} wrapperStyle={styles.CardWrapper}>
                                <Text style={styles.cardTitle1}>Capacity: {itemVenueCapacity} attendees</Text>
                                <Text style={styles.cardTitle2}>Occurs: {time(itemOccurs)}</Text>
                            </Card>
                            <View style={styles.adminControlContainer}>
                                <Text style={{ fontWeight: "bold" }}>Admin Colntrol:</Text>
                                <Button
                                    title="Update"
                                    type="outline"
                                    buttonStyle={styles.adminButton1}
                                    titleStyle={{ color: "white" }}
                                    onPress={() => {
                                        navigation.navigate("Update Event", {
                                            id: itemId,
                                            eventName: itemName,
                                            eventTime: itemOccurs,
                                            eventVenueCapacity: itemVenueCapacity,
                                            eventVenueId: venueId,
                                        });
                                    }}
                                ></Button>
                                <Button
                                    title="Delete"
                                    type="outline"
                                    titleStyle={{ color: "white" }}
                                    buttonStyle={styles.adminButton2}
                                    onPress={() => {
                                        axios
                                            .delete(Url + "/api/events/" + itemId)
                                            .then((res) => {
                                                if (res.status === 200) {
                                                    alert("Event deleted successfully!");
                                                    navigation.navigate("Events");
                                                }
                                            })
                                            .catch((err) => setError(err));
                                    }}
                                ></Button>
                            </View>

                            <Card containerStyle={styles.RsvpContainer}>
                                <Card.Title style={{ fontSize: 18 }}>RSVP</Card.Title>
                                <Card.Divider></Card.Divider>
                                <CheckBox
                                    style={styles.checkboxStyle}
                                    title="Check the checkbox if you plan to visit this event"
                                    checked={isChecked}
                                    onPress={() => setIsChecked({ checked: !isChecked })}
                                />

                                <Input
                                    label="How many guests including you are visiting ? (digit)"
                                    onChangeText={(val) => setGuestNum(val)}
                                ></Input>
                                <Input
                                    label="You can leave a note here if you wish."
                                    onChangeText={(val) => setComment(val)}
                                ></Input>
                            </Card>
                            <Button
                                title="Save"
                                type="outline"
                                buttonStyle={styles.button}
                                onPress={() => {
                                    alert("Thank you for participation!");
                                    navigation.navigate("Events");
                                }}
                                titleStyle={{ color: "black" }}
                            ></Button>
                        </View>
                    ) : (
                        <View style={styles.conditionalContainer}>
                            <Text style={styles.eventTitle}>{itemName}</Text>
                            <Card containerStyle={styles.CardContainer} wrapperStyle={styles.CardWrapper}>
                                <Text style={styles.cardTitle1}>Capacity: {itemVenueCapacity}</Text>
                                <Text style={styles.cardTitle2}>Time: {time(itemOccurs)}</Text>
                            </Card>

                            <Card containerStyle={styles.RsvpContainer}>
                                <Card.Title style={{ fontSize: 18 }}>RSVP</Card.Title>
                                <Card.Divider></Card.Divider>
                                <CheckBox
                                    style={styles.checkboxStyle}
                                    title="Check the checkbox if you plan to visit this event"
                                    checked={isChecked}
                                    onPress={() => setIsChecked({ checked: !isChecked })}
                                />

                                <Input
                                    label="How many guests including you are visiting ? (digit)"
                                    onChangeText={(val) => setGuestNum(val)}
                                ></Input>
                                <Input
                                    label="You can leave a note here if you wish."
                                    onChangeText={(val) => setComment(val)}
                                ></Input>
                            </Card>
                            <Button
                                title="Save"
                                type="outline"
                                buttonStyle={styles.button}
                                onPress={() => {
                                    alert("Thank you for participation!");
                                    navigation.navigate("Events");
                                }}
                                titleStyle={{ color: "black" }}
                            ></Button>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
const styles = StyleSheet.create({
    adminControlContainer: {
        padding: 30,
        borderWidth: 2,
        borderColor: "pink",
        marginVertical: 30,
        marginHorizontal: 20,
        borderRadius: 20,
        backgroundColor: "#ffe366",
    },
    adminButton1: {
        width: 230,
        height: 37,
        marginTop: 20,
        marginBottom: 10,
        alignSelf: "center",
        backgroundColor: "#1a1a1a",
    },
    adminButton2: {
        width: 230,
        height: 37,
        marginVertical: 20,
        alignSelf: "center",
        backgroundColor: "#1a1a1a",
    },
    checkboxStyle: {
        padding: 50,
        marginVertical: 20,
    },
    cardTitle1: {
        fontSize: 22,
        marginTop: 15,
        marginBottom: 8,
        paddingHorizontal: 3,
    },
    cardTitle2: {
        fontSize: 22,
        marginTop: 8,
        marginBottom: 15,
        paddingHorizontal: 3,
    },
    eventTitle: {
        fontSize: 40,
        fontWeight: "bold",
        fontFamily: "sans-serif",
        fontStyle: "italic",
        paddingHorizontal: 25,
        paddingTop: 25,
    },
    eventContainer: {
        flex: 1,
        backgroundColor: "#d3eef8",
    },
    button: {
        width: 230,
        height: 37,
        marginVertical: 20,
        alignSelf: "center",
        backgroundColor: "#fdf8f2",
    },
    conditionalContainer: {
        justifyContent: "center",
        //alignItems: "center",
    },
    CardContainer: {
        flexDirection: "column",
        borderRadius: 10,
        borderStyle: "solid",
        //borderWidth: 1,
        marginHorizontal: 1,
        marginVertical: 15,
        //borderColor: "#84CEEB",
        backgroundColor: "#e9f7fc",
        //-----------Shade-test----
        shadowColor: "#544F4E",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 6,
    },
    RsvpContainer: {
        alignSelf: "center",
        width: 360,
        flexDirection: "column",
        borderRadius: 10,
        borderStyle: "solid",
        //borderWidth: 1,
        marginHorizontal: 1,
        marginVertical: 15,
        //borderColor: "#84CEEB",
        backgroundColor: "#e9f7fc",
        //-----------Shade-test----
        shadowColor: "#544F4E",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 6,
    },
});

export default EventFullScreen;
