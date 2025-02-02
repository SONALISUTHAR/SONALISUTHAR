import { useContext, useEffect, useState } from "react"
import React from 'react'

import AuthContext from "./AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import headerJson from "../secure-route/Setup/header.json"
import { useNavigate } from "react-router-dom";

export const Auth = (props) => {
  let { user } = useContext(AuthContext);
  const [validPage, setValidPage] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if(headerJson.roleBased.isRoleBased === true){
   
      if(localStorage.getItem("role")=== null){
          localStorage.setItem("role", 'user');
          navigate("/");
      }else{
        let isValidUser = extractUrls(headerJson.menu[localStorage.getItem("role")]).includes(window.location.pathname);
        setValidPage(isValidUser);
        if (!isValidUser) {
          navigate("/");
        }
      }
      
    }
 
  }, [validPage])
  function extractUrls(menuItems) {
    let urls = [];
    menuItems.forEach(item => {
      // Add the URL of the current item if it exists
      if (item.url) {
        urls.push(item.url);
      }
      // Recursively process child items if they exist
      if (item.child) {
        urls = urls.concat(extractUrls(item.child));
      }
    });

    return urls;
  }
  return (props.check) ?
    (
      (user.user_id) ? <><Header />{props.component}<Footer /></> : <Login />
    ) : props.component

}

export default Auth;
