import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../../img/icon.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";

const MainPage = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
     <style>
        {`
          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #063970;
            padding: 10px 20px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            flex-wrap: wrap;
          }
          .left-section {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          .logo {
            height: 50px;
            width: 50px;
            border-radius: 50%;
          }
          .nav-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
          }
          .nav-item {
            cursor: pointer;
            text-decoration: none;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
          }
          .nav-item.active {
            background-color: white;
            color: black;
          }
          .settings {
            position: relative;
            cursor: pointer;
          }
          .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
          }
          .dropdown-item {
            display: block;
            padding: 10px 20px;
            color: #063970;
            text-decoration: none;
          }
          .dropdown-item:hover {
            background-color: #f0f0f0;
          }
         
          @media (max-width: 768px) {
            nav {
              flex-direction: column;
              align-items: flex-start;
            }
            .nav-links {
              flex-direction: column;
              gap: 10px;
            }
          }
        `}
      </style>
      <nav>
        <div className="left-section">
          <img src={logoImg} alt="Logo" className="logo" />
          <span>Maharshi Homeopathic Clinic</span>
        </div>
        <div className="nav-links">
          <NavLink to="/" className="nav-item" activeClassName="active">
            Dashboard
          </NavLink>
          <NavLink to="/patients" className="nav-item" activeClassName="active">
            Patients
          </NavLink>
         
          <NavLink to="/inventory" className="nav-item" activeClassName="active">
            Medicine Inventory
          </NavLink>
          <NavLink to="/opd" className="nav-item" activeClassName="active">
            OPD
          </NavLink>
          <NavLink to="/certificate" className="nav-item" activeClassName="active">
            Certificate
          </NavLink>
          
        </div>
        <div className="settings" onClick={toggleDropdown}>
  <i className="fas fa-cog" style={{ fontSize: "24px", color: "white" }}></i>
  {dropdownVisible && (
    <div
      className="dropdown"
      style={{
        position: "absolute",
        top: "100%",
        right: 0,
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        padding: "10px 0",
      }}
    >
      <NavLink to="/backup" className="dropdown-item" style={{ padding: "10px 20px", display: "block", color: "#063970", textDecoration: "none" }}>
        Backup
      </NavLink>
      <NavLink to="/admin" className="dropdown-item" style={{ padding: "10px 20px", display: "block", color: "#063970", textDecoration: "none" }}>
        Admin Panel
      </NavLink>
    </div>
  )}
</div>

      </nav>
    </div>
  );
};

export default MainPage;
