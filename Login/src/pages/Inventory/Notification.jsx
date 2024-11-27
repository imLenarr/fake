import React, { useState } from "react";
import { Button, Card, Badge, Form, Popover, Overlay } from "react-bootstrap";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  BsCheckCircleFill,
  BsXCircleFill,
  BsExclamationTriangleFill,
} from "react-icons/bs";
import { productData } from "../../data/ProductsData"; // Import product data

const Notification = () => {
  // Sample withdrawal requests data
  const [requests, setRequests] = useState([
    {
      id: 1,
      productName: "A4 Copy Paper",
      quantity: 20,
      productId: "OF003",
      projectName: "organize an event",
      reason: "ไว้ใช้งาน",
      requestDate: "2024-11-28",
      status: "pending",
      requestedBy: "John Doe",
    },
    {
      id: 2,
      productName: "Whiteboard Markers",
      quantity: 10,
      productId: "OF004",
      projectName: "organize an event",
      reason: "ไว้ใช้วาดเขียน",
      requestDate: "2024-11-28",
      status: "pending",
      requestedBy: "Jane Smith",
    },
    {
      id: 3,
      productName: "Conference Microphone System",
      quantity: 20,
      productId: "EV003",
      projectName: "organize an event",
      reason: "",
      requestDate: "2024-11-20",
      status: "pending",
      requestedBy: "John Cena",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [products, setProducts] = useState(productData);

  const checkStockStatus = (productId, requestQuantity) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return "insufficient";
  
    if (product.quantity >= requestQuantity) return "sufficient"; // เพียงพอ
    if (product.quantity > 0 && product.quantity < requestQuantity) return "insufficient"; // ไม่เพียงพอ
    return "insufficient"; // สินค้าหมด
  };

  const handleApprove = (requestId) => {
    const request = requests.find((req) => req.id === requestId);
    const productIndex = products.findIndex((p) => p.id === request.productId);

    if (
      productIndex !== -1 &&
      products[productIndex].quantity >= request.quantity
    ) {
      // Update product quantity
      const updatedProducts = [...products];
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: updatedProducts[productIndex].quantity - request.quantity,
      };

      // Update product status if needed
      const newQuantity = updatedProducts[productIndex].quantity;
      if (newQuantity === 0) {
        updatedProducts[productIndex].status = "Out of Stock";
      } else if (newQuantity < 50) {
        // Adjust threshold as needed
        updatedProducts[productIndex].status = "Low Stock";
      }

      setProducts(updatedProducts);

      // Update request status
      setRequests(
        requests.map((req) =>
          req.id === requestId ? { ...req, status: "approved" } : req
        )
      );
    } else {
      alert("Insufficient stock to approve this request");
    }
  };

  const handleReject = (requestId) => {
    if (!rejectReason.trim()) return;

    setRequests(
      requests.map((req) =>
        req.id === requestId
          ? { ...req, status: "rejected", rejectReason }
          : req
      )
    );
    setRejectReason("");
    setSelectedRequest(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Pending</Badge>;
      case "approved":
        return <Badge bg="success">Approved</Badge>;
      case "rejected":
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return null;
    }
  };

  const getStockStatusIcon = (status) => {
    switch (status) {
      case "sufficient":
        return (
          <div className="d-flex align-items-center text-success">
            <BsCheckCircleFill className="me-1" />
            <small>มีสต๊อกเพียงพอ</small>
          </div>
        );
      case "limited":
        return (
          <div className="d-flex align-items-center text-warning">
            <BsExclamationTriangleFill className="me-1" />
            <small>สินค้ามีจำนวนจำกัด</small>
          </div>
        );
      case "insufficient":
        return (
          <div className="d-flex align-items-center text-danger">
            <BsXCircleFill className="me-1" />
            <small>สต๊อกสินค้าไม่เพียงพอ</small>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="position-relative">
      <Button
        variant=""
        className="rounded-circle p-2"
        onClick={(e) => {
          setShow(!show);
          setTarget(e.target);
        }}
        style={{ width: "50px", height: "50px" }}
      >
        <div className="position-relative">
          <IoNotificationsOutline size={25} style={{ color: "white" }} />
          {requests.filter((r) => r.status === "pending").length > 0 && (
            <Badge
              bg="danger"
              className="position-absolute top-0 start-100 translate-middle rounded-circle"
              style={{ fontSize: "0.6rem", padding: "0.25rem" }}
            >
              {requests.filter((r) => r.status === "pending").length}
            </Badge>
          )}
        </div>
      </Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom-end"
        rootClose
        onHide={() => setShow(false)}
      >
        <Popover style={{ width: "400px", maxWidth: "100%" }}>
          <Popover.Header>
            <h6 className="mb-0">Outbound Requests</h6>
          </Popover.Header>
          <Popover.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
            {requests.map((request) => (
              <Card key={request.id} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0">{request.productName}</h6>
                    {getStatusBadge(request.status)}
                  </div>

                  <div className="small mb-2">
                    <p className="mb-1">
                      <strong>ส่งขอเบิกโดย :</strong> {request.requestedBy}
                    </p>
                    <p className="mb-1">
                      <strong>โครงการ:</strong> {request.projectName}
                    </p>
                    <p className="mb-1">
                      <strong>จำนวน:</strong> {request.quantity}
                    </p>
                    <p className="mb-1">
                      <strong>เหตุผล:</strong> {request.reason}
                    </p>
                    <p className="mb-1">
                      <strong>Date:</strong> {request.requestDate}
                    </p>
                  </div>

                  {request.status === "pending" && (
                    <>
                      {getStockStatusIcon(
                        checkStockStatus(request.productId, request.quantity)
                      )}

                      <div className="mt-2">
                        {selectedRequest !== request.id ? (
                          <div className="d-flex gap-2">
                            <Button
                              variant="success"
                              size="sm"
                              className="flex-grow-1"
                              onClick={() => handleApprove(request.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              className="flex-grow-1"
                              onClick={() => setSelectedRequest(request.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Form.Control
                              type="text"
                              placeholder="Enter rejection reason..."
                              value={rejectReason}
                              onChange={(e) => setRejectReason(e.target.value)}
                              className="mb-2"
                              size="sm"
                            />
                            <div className="d-flex gap-2">
                              <Button
                                variant="danger"
                                size="sm"
                                className="flex-grow-1"
                                onClick={() => handleReject(request.id)}
                              >
                                Confirm Reject
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                className="flex-grow-1"
                                onClick={() => {
                                  setSelectedRequest(null);
                                  setRejectReason("");
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {request.status === "rejected" && request.rejectReason && (
                    <p className="small text-danger mt-2">
                      <strong>Rejection reason:</strong> {request.rejectReason}
                    </p>
                  )}
                </Card.Body>
              </Card>
            ))}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default Notification;