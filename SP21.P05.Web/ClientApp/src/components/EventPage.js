import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardBody, CardTitle, CardLink } from "reactstrap";
import axios from "axios";
import "./stylesheets/EventPage.css";

function EventPage(props) {
  var [event, setEvent] = useState({});
  var [venue, setVenue] = useState({});
  var [university, setUniversity] = useState({});
  var [isLoading, setIsLoading] = useState(true);
  let id = props.location.pathname.substring(7);

  useEffect(() => {
    axios
      .get(`/api/events/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setEvent(res.data);
          console.log(res.status);
          const venueID = res.data.venueId;
          axios
            .get(`/api/venues/${venueID}`)
            .then((res) => {
              if (res.status === 200) {
                setVenue(res.data);
                console.log(res.status);
                const universityID = res.data.universityId;
                axios
                  .get(`/api/universities/${universityID}`)
                  .then((res) => {
                    if (res.status === 200) {
                      setUniversity(res.data);
                      console.log(res.status);
                      setIsLoading(false);
                    } 
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },[id]);
  const locale = getLocale();

  return (
    <div>
      {isLoading && (
        <div>
          <p>Loading, please wait...</p>
        </div>
      )}
      {!isLoading && (
        <div className="div">
          <Card className="card">
            <CardBody>
              <CardTitle tag="h5" className="title">
                {event.name}
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
                }).format(new Date(Date.parse(event.occurs)))}
              </CardText>
              <CardText>University: {university.name}</CardText>
              <CardText>Venue: {venue.name}</CardText>
              <CardText>Venue Capacity: {event.venueCapacity}</CardText>
              <CardLink tag={Link}>RSVP</CardLink>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}

function getLocale() {
  return navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
}
export default EventPage;
