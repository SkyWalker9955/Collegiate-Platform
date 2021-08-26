import React, { useEffect, useState } from "react";
import { Card, CardText, CardBody, CardTitle, CardLink } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./stylesheets/Card.css";

function UpdateEvent() {
  var [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get("/api/events/")
      .then((res) => setEvents(res.data))
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const locale = getLocale();
  console.log(events);
  return (
    events.map((item) => (
    <div key={item.id} className="div">
      <div className="separator" />
      
      <Card className="card" ond>
        <CardBody>
          <CardTitle tag="h5" className="title">
            {item.name}
          </CardTitle>
          <hr className="break" />
          <CardText>
            {new Intl.DateTimeFormat(locale, {
              year: "numeric",
              month: "2-digit",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              timeZoneName: "short",
            }).format(new Date(Date.parse(item.occurs)))}
          </CardText>
          <CardText>Venue Capacity: {item.venueCapacity}</CardText>
          <CardLink tag={Link} to={`/updateform/${item.id}`}>
            Update
          </CardLink>
        </CardBody>
      </Card>
    </div>
  ))
  )
}

function getLocale() {
  return navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
}

export default UpdateEvent;
