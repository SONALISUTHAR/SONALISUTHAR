import React, { useState } from "react";
import Table from "../ReusebleTable/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Patient() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    contactNo: "",
    dateOfBirth: "",
    age: "",
    address: "",
    familyHistory: "",
    patientHistory: "",
    caseCity: "",
    caseNo: "",
    openingBalance: "",
    isNRI: false,
    referenceName: "",
    note: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    pincode: "",
    city: "",
    state: "",
    country: "",
  });


  const [showFamilyHistoryModal, setShowFamilyHistoryModal] = useState(false);
  const [familyHistoryData, setFamilyHistoryData] = useState({
    member: "",
    disease: "",
  });


  const [showDiseaseModal, setShowDiseaseModal] = useState(false);
  const [diseaseData, setDiseaseData] = useState({ name: "" }); // For creating a new disease
  const [searchTerm, setSearchTerm] = useState("");
  const [diseaseList, setDiseaseList] = useState([]); // Store existing diseases

  const handleDiseaseModalOpen = () => setShowDiseaseModal(true);
  const handleDiseaseModalClose = () => setShowDiseaseModal(false);



  const columns = [
    { field: "name", header: "Name" },
    { field: "customer", header: "Patient Name" },

    { field: "final_after_discount", header: "Contact No" },
    { field: "pay_method", header: "Case City" },
    { field: "pay_method", header: "Case No" },
    { field: "final_after_discount", header: "Address" },
    { field: "date", header: "Refreance No" },
  ];

  const handleFamilyHistoryClick = () => setShowFamilyHistoryModal(true);
  const handleFamilyHistoryModalClose = () => setShowFamilyHistoryModal(false);
  const handleFamilyHistoryModalSave = () => {
    setFormData((prev) => ({
      ...prev,
      familyHistory: `Member: ${familyHistoryData.member}, Disease: ${familyHistoryData.disease}`,
    }));
    handleFamilyHistoryModalClose();
  };



  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  const handleModalSave = () => {
    setFormData((prev) => ({
      ...prev,
      address: `${formData.pincode}, ${formData.city}, ${formData.state}, ${formData.country}`,
    }));
    handleModalClose();
  };

  const handleDiseaseSave = () => {
    const diseaseToSave = searchTerm.trim(); // Use searchTerm instead of diseaseData.name

    // Check if the input is not empty
    if (diseaseToSave) {
      // Add API call to save the new disease (if needed)
      console.log("New Disease Saved:", diseaseToSave);

      // Append new disease to history
      setFormData((prev) => ({
        ...prev,
        patientHistory: prev.patientHistory
          ? `${prev.patientHistory}, ${diseaseToSave}`
          : diseaseToSave,
      }));

      // Optionally reset the search term if you want to clear the input after saving
      setSearchTerm(''); // Clear the search field after saving
    } else {
      console.log("No disease entered.");
    }

    handleDiseaseModalClose();
  };


  const handleDiseaseChange = (e) => {
    setDiseaseData({ ...diseaseData, name: e.target.value });
  };

  const handleDiseaseSearch = () => {
    // Mock data for demonstration; in real implementation, this should come from an API
    const mockSearchResults = ["Flu", "COVID-19", "Diabetes"]; // Existing diseases

    // Filter diseases based on the current searchTerm
    const filteredDiseases = mockSearchResults.filter((disease) => disease.includes(searchTerm));

    // If the search term is not already in the existing list, add it as a potential new disease
    if (searchTerm && !mockSearchResults.includes(searchTerm)) {
      filteredDiseases.push(searchTerm);
    }

    // Update the disease list with the filtered results
    setDiseaseList(filteredDiseases);
  };


  const handleFamilyHistoryChange = (e) => {
    const { name, value } = e.target;
    setFamilyHistoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Add API call logic here
  };

  return (
    <div className="container mt-5 " >
      <div className="card shadow" style={{ borderRadius: '30px', border: "none" }}>
        <h4
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#D84040', // Set the background color
            color: 'white', // Change text color for contrast
            borderRadius: '30px 30px 0px 0',// Optional: if you want rounded corners on the title
            padding: '10px', // Optional: add padding for better appearance
            margin: 0, // Remove default margin
          }}
          className="mb-0"
        >
          Patient Information Form
        </h4>
        <div style={{ borderRadius: '20px' }}>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-4">
              <div className="col-md-3">
                <label className="form-label">Name</label>
                <input

                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Contact No</label>
                <input
                  type="tel"
                  name="contactNo"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={formData.contactNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Click to add address"
                  value={formData.address}
                  readOnly
                  onClick={handleModalOpen}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Family History</label>
                <input
                  name="familyHistory"
                  className="form-control"
                  placeholder="Click to add family history"
                  value={formData.familyHistory}
                  readOnly
                  onClick={handleFamilyHistoryClick}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Patient History</label>
                <input
                  name="patientHistory"
                  className="form-control"
                  placeholder="Click to add patient history"
                  value={formData.patientHistory}
                  readOnly
                  onClick={handleDiseaseModalOpen}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Case City</label>
                <input
                  type="text"
                  name="caseCity"
                  className="form-control"
                  placeholder="Enter city"
                  value={formData.caseCity}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Case No</label>
                <input
                  type="number"
                  name="caseNo"
                  className="form-control"
                  placeholder="Enter case number"
                  value={formData.caseNo}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Opening Balance</label>
                <input
                  type="number"
                  name="openingBalance"
                  className="form-control"
                  placeholder="Enter balance"
                  value={formData.openingBalance}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Reference Name</label>
                <input
                  type="text"
                  name="referenceName"
                  className="form-control"
                  placeholder="Enter reference name"
                  value={formData.referenceName}
                  onChange={handleChange}
                />
              </div>


              <div className="col-md-3">
                <label className="form-label">Note</label>
                <textarea
                  name="note"
                  className="form-control"
                  placeholder="Enter any notes"
                  rows="2"
                  value={formData.note}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-md-3">
                <label className="form-label">Is NRI</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="isNRI"
                    className="form-check-input"
                    checked={formData.isNRI}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
              </div>
              <div className="col-12 text-end">
                <button type="submit" style={{
                  width: "181px"
                  , height: '45px',
                  borderRadius: '20px',
                  backgroundColor: '#063970',
                  color: 'white',
                  fontSize: '20px'
                }}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Area 1</label>
              <input
                type="text"
                name="area1"
                className="form-control"
                value={formData.area1}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Area 2</label>
              <input
                type="text"
                name="area2"
                className="form-control"
                value={formData.area2}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Country</label>
              <input
                type="text"
                name="country"
                className="form-control"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Address
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Family History Modal */}
      <Modal show={showFamilyHistoryModal} onHide={handleFamilyHistoryModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Family History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Member</label>
              <input
                type="text"
                name="member"
                className="form-control"
                value={familyHistoryData.member}
                onChange={handleFamilyHistoryChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Disease</label>
              <input
                type="text"
                name="disease"
                className="form-control"
                value={familyHistoryData.disease}
                onChange={handleFamilyHistoryChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFamilyHistoryModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFamilyHistoryModalSave}>
            Save Family History
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Disease Modal */}

      <Modal show={showDiseaseModal} onHide={handleDiseaseModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Patient History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Search Disease</label>
              <input
                type="text"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={handleDiseaseSearch}
              />
            </div>
            <div>
              <ul>
                {diseaseList.length > 0 ? (
                  diseaseList.map((disease, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setDiseaseData({ name: disease });
                        setSearchTerm(disease); // Set the search term to the selected disease
                      }}
                    >
                      {disease}
                    </li>
                  ))
                ) : (
                  <li>No diseases found</li>
                )}
              </ul>
            </div>
            {/* No need for a separate field for New Disease */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDiseaseModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDiseaseSave}>
            Save Disease
          </Button>
        </Modal.Footer>
      </Modal>

      {/* table */}
      <div
        className="container mt-5"
        style={{
          backgroundColor: "white",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Adjusted for darker and more spread shadow
          border: "none",
          borderRadius: '30px',
          padding: '20px', // Optional: Add padding for better spacing
        }}
      >


        <Table
          data={""}
          showFooter={false}
          columns={columns}
          showAction={true}
        />

      </div>
    </div>
  );
}

export default Patient;