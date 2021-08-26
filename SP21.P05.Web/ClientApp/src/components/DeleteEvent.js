import React, { useEffect, useState } from "react";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./stylesheets/DeleteEvents.css";

function DeleteEvent() {
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
  let history = useHistory();
  console.log(events);
  const Delete = (id) => {
    axios
      .delete("/api/events/" + id)
      .then((res) => {
        if (res.status === 200) {
          alert("Event Deleted Successfully");
          history.push("manage");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {events === [] && <h2>No Events Found. Add Make Some!</h2>}
      {events !== [] &&
        events.map((item) => (
          <div key={item.id} className="deletediv">
            <div className="separator" />
            {events !== [] && (
              <Card className="deletecard" ond>
                <CardBody>
                  <CardTitle tag="h5" className="deletetitle">
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
                  <Button
                    className="deletebutton"
                    onClick={() => Delete(item.id)}
                  >
                    Delete
                  </Button>
                </CardBody>
              </Card>
            )}
          </div>
        ))}
    </div>
  );
}

function getLocale() {
  return navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
}

export default DeleteEvent;
