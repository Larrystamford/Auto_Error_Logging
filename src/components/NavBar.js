import React from "react";
import "./components.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./grab.svg";

export const NavBar = () => {
  return (
    <div className="Navbar">
      <Navbar fixed="top" bg="light" variant="light">
        <Navbar.Brand href="/">
          <div className="horizontalFlexboxLogo">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Grab logo"
            />
            <p style={{ fontWeight: "bold", marginTop: "11px" }}>overflow</p>
          </div>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};
