import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, CustomInput } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./stylesheets/CreateEvent.css";

function UpdateForm(props) {
    var [name, setName] = useState(null);
    var [date, setDate] = useState(null);
    var [time, setTime] = useState(null);
    var [venues, setVenues] = useState([]);
    var [venue, setVenue] = useState(null);
    var [event, setEvent] = useState({});
    var [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    let id = props.location.pathname.substring(12);

    useEffect(() => {
        axios
            .get(`/api/events/${id}`)
            .then((res) => {
                const getDate = () => {
                    let value = res.data.occurs.substring(0, 10);
                    return value;
                };
                const getTime = () => {
                    let value = res.data.occurs.substring(11, 16);
                    console.log("parsed time", value);
                    return value;
                };
                if (res.status === 200) {
                    setEvent(res.data);
                    setName(res.data.name);
                    setDate(getDate());
                    setTime(getTime());
                }
            })
            .catch((e) => {
                console.log(e);
            });
        axios
            .get("/api/venues/")
            .then((res) => {
                if (res.status === 200) {
                    setVenues(res.data);
                    console.log(res.data);
                    setIsLoading(false);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);
    console.log("Event: ", event);

    const updateEvent = (e) => {
        e.preventDefault();
        const occurs = formatOccurs();

        var submission = {
            id: id,
            name: name,
            occurs: occurs,
            venueId: venue,
        };
        console.log("DTO: ", submission);
        axios
            .put(`/api/events/${id}`, submission, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log(res.status);
                if (res.status === 200) {
                    alert("Event updated successfully.");
                    history.push("/manage");
                }
            })
            .catch((err) => console.log(err));
    };
    const formatOccurs = () => {
        if (time.charAt(0) !== "0") {
            setTime("0" + time);
        }
        let occurs = date + "T" + time + ":00.000Z";

        return occurs;
    };

    const handleNameChange = (e) => {
        var value = e.target.value;
        if (value != null) {
            setName(value);
            console.log(name);
        }
    };
    const handleDateChange = (e) => {
        var value = e.target.value;
        if (value != null) {
            setDate(value);
            console.log(date);
        }
    };
    const handleTimeChange = (e) => {
        var value = e.target.value;
        if (value != null) {
            setTime(value);
            console.log(time);
        }
    };
    const handleVenueChange = (e) => {
        var value = e.target.value;
        if (value != null) {
            setVenue(value);
            console.log(venue);
        }
    };

    return (
        <div className="container">
            {isLoading && <h2>Loading, please wait...</h2>}
            {!isLoading && (
                <div>
                    <h2 className="title">Update an Event</h2>
                    <Form className="createform" onSubmit={updateEvent.bind(this)}>
                        <FormGroup>
                            <Label for="name">Name:</Label>
                            <Input
                                type="text"
                                id="name"
                                defaultValue={name}
                                onLoad={handleNameChange}
                                onChange={handleNameChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="date">Date:</Label>
                            <Input
                                type="date"
                                id="date"
                                defaultValue={date}
                                onLoad={handleDateChange}
                                onChange={handleDateChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Time">Time:</Label>
                            <Input
                                type="time"
                                id="time"
                                defaultValue={time}
                                onLoad={handleTimeChange}
                                onChange={handleTimeChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="venues">Venue:</Label>
                            <CustomInput type="select" id="venues" onChange={handleVenueChange}>
                                <option value="">Select</option>
                                {venues !== [] &&
                                    venues.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                            <Input type="submit" placeholder="Submit" />
                        </FormGroup>
                    </Form>
                </div>
            )}
        </div>
    );
}

export default UpdateForm;
