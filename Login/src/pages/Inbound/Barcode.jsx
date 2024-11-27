import React, { useState, useEffect } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CiInboxIn } from "react-icons/ci";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Barcode.css";

function BarcodeScanner() {
  const [tab, setTab] = useState("product");
  const [barcodeSerial, setBarcodeSerial] = useState("");

  const navigate = useNavigate();

  // Load barcode from localStorage on mount
  useEffect(() => {
    const savedBarcode = localStorage.getItem("barcode");
    if (savedBarcode) {
      setBarcodeSerial(savedBarcode);
    }
  }, []);

  const handleApproveClick = () => {
    if (!barcodeSerial.trim()) {
      alert("Please enter a valid Barcode Serial Number!");
      return;
    }

    localStorage.setItem("barcode", barcodeSerial);

    navigate("/Inbound", { state: { barcode: barcodeSerial } });
  };

  return (
    <div>
      <div style={{ marginLeft: "264px", width: "calc(100% - 250px)" }}>
        <div>
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
        </div>
      </div>

      <Container
        className="container-centered"
        style={{ marginLeft: "250px", width: "calc(100% - 250px)" }}
      >
        <div className="card shadow p-4">
          <div className="button-group mb-3">
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
          <Form.Group
            controlId="barcodeSerial"
            style={{ marginTop: "40px", padding: "0 50px" }}
          >
            <Form.Label className="label">Barcode serial number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Barcode"
              value={barcodeSerial}
              onChange={(e) => setBarcodeSerial(e.target.value)}
            />

            <Button
              className="approve-button"
              style={{ marginTop: "40px", marginLeft: "890px" }}
              onClick={handleApproveClick}
            >
              ยืนยัน
            </Button>
          </Form.Group>
        </div>
      </Container>
    </div>
  );
}

export default BarcodeScanner;
