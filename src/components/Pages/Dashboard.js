import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <style>
        {`
          .welcome {
            text-align: center;
            margin-top: 20px;
          }
          .info-section {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
            padding: 20px;
            background-color: #f0f4f8; /* Light background for contrast */
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s;
          }
          .info-section:hover {
            background-color: #e0e7ef; /* Slightly darker background on hover */
          }
          .info-box {
            background-color: white; /* White background for each box */
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            flex: 1;
            margin: 0 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .info-box:hover {
            transform: translateY(-5px); /* Lift effect on hover */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Darker shadow on hover */
          }
          .info-title {
            font-size: 20px; /* Larger title font size */
            font-weight: bold;
            color: #063970; /* Dark blue color for title */
            margin-bottom: 10px; /* Space below title */
          }
          .info-details {
            font-size: 16px; /* Standard details font size */
            color: #333; /* Dark text color for details */
            margin-top: 10px; /* Space above details */
          }
        `}
      </style>
      <div className="welcome">
        <h1>Welcome, Dr. Pragnesh Suthar!</h1>
        <p>
          Manage your clinic with ease. Access patients, appointments,
          inventory, and certificates from the menu.{" "}
          <strong>Start now and enhance your clinic's efficiency!</strong>
        </p>
      </div>
      <div className="info-section">
        <div className="info-box">
          <div className="info-title">Today's OPD</div>
          <div className="info-details">
            You have 10 patients in OPD today.{" "}
            <NavLink to="/opd" className="info-details">
              View Details
            </NavLink>
          </div>
        </div>
        <div className="info-box">
          <div className="info-title">Medicine Inventory</div>
          <div className="info-details">
            5 medicines are low in stock.{" "}
            <NavLink to="/inventory" className="info-details">
              Update Inventory
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
