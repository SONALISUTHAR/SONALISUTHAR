import React from "react";
import { Route, Routes } from "react-router-dom";
import { getRoutes } from "../../../config/ComponentRegister";
import Auth from "../AuthCheck";
const RouteManager = () => {
  return (
    <Routes>
      {getRoutes().map(({ path, component, auth }, index) => {
        const Component = component;
        return (
          <Route
            key={index}
            path={path}
            element={<Auth check={auth} component={<Component />} />}
          />
        );
      })}
    </Routes>
  );
};
export default RouteManager;
