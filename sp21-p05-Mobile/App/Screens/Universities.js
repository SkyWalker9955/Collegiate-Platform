import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ImageBackground,
} from "react-native";
import { Image, Divider, Icon, Card } from "react-native-elements";
import axios from "axios";

//import { ScrollView } from "react-native-gesture-handler";

const AllUniversitiesScreen = ({ navigation }) => {
    const [universities, setUniversities] = useState([]);
    const [error, setError] = useState("");
    const getAllUniversities =
        "https://selu383-sp21-p05-g01.azurewebsites.net/api/universities";

    useEffect(() => {
        axios
            .get(getAllUniversities)
            .then((res) => {
                setUniversities(res.data);
            })
            .catch((e) => {
                setError(e.message);
            });
    }, []);

    console.log(universities);

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
                                source={require("../../assets/University.jpg")}
                                style={styles.titleImg}
                            >
                                <Text style={styles.pageTitle}>
                                    See All Universities
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
                    data={universities}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {}}>
                            <Card
                                containerStyle={styles.CardContainer}
                                wrapperStyle={styles.CardWrapper}
                            >
                                <Card.Title style={styles.eventTitle}>
                                    {item.name}
                                </Card.Title>
                                <Card.Divider
                                    style={styles.dividerStyle}
                                ></Card.Divider>
                                <Card.Title style={styles.cardFields}>
                                    Address:{" "}
                                </Card.Title>
                                <Card.Title style={styles.cardFields}>
                                    {item.address}
                                </Card.Title>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </View>
    );
};

/* Events.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Events")}>
                <AntDesign
                    name="pluscircleo"
                    size={24}
                    style={styles.headerButton}
                />
            </TouchableOpacity>
        ),
    };
}; */

const styles = StyleSheet.create({
    CardContainer: {
        flexDirection: "column",
        borderRadius: 10,
        borderStyle: "solid",
        //borderWidth: 1,
        marginHorizontal: 1,
        marginVertical: 15,
        //borderColor: "#84CEEB",
        backgroundColor: "#d6f5d6",
        //-----------Shade-test----
        shadowColor: "#544F4E",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 6,
    },
    eventTitle: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        color: "#544F4E",
        fontSize: 20,
        marginVertical: 0,
        marginBottom: 5,
        alignSelf: "center",
    },
    dividerStyle: {
        height: 1.3,
        width: 340,
        alignSelf: "center",
        marginBottom: 25,
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
    //==============================
    pageTitle: {
        marginTop: 85,
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
    titleImg: {
        width: 400,
        height: 250,
        marginTop: 10,
        marginBottom: 15,
        alignItems: "center",
    },
});

export default AllUniversitiesScreen;
