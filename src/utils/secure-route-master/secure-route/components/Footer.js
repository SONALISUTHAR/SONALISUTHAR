import React from "react";
import config from "../../../config/Global.json";
const Footer = () => {
  const {
    version, appName
  } = config;
  return (
    <div
      style={{
        backgroundColor: "#021526",
        color: "white",
        padding: "10px 20px",
        textAlign: "center",
        position: "fixed",
        bottom: "0",
        width: "100%",
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.2)",
        zIndex: 0,
      }}
    >
      <div className="container">
        <p className="mb-0">
          <span className="d-inline" style={{ fontSize: "14px" }}>
            {appName} made with <i className="fa fa-heart" style={{ color: 'red' }}></i> by{" "}
            <a
              href="https://www.humbingo.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Humbingo
            </a>
          </span>
          <span className="d-inline" style={{ fontSize: "12px" }}>
            {" "}
            <br />
            © Copyright {new Date().getFullYear()} Humbingo Consultancy Services LLP ™ All rights reserved.
          </span>
        </p>
      </div>
    </div>
  );
};
export default Footer;
