import React, { useState } from "react";
import Barcode from "react-barcode";
// import Barcode from "./Barcode";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { CiInboxIn } from "react-icons/ci";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Inbound.css";

function Inbound() {
  const [tab, setTab] = useState("product");

  const location = useLocation();
  const navigate = useNavigate();

  const productData = location.state || {};
  const [barcode, setBarcode] = useState(
    productData.barcode ||
      localStorage.getItem("barcode") ||
      "ไม่มีข้อมูลบาร์โค้ด"
  );

  const [formData, setFormData] = useState({
    displayName: productData.displayName || "Mac Air",
    category: productData.category || "Electronic",
    weight: productData.weight || "1.4 Kg",
    quantity: productData.quantity || 33,
    date: productData.date || "2024-11-11",
    productId: productData.productId || "1001",
    location: productData.location || "L1-B4",
    warehouseArea: productData.warehouseArea || "โซน A",
    serialNo: productData.serialNo || "456456789786453120-TE",
  });

  const [imagePreview, setImagePreview] = useState(
    productData.imagePreview || "/public/Macair.jpg"
  );

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a preview URL
      setImagePreview(imageUrl);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const confirmSave = () => {
    console.log("Saved Data:", formData);
    setShowModal(false);
    alert("Product saved successfully!");
  };

  return (
    <div style={{ marginLeft: "264px", width: "calc(100% - 250px)" }}>
      {/* Header */}
      <div
        className="d-flex align-items-center mb-4"
        style={{ marginLeft: "20px" }}
      >
        <h2
          className="m-0 d-flex align-items-center"
          style={{ color: "#473366", fontSize: "2rem", fontWeight: "bold" }}
        >
          <CiInboxIn className="me-3" size={30} />
          Status
        </h2>
      </div>

      <Container className="container-centered">
        <div className="card shadow p-4" style={{ borderRadius: "15px" }}>
          {/* Tabs */}
          <div className="button-group mb-3" style={{ padding: "20px" }}>
            <button
              className={`btn ${
                tab === "product" ? "btn-active" : "btn-inactive"
              }`}
              onClick={() => setTab("product")}
            >
              Product
            </button>
            <button
              className={`btn ${
                tab === "addnewproduct" ? "btn-active" : "btn-inactive"
              }`}
              onClick={() => navigate("/Inboundpage")}
            >
              Add New Product
            </button>
          </div>

          {/* Display Image */}
          <div className="mb-3 text-center">
            <label htmlFor="productImage" className="form-label"></label>
            <div className="image-box1">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-thumbnail"
                />
              ) : (
                <i className="bi bi-image" style={{ fontSize: "2rem" }}></i>
              )}
            </div>
            <input
              type="file"
              id="productImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
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
                <Form.Group controlId="productId">
                  <Form.Label>Product ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.productId}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Select
                    value={formData.location}
                    onChange={handleChange}
                  >
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
                    <option value="โซน A">โซน A</option>
                    <option value="โซน B">โซน B</option>
                    <option value="โซน C">โซน C</option>
                    <option value="โซน D">โซน D</option>
                    <option value="โซน E">โซน E</option>
                    <option value="โซน F">โซน F</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="serialNo">
                  <Form.Label>Serial No.</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.serialNo}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="text-center">
                <Barcode
                  value={barcode}
                  width={1.5}
                  height={60}
                  fontSize={15}
                  displayValue={true}
                />
              </Col>
            </Row>

            <div className="text-end">
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
                ยืนยันจะอัปเดตข้อมูลสินค้าหรือไม่ ?
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

export default Inbound;
