import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, CustomInput } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./stylesheets/CreateEvent.css";

function CreateEvent() {
  var [name, setName] = useState(null);
  var [date, setDate] = useState(null);
  var [time, setTime] = useState(null);
  var [venues, setVenues] = useState([]);
  var [venue, setVenue] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/api/venues/")
      .then((res) => setVenues(res.data))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const createEvent = (e) => {
    e.preventDefault();
    const occurs = formatOccurs();

    var submission = {
      name: name,
      occurs: occurs,
      venueId: venue,
    };
    console.log(submission);
    axios
      .post("/api/events/", submission, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
            alert("Event created successfully.");
            history.push('/manage');
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
      <div>
        <h2 className="title">Create an Event</h2>
        <Form className="createform" onSubmit={createEvent.bind(this)}>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input type="text" id="name" onChange={handleNameChange} />
          </FormGroup>
          <FormGroup>
            <Label for="date">Date:</Label>
            <Input type="date" id="date" onChange={handleDateChange} />
          </FormGroup>
          <FormGroup>
            <Label for="Time">Time:</Label>
            <Input type="time" id="time" onChange={handleTimeChange} />
          </FormGroup>
          <FormGroup>
            <Label for="venues">Venue:</Label>
            <CustomInput type="select" id="venues" onChange={handleVenueChange}>
              <option value="">Select</option>
              {venues !== [] &&
                venues.map((item) => (
                  <option key={item.id} value={item.id} >
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
    </div>
  );
}

export default CreateEvent;
