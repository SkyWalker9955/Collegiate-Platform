import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavItem, NavLink, NavbarText, Button } from "reactstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./stylesheets/Navbar.css";
import logo from "../assets/logo_v3.png";
import axios from "axios";

function Webbar() {
    var [user, setUser] = useState({ userName: null, role: null });
    var [isAdmin, setAdmin] = useState(false);
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        axios
            .get("api/authentication/me")
            .then((res) => {
                if (res.status === 200) {
                    let userData = res.data;

                    setUser({
                        userName: userData.userName,
                        role: userData.role,
                    });
                    if (userData.role === "Admin") {
                        setAdmin(true);
                    }
                } else if (res.status === 401) {
                    setUser({ userName: null, role: null });
                }
            })
            .catch((err) => {
                console.log("Cannot get user information." + err);
            });
        console.log(location);
    }, [location]);
    console.log(user);
    console.log(isAdmin);

    const Logout = () => {
        axios
            .post("/api/authentication/logout", {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log("Logout: " + response.status);
                    setUser({ userName: null, role: null });
                    setAdmin(false);
                    console.log(user);
                    console.log(isAdmin);
                    alert("Logged out successfully.");
                    history.push("/");
                }
            })
            .catch((err) => {
                console.log("Cannot logout." + err);
            });
    };
    return (
        <div>
            <Navbar>
                <Nav className="navbar" navbar>
                    <img className="navbar-image" src={logo} alt="Logo" />
                    <NavbarText className="navbar-logo">
                        Collegiate Events
                    </NavbarText>
                    <div className="nav-menu">
                        <NavItem className="nav-item">
                            <NavLink
                                tag={Link}
                                exact
                                to="/"
                                className="nav-links"
                            >
                                Home
                            </NavLink>
                        </NavItem>
                        {user.userName !== null && (
                            <NavItem className="nav-item">
                                <NavLink
                                    tag={Link}
                                    exact
                                    to="/manage"
                                    className="nav-links"
                                >
                                    Manage
                                </NavLink>
                            </NavItem>
                        )}
                        <NavItem className="nav-item">
                            {user.userName === null && (
                                <NavLink
                                    tag={Link}
                                    exact
                                    to="/login"
                                    className="nav-links"
                                >
                                    <Button className="login">Login</Button>
                                </NavLink>
                            )}
                            {user.userName !== null && (
                                <NavItem className="nav-links">
                                    <Button
                                        className="login"
                                        onMouseDown={Logout}
                                    >
                                        Logout
                                    </Button>
                                </NavItem>
                            )}
                        </NavItem>
                    </div>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Webbar;
