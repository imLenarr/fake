import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { CiInboxIn } from "react-icons/ci";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Inboundpage.css";

function UnifiedProductForm() {
  const navigate = useNavigate();

  // States
  const [tab, setTab] = useState("addnewproduct");
  const [formData, setFormData] = useState({
    displayName: "",
    category: "",
    weight: "",
    quantity: "",
    date: "",
    location: "",
    warehouseArea: "",
    productId: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null); // กรณีที่ไม่มีไฟล์
    }
  };

  // Save Function
  const handleSave = (e) => {
    e.preventDefault();
    setShowModal(true); // เปิด Modal ยืนยัน
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
  };

  const confirmSave = () => {
    setShowModal(false);

    const newBarcode = formData.productId
      ? `${formData.productId}-${Date.now()}-TE`
      : `${Date.now()}`;

    const newSerialNo = formData.productId
      ? `${formData.productId}-${Date.now()}-TE`
      : `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const dataToSend = {
      ...formData,
      imagePreview,
      barcode: newBarcode,
      serialNo: newSerialNo,
    };

    console.log("Saved Data:", { dataToSend });
    alert("Product saved successfully!");

    navigate("/Inbound", { 
      state: { ...dataToSend },
    });
  };

  return (
    <div style={{ marginLeft: "264px", width: "calc(100% - 250px)" }}>
      {/* Header */}
      <div
        className="d-flex align-items-center mb-4"
        style={{ marginLeft: "20px",  }}
      >
        <h2
          className="m-0 d-flex align-items-center"
          style={{ color: "#473366", fontSize: "2rem", fontWeight: "bold" }}
        >
          <CiInboxIn className="me-3" size={30} />
          Status
        </h2>
      </div>

      <Container fluid className="container-centered">
        <div className="card shadow p-4">
          {/* Tabs */}
          <div className="button-group mb-3">
            <button
              className={`btn ${
                tab === "product" ? "btn-active" : "btn-inactive"
              }`}
              onClick={() => navigate("/Inbound")}
            >
              Product
            </button>
            <button
              className={`btn ${
                tab === "addnewproduct" ? "btn-active" : "btn-inactive"
              }`}
              onClick={() => setTab("addnewproduct")}
            >
              Add New Product
            </button>
          </div>

          {/* Image Upload */}
          <div className="mb-3 text-center">
            <label htmlFor="productImage" className="form-label"></label>
            <div className="image-box2">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-thumbnail"
                />
              ) : (
                <i className="bi bi-image"></i>
              )}
              <div className="mt-2">
                {!imagePreview && ( // ซ่อนปุ่มเมื่ออัปโหลดรูปแล้ว
                  <>
                    <input
                      type="file"
                      id="productImage"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload} // ฟังก์ชันเดิมสำหรับการอัปโหลด
                    />
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() =>
                        document.getElementById("productImage").click()
                      }
                    >
                      Upload Image
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <Form onSubmit={handleSave} style={{ padding: "20px" }}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="displayName">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="Enter Product Name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Enter Category"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="weight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter Weight"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Enter Quantity"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Select
                    value={formData.location}
                    onChange={handleChange}
                  >
                    <option value="">Select Location</option>
                    <option value="L1-B1">L1-B1</option>
                    <option value="L1-B2">L1-B2</option>
                    <option value="L1-B3">L1-B3</option>
                    <option value="L1-B4">L1-B4</option>
                    <option value="L1-B5">L1-B5</option>
                    <option value="L1-B6">L1-B6</option>
                    <option value="L1-B7">L1-B7</option>
                    <option value="L1-B8">L1-B8</option>
                    <option value="L1-B9">L1-B9</option>
                    <option value="L1-B10">L1-B10</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="warehouseArea">
                  <Form.Label>Warehouse Area</Form.Label>
                  <Form.Select
                    value={formData.warehouseArea}
                    onChange={handleChange}
                  >
                    <option value="">Select Area</option>
                    <option value="Zone A">Zone A</option>
                    <option value="Zone B">Zone B</option>
                    <option value="Zone C">Zone C</option>
                    <option value="Zone D">Zone D</option>
                    <option value="Zone E">Zone E</option>
                    <option value="Zone F">Zone F</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="productId">
                  <Form.Label>Product ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.productId}
                    onChange={handleChange}
                    placeholder="Enter Product ID"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end" style={{ marginTop: "30px" }}>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </Form>

          {/* Modal */}
          <Modal
            show={showModal}
            onHide={closeModal}
            centered
            style={{ marginLeft: '350px', width: 'calc(100% - 250px)' }}
          >
            <Modal.Body style={{ height: 'auto', padding: '20px', backgroundColor: '#473366', borderRadius: '7px' }}>
              <h5 style={{ textAlign: 'center', marginTop: '10px', color: '#f9f9f9', height: '75px' }}>
                ยืนยันการเพิ่มสินค้าหรือไม่ ?
              </h5>
              <div
                className='d-flex justify-content-center'
                style={{ gap: '150px', marginTop: '5px' }}
              >
                <Button
                  variant='secondary'
                  onClick={closeModal}
                  style={{ padding: '10px 20px' }}
                >
                  ยกเลิก
                </Button>
                <Button
                  variant='primary'
                  onClick={confirmSave}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#FD6E2B',
                    borderColor: '#FD6E2B',
                  }}
                >
                  ยืนยัน
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </div>
  );
}

export default UnifiedProductForm;
