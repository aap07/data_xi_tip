import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function Navbar() {
  return (
    <Nav as="ul" className="nav nav-tabs">
      <Nav.Item as="li">
        <NavLink exact to="/" className="nav-link" activeClassName="active">
          Data Siswa
        </NavLink>
      </Nav.Item>
      <Nav.Item as="li">
        <NavLink
          to="/dataEskul"
          className="nav-link"
          activeClassName="active"
        >
          Data Eskul
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
