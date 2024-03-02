import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { faBars, faTimes, faVideo } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import "./Button.css";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setbutton] = useState(true);
  const navigate = useNavigate();

  const clickToggle = () => setClick(!click);
  const handleClick = (routePath) => (event) => {
    setClick(false);
    if (window.location.pathname === "/createPage") {
      event.preventDefault();
      Swal.fire({
        title: "Warning",
        text: "Leaving this page will cause you to lose all progress",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "I wany to stay",
        cancelButtonText: "Leave",
        confirmButtonColor: "#64bcbf",
        cancelButtonColor: "#c93939d9",
        heightAuto: false,
      }).then((result) => {
        if (!result.isConfirmed) {
          navigate(routePath);
        }
      });
    }
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setbutton(false);
    } else {
      setbutton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={handleClick("/")}>
            VidWizard&nbsp; <FontAwesomeIcon icon={faVideo} />
          </Link>
          <div className="menu-icon" onClick={clickToggle}>
            {click ? (
              <FontAwesomeIcon icon={faTimes} style={{ color: "#ffffff" }} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item text-underline">
              <Link to="/" className="nav-links" onClick={handleClick("/")}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about-us"
                className="nav-links"
                onClick={handleClick("/about-us")}
              >
                About Us
              </Link>
            </li>
          </ul>
          {button && (
            <Button
              buttonStyle="btn--outline"
              linkPath="/createPage"
              onClick={handleClick("/createPage")}
            >
              Create
            </Button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
