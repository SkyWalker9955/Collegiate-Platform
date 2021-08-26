import React from "react";
import { Card, CardTitle, CardDeck } from "reactstrap";
import { Link } from "react-router-dom";
import "./stylesheets/EventManagement.css";

function EventManagement() {
  return (
    <div className="flex">
      <CardDeck className="managedeck">
        <Link exact to="/createevent">
          <Card className="managecard">
            <CardTitle className="title"> Create an Event</CardTitle>
          </Card>
        </Link>
        <Link exact to="/updateevent">
          <Card className="managecard">
            <CardTitle className="title"> Update an Event</CardTitle>
          </Card>
        </Link>
        <Link exact to="/deleteevent">
          <Card className="managecard">
            <CardTitle className="title"> Delete an Event</CardTitle>
          </Card>
        </Link>
      </CardDeck>
    </div>
  );
}

export default EventManagement;
