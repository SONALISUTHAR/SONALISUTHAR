import React from "react";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Patients from "./components/Pages/Patients";
import Dashboard from "./components/Pages/Dashboard";
import MedicineInventory from './components/Pages/MedicineInventory'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div><Dashboard/></div>} /> {/* Dashboard Content */}
          <Route path="patients" element={<Patients />} />
          <Route path="opd" element={<div>OPD Content</div>} />
          <Route path="inventory" element={<div><MedicineInventory/></div>} />
          <Route path="certificate" element={<div>Certificate Content</div>} />
          <Route path="backup" element={<div>Backup Content</div>} />
          <Route path="admin" element={<div>Admin Panel Content</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
