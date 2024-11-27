import React, { useState, useRef } from "react";
import {
  Modal,
  Button,
  FormControl,
  DropdownButton,
  Dropdown,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { FaCamera, FaEdit } from "react-icons/fa";

const ProductDetailsModal = ({
  show,
  handleClose,
  product,
  onSave,
  onDelete,
}) => {
  const [editedProduct, setEditedProduct] = useState(product || {});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  React.useEffect(() => {
    setEditedProduct(product || {});
    setPreviewImage(null);
  }, [product]);

  React.useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleInputChange = (field, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // เก็บไฟล์จริงไว้
      setImageFile(file);

      // อัพเดทข้อมูลสิน้คาด้วยรูปภาพใหม่
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      handleInputChange("imageUrl", imageUrl);
    }
  };

  const handleSave = () => {
    onSave({
      ...editedProduct,
      imageUrl: previewImage || editedProduct.imageUrl,
      imageFile: imageFile, // ส่งไฟล์จริงกลับไปด้วย
    });

    // Clean up Blob URL
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
  };

  const handleDeleteConfirm = () => {
    onDelete(editedProduct.id);
    setShowDeleteConfirm(false);
    handleClose();
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
  };

  if (!product) return null;

  return (
    <>
      {/* Main Product Details Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        backdrop="static"
        style={{
          animation: "fadeIn 0.3s",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {/* Product Image with Upload Functionality */}
              <Col md={4} className="mb-3">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "100%",
                    overflow: "hidden",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={handleImageClick}
                >
                  <img
                    src={previewImage || editedProduct.imageUrl}
                    alt={editedProduct.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0,0,0,0.3)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0,
                      transition: "opacity 0.3s",
                      ":hover": {
                        opacity: 1,
                      },
                    }}
                  >
                    <FaCamera size={24} color="white" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="w-100 mt-2"
                  onClick={handleImageClick}
                >
                  <FaEdit className="me-2" />
                  Change Image
                </Button>
              </Col>

              {/* Rest of the existing code remains the same */}
              <Col md={8}>
                <div className="mb-3">
                  <label className="fw-bold mb-2">Product Name</label>
                  <FormControl
                    value={editedProduct.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-bold">Product ID</label>
                  <p>{editedProduct.id}</p>
                </div>

                <Row>
                  <Col sm={6}>
                    <div className="mb-3">
                      <label className="fw-bold mb-2">Quantity</label>
                      <FormControl
                        type="number"
                        value={editedProduct.quantity || ""}
                        onChange={(e) =>
                          handleInputChange("quantity", e.target.value)
                        }
                      />
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="mb-3">
                      <label className="fw-bold mb-2">Category</label>
                      <DropdownButton
                        variant="outline-secondary"
                        title={editedProduct.category || "Select Category"}
                        onSelect={(value) =>
                          handleInputChange("category", value)
                        }
                        className="w-100"
                      >
                        <Dropdown.Item eventKey="Office Supplies">
                          Office Supplies
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="IT & Technology Equipment">
                          IT & Technology Equipment
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Industrial Supplies">
                          Industrial Supplies
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Event Supplies & Services">
                          Event Supplies & Services
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <div className="mb-3">
                      <label className="fw-bold mb-2">Status</label>
                      <DropdownButton
                        variant="outline-secondary"
                        title={editedProduct.status || "Select Status"}
                        onSelect={(value) => handleInputChange("status", value)}
                        className="w-100"
                      >
                        <Dropdown.Item eventKey="In Stock">
                          In Stock
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Low Stock">
                          Low Stock
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Out of Stock">
                          Out of Stock
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="mb-3">
                      <label className="fw-bold mb-2">Barcode</label>
                      <p>{editedProduct.barcode}</p>
                    </div>
                  </Col>
                </Row>

                <div className="mb-3">
                  <label className="fw-bold mb-2">Details</label>
                  <FormControl
                    value={editedProduct.details || ""}
                    onChange={(e) =>
                      handleInputChange("details", e.target.value)
                    }
                    placeholder="Enter product details..."
                  />
                </div>

                <div className="border-top pt-3">
                  <h6 className="fw-bold mb-3">Location Information</h6>
                  <Row>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label className="fw-bold mb-2">Location</label>
                        <FormControl
                          value={editedProduct.location || ""}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <label className="fw-bold mb-2">Warehouse Area</label>
                        <FormControl
                          value={editedProduct.warehouseArea || ""}
                          onChange={(e) =>
                            handleInputChange("warehouseArea", e.target.value)
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="me-auto"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Product
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            style={{ backgroundColor: "#473366", borderColor: "#473366" }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        size="md"
        centered
      >
        <Modal.Header>
          <Modal.Title className="text-danger">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            คุณแน่ใจว่าต้องการลบผลิตภัณฑ์นี้หรือไม่
            การกระทำนี้ไม่สามารถย้อนกลับได้
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductDetailsModal;
