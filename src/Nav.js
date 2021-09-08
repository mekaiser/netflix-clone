// used rfce to make this skeleton

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import netflixLogo from "./images/netflix-logo.png";
import userIcon from "./images/user.svg";
import "./Nav.css";

function Nav() {
  const [showNavBgOnScroll, handleShowNavBgOnScroll] = useState(false);
  const [showNavBgOnHamburgerClick, handleShowNavBgOnHamburgerClick] =
    useState(false);
  const history = useHistory();

  const transitionNavbar = () => {
    if (window.scrollY > 80) {
      handleShowNavBgOnScroll(true);
    } else {
      handleShowNavBgOnScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);
  return (
    // <div className={`nav ${show && "nav__black"}`}>
    //   <div className="nav__contents">
    //     <img
    //       onClick={() => history.push("/")}
    //       className="nav__logo"
    //       src={netflixLogo}
    //       alt=""
    //     />

    //     <img
    //       onClick={() => history.push("/profile")}
    //       className="nav__avatar"
    //       src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
    //       alt=""
    //     />
    //   </div>
    // </div>

    <nav
      className={`nav ${
        (showNavBgOnScroll || showNavBgOnHamburgerClick) && "nav__black"
      } navbar navbar-expand-lg navbar-dark`}
    >
      <div className="container-fluid">
        <a className="navbar-brand">
          <img
            onClick={() => history.push("/")}
            className="nav__logo"
            src={netflixLogo}
            alt=""
          />
        </a>
        <button
          onClick={() =>
            handleShowNavBgOnHamburgerClick(!showNavBgOnHamburgerClick)
          }
          className="navbar-toggler navbar__toggler__custom"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar__nav__ul navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                TV Shows
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Movies
              </a>
            </li>
            <li className="nav-item nav__avatar__li">
              <a className="nav-link">
                <img
                  onClick={() => history.push("/profile")}
                  className="nav__avatar"
                  src={userIcon}
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
