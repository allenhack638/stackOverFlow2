import React from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";

import { projectCode } from "../../api";

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <nav className="side-nav">
        <NavLink
          to={`/${projectCode}/`}
          className="side-nav-links"
          activeclassname="active"
        >
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          <NavLink
            to={`/${projectCode}/Questions`}
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "25px" }}
          >
            <img
              src={Globe}
              alt="Globe"
              style={{ width: "15px", height: "15px" }}
            />
            <p> Questions </p>
          </NavLink>
          <NavLink
            to={`/${projectCode}/Tags`}
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
          >
            <p>Tags</p>
          </NavLink>
          <NavLink
            to={`/${projectCode}/Users`}
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
          >
            <p>Users</p>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
