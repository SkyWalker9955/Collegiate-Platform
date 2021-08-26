import React from 'react'
import Footer from './Footer';
import Webbar from './Navbar';
import {Route, Switch} from 'react-router-dom';
import GetEvents from './GetEvents';
import Login from './Login';
import EventPage from './EventPage';
import EventManagement from './EventManagement';
import CreateEvent from "./CreateEvent";
import UpdateEvent from "./UpdateEvent";
import UpdateForm from "./UpdateForm";
import DeleteEvent from "./DeleteEvent";

import "./stylesheets/Layout.css";

function Layout () {
  return (
    <div className="wrapper">
      <div className="header">
        <Webbar/>
      </div>
        <Switch>
          <div className="content">
            <Route exact path="/" component={GetEvents} />
            <Route exact path="/login" component={Login} />
            <Route path="/event/:id" component={EventPage} />
            <Route exact path="/manage" component={EventManagement} />
            <Route exact path="/createevent" component={CreateEvent} />
            <Route exact path="/updateevent" component={UpdateEvent} />
            <Route path="/updateform/:id" component={UpdateForm} />
            <Route exact path="/deleteevent" component={DeleteEvent} />
          </div>
        </Switch>
      <div className="bottom">
        <Footer />
      </div>
    </div>
  );
}

export default Layout