import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Table from '../ReusebleTable/Table';

const AddMedicineForm = () => {
  const [formData, setFormData] = useState({
    medicineCode: '',
    companyName: '',
    medicineName: '',
    category: '',
    specialInstruction: '',
    dosePerDay: '',
    doseTitle:'',
    address: '',
    contact: '',
    note: '',
    area1: '',
    area2: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
  });

  const columns = [
    { field: "name", header: "Name" },
    { field: "customer", header: "Patient Name" },
    { field: "final_after_discount", header: "Contact No" },
    { field: "pay_method", header: "Case City" },
    { field: "pay_method", header: "Case No" },
    { field: "final_after_discount", header: "Address" },
    { field: "date", header: "Reference No" },
  ];

  // State for modals
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showDoseModal, setShowDoseModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCompanyModalOpen = () => setShowCompanyModal(true);
  const handleCompanyModalClose = () => setShowCompanyModal(false);

  const handleAddressModalOpen = () => setShowAddressModal(true);
  const handleAddressModalClose = () => setShowAddressModal(false);

  const handleDoseModalOpen = () => setShowDoseModal(true);
  const handleDoseModalClose = () => setShowDoseModal(false);

  const handleCompanySave = () => {
    // Handle saving company details here
    handleCompanyModalClose();
  };

  const handleAddressSave = () => {
    // Update formData with address details and close address modal
    const addressDetails = `${formData.area1}, ${formData.area2}, ${formData.city}, ${formData.state}, ${formData.country}, ${formData.pincode}`;
    setFormData((prevData) => ({ ...prevData, address: addressDetails }));
    handleAddressModalClose();
  };

  const handleDoseSave = () => {
    // Close the dose modal after saving
    handleDoseModalClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form Data:', formData);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow" style={{ borderRadius: '30px', border: "none" }}>
        <h4
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#D84040',
            color: 'white',
            borderRadius: '30px 30px 0px 0',
            padding: '10px',
            margin: 0,
          }}
          className="mb-0"
        >
          Add Medicine Form
        </h4>
        <div style={{ borderRadius: '20px' }}>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-4">
              <div className="col-md-3">
                <label className="form-label">Medicine Code</label>
                <input
                  type="number"
                  name="medicineCode"
                  className="form-control"
                  placeholder="Medicine code"
                  value={formData.medicineCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Company</label>
                <input
                  type="text"
                  name="companyName"
                  className="form-control"
                  placeholder="Click to add company"
                  value={formData.companyName}
                  readOnly
                  onClick={handleCompanyModalOpen}
                  style={{ cursor: "pointer" }}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Medicine Name</label>
                <input
                  type="text"
                  name="medicineName"
                  className="form-control"
                  placeholder="Enter medicine name"
                  value={formData.medicineName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Special Instruction</label>
                <input
                  type="text"
                  name="specialInstruction"
                  className="form-control"
                  placeholder="Enter special instruction"
                  value={formData.specialInstruction}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Dose Per Day</label>
                <input
                  type="number"
                  name="dosePerDay"
                  className="form-control"
                  placeholder="Click to set dose per day"
                  value={formData.dosePerDay}
                  readOnly
                  onClick={handleDoseModalOpen}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <div className="col-12 text-end">
                <button
                  type="submit"
                  style={{
                    width: "181px",
                    height: '45px',
                    borderRadius: '20px',
                    backgroundColor: '#063970',
                    color: 'white',
                    fontSize: '20px'
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Company Modal */}
      <Modal show={showCompanyModal} onHide={handleCompanyModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Company Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                name="companyName"
                className="form-control"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Contact</label>
              <input
                type="text"
                name="contact"
                className="form-control"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={formData.address}
                readOnly
                onClick={handleAddressModalOpen}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="col-md-12">
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCompanyModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCompanySave}>
            Save Company
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Address Modal */}
      <Modal show={showAddressModal} onHide={handleAddressModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address Details</Modal.Title>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddressModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddressSave}>
            Save Address
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Dose Modal */}
   {/* Dose Modal */}
<Modal show={showDoseModal} onHide={handleDoseModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Set Dose Per Day</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form className="row g-3">
      <div className="col-md-12">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="doseTitle"  // Add a new field for title
          className="form-control"
          value={formData.doseTitle || ''}  // Initialize with an empty string if undefined
          onChange={(e) => setFormData({ ...formData, doseTitle: e.target.value })}
        />
      </div>
      <div className="col-md-12">
        <label className="form-label">Dose Per Day</label>
        <input
          type="number"
          name="dosePerDay"
          className="form-control"
          value={formData.dosePerDay}
          onChange={(e) => setFormData({ ...formData, dosePerDay: e.target.value })}
        />
      </div>
    </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleDoseModalClose}>
      Close
    </Button>
    <Button variant="primary" onClick={handleDoseSave}>
      Save Dose
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
};

export default AddMedicineForm;
