import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    ImageBackground,
} from "react-native";
//import { Card } from "react-navigation-elements";
import axios from "axios";
import { Card, Divider } from "react-native-elements";

const AllVenuesScreen = ({ navigation }) => {
    const [Venues, setVenues] = useState([]);
    const [error, setError] = useState("");
    const getAllVenues =
        "https://selu383-sp21-p05-g01.azurewebsites.net/api/venues";

    useEffect(() => {
        axios
            .get(getAllVenues)
            .then((res) => {
                setVenues(res.data);
            })
            .catch((e) => {
                setError(e.message);
            });
    }, []);

    console.log(Venues);

    return (
        <View style={styles.page}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    //this will happen in case I'll go with a caroucell
                    //horizontal
                    //pagingEnabled
                    ListHeaderComponent={() => (
                        <View style={styles.logo}>
                            <ImageBackground
                                source={require("../../assets/Venues.jpg")}
                                style={styles.titleImg}
                            >
                                <Text style={styles.pageTitle}>
                                    See All Venues
                                </Text>
                            </ImageBackground>

                            <Divider
                                style={{
                                    //marginTop: 10,
                                    height: 2,
                                    width: 350,
                                    backgroundColor: "#C1C8E4",
                                    alignSelf: "center",
                                }}
                            ></Divider>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    data={Venues}
                    renderItem={({ item }) => (
                        <Card
                            containerStyle={styles.CardContainer}
                            wrapperStyle={styles.CardWrapper}
                        >
                            <Card.Title style={styles.venueTitle}>
                                {item.name}
                            </Card.Title>
                            <Card.Divider style={styles.dividerStyle} />
                            <Card.Title style={styles.cardFields}>
                                Capacity: {item.capacity} people
                            </Card.Title>
                        </Card>
                    )}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    pageTitle: {
        marginTop: 73,
        marginLeft: 10,
        fontSize: 45,
        fontWeight: "bold",
        fontStyle: "italic",
        fontFamily: "sans-serif-thin",
        color: "#FFFFFF",
    },
    page: {
        backgroundColor: "#FFFFFF",
        flex: 6,
    },
    logo: {
        alignSelf: "center",
        margin: 0,
        paddingTop: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    dividerStyle: {
        height: 1.3,
        width: 340,
        alignSelf: "center",
        marginBottom: 25,
    },
    venueTitle: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        color: "#544F4E",
        fontSize: 20,
        marginVertical: 0,
        marginBottom: 5,
        alignSelf: "center",
    },
    cardFields: {
        marginLeft: 0,
        fontFamily: "sans-serif",
        marginBottom: 10,
        fontSize: 16,
        color: "#544F4E",
        textAlign: "left",
        fontWeight: "normal",
    },
    CardContainer: {
        flexDirection: "column",
        borderRadius: 10,
        borderStyle: "solid",
        //borderWidth: 1,
        marginHorizontal: 1,
        marginVertical: 15,
        //borderColor: "#84CEEB",
        backgroundColor: "#fff6cc",
        //-----------Shade-test----
        shadowColor: "#544F4E",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 6,
    },
    titleImg: {
        width: 400,
        height: 250,
        marginTop: 10,
        marginBottom: 15,
        alignItems: "center",
    },
});

export default AllVenuesScreen;
