import React from "react";
import Department from "./Schema/Department.json"
import APIManager from "../APIManager";
const APIManagerStarter = () => {
  return (
    <div className="container">
      <APIManager 
        data={Department}
      />
    </div>
  )
}

export default APIManagerStarter
