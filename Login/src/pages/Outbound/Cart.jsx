import "./Cart.css";
import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { productData } from "../../data/ProductsData"; // Import ข้อมูลสินค้า
import { FaUserCircle } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { FaShoppingCart } from "react-icons/fa";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // ดึงข้อมูลตะกร้าจาก localStorage เมื่อหน้าโหลด
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  // -------------------- State สำหรับ Pagination -------------------- //
  const [itemsPerPage, setItemsPerPage] = useState(10); // ค่าเริ่มต้น: แสดง 10 รายการต่อหน้า
  const [currentPage, setCurrentPage] = useState(1);

  //--------------------function handleShowChange-------------------------//
  const handleShowChange = (e) => {
    setItemsToShow(parseInt(e.target.value)); // เปลี่ยนจำนวนที่จะแสดงตามค่าที่เลือก
  };

  // จำนวนรายการทั้งหมด
  const totalItems = cartItems.length;

  // คำนวณรายการที่จะแสดงในหน้าปัจจุบัน
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = cartItems.slice(startIndex, endIndex);

  // เปลี่ยนจำนวนรายการที่จะแสดงต่อหน้า
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // รีเซ็ตไปที่หน้าที่ 1
  };

  // เปลี่ยนหน้าปัจจุบัน
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // ฟังก์ชันลบสินค้าจากตะกร้า
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);

    // อัปเดตข้อมูลใน localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // --------------------State สำหรับ modal---------------------//
  const [show, setShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [reason, setReason] = useState("");

  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false); // ควบคุม Modal แจ้งเตือน
  const handleCloseEmptyCartModal = () => setShowEmptyCartModal(false); // ฟังก์ชันปิด Modal

  const [showErrorModal, setShowErrorModal] = useState(false); // สถานะสำหรับ modal ข้อผิดพลาด
  const [errorMessage, setErrorMessage] = useState(""); // ข้อความที่จะแสดงใน modal
  const handleCloseErrorModal = () => setShowErrorModal(false);

  const handleClose = () => {
    setShow(false);
    setSelectedProject(""); // รีเซ็ตค่าโครงการ
    setReason(""); // รีเซ็ตเหตุผล
  };

  const handleShow = () => {
    if (cartItems.length === 0) {
      setShowEmptyCartModal(true); // แสดง Modal หากไม่มีสินค้า
      return;
    }
    setShow(true); // เปิด Modal ถ้ามีสินค้า
  };

  const handleConfirm = () => {
    if (!selectedProject || !reason) {
      setErrorMessage("กรุณาเลือกโครงการและกรอกเหตุผลให้ครบถ้วน"); // ข้อความแจ้งเตือน
      setShowErrorModal(true); // แสดง modal
      return;
    }

    // คัดลอกสินค้าจาก cartItems มา
    const updatedStatusItems = cartItems.map((item) => ({
      ...item,
      status: "waiting", // เริ่มต้นสถานะเป็น 'waiting'
    }));

    // กระบวนการเมื่อข้อมูลครบถ้วน
    console.log("Selected Project:", selectedProject);
    console.log("Reason:", reason);

    // ดึงข้อมูล statusItems ที่มีอยู่แล้วใน localStorage
    const existingStatusItems =
      JSON.parse(localStorage.getItem("statusItems")) || [];

    // รวมสินค้าจากตะกร้าเข้าไปใน statusItems
    const allStatusItems = [...existingStatusItems, ...updatedStatusItems];

    // บันทึกข้อมูลใน localStorage
    localStorage.setItem("statusItems", JSON.stringify(allStatusItems));

    // ล้างตะกร้า
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([])); // อัปเดต localStorage

    // รีเซ็ตค่าเมื่อกดยืนยัน
    setSelectedProject("");
    setReason("");
    // ปิด Modal
    handleClose();
  };

  return (
    <div className="cart-container">
      <div className="top-bar-cart"></div>
      {/* Header */}
      <div
        className="d-flex align-items-center mb-4"
        style={{ marginLeft: "20px" }}
      >
        <h2
          className="m-0 d-flex align-items-center"
          style={{ color: "#473366", fontSize: "2rem", fontWeight: "bold" }}
        >
          <FaShoppingCart className="me-3" size={30} />
          Cart
        </h2>
      </div>

      {/* ----------------------------showing---------------------------- */}
      <div className="showing-cart">
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
          Showing&nbsp;
        </span>
        <select
          className="form-select"
          aria-label="Default select example"
          value={itemsPerPage} // ผูก state itemsPerPage
          onChange={handleItemsPerPageChange} // เรียกฟังก์ชัน handleItemsPerPageChange เมื่อเปลี่ยนค่า
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* ---------------------------products-------------------------------- */}
      <div className="products-cart-list">
        <table>
          <thead className="table-header-cart">
            <tr>
              <th width="250px" style={{ textAlign: "center" }}>
                Product Image
              </th>{" "}
              {/* เพิ่มคอลัมน์สำหรับแสดงภาพสินค้า */}
              <th width="350px">Product Name</th>
              <th width="200px" style={{ textAlign: "center" }}>
                Product ID
              </th>
              <th width="400px" style={{ textAlign: "center" }}>
                Category
              </th>
              <th width="200px">Quantity</th>
            </tr>
          </thead>
          <tbody className="table-body-cart">
            {displayedData.map((item, index) => {
              // ค้นหาภาพที่ตรงกับ id ของสินค้า
              const product = productData.find((prod) => prod.id === item.id);
              return (
                <tr key={index} style={{ backgroundColor: "#F2F2E6" }}>
                  <td>
                    {/* แสดงภาพจากข้อมูลที่ตรงกับ product id */}
                    {product && (
                      <img
                        src={product.imageUrl}
                        alt={item.name}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "5px",
                          marginLeft: "100px",
                        }}
                      />
                    )}
                  </td>
                  <td style={{ textAlign: "left" }}>{item.name}</td>
                  <td style={{ textAlign: "center" }}>{item.id}</td>
                  {/* เพิ่มการแสดง Product ID */}
                  <td style={{ textAlign: "center" }}>{item.category}</td>
                  {/* เพิ่มการแสดง Category */}
                  <td className="quantity-cell-cart">
                    {/* แสดงจำนวนสินค้าที่เลือก */}
                    <div className="quantity-container-cart">
                      <span>{item.quantity}</span>

                      {/* ------------------------------trash-button------------------------- */}
                      <button
                        className="trash-button"
                        onClick={() => removeFromCart(item.id)} // เรียกฟังก์ชัน removeFromCart เมื่อคลิกปุ่ม trash
                      >
                        <span>
                          <FaRegTrashAlt size={25} />
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ----------------------------send-request-button------------------------- */}
      <div className="cart-actions">
        <button
          className="send-request-button"
          style={{ fontSize: "20px" }}
          onClick={handleShow}
        >
          <span>ส่งคำขอเบิก</span>
        </button>
      </div>

      {/* ------------------------------Modal แจ้งเตือน----------------------------- */}
      <Modal
        show={showEmptyCartModal}
        onHide={handleCloseEmptyCartModal}
        centered
      >
        <Modal.Header style={{ backgroundColor: "#F2F2E6" }}>
          <Modal.Title
            style={{ fontSize: "24px", color: "red", fontWeight: "bold" }}
          >
            แจ้งเตือน
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#F2F2E6",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          ไม่สามารถส่งคำขอเบิกได้ เนื่องจากไม่มีรายการสินค้าในตะกร้า
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#F2F2E6" }}>
          <Button
            style={{ backgroundColor: "#B3B4AD", border: "none" }}
            onClick={handleCloseEmptyCartModal}
          >
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>

      {/* --------------------------modal----------------------------- */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          style={{
            backgroundColor: "#F2F2E6",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          <Modal.Title>ส่งคำขอเบิก</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#F2F2E6", fontSize: "20px" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "20px", fontWeight: "bold" }}>
                โครงการ
              </Form.Label>
              {/* Dropdown สำหรับเลือกโครงการ */}
              <Form.Select
                style={{ backgroundColor: "white", borderRadius: "10px" }}
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="" disabled>
                  -- เลือกโครงการ --
                </option>
                <option value="Organize an event">Organize an event</option>
                <option value="Project A">Project A</option>
                <option value="Project B">Project B</option>
                <option value="Project C">Project C</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "20px", fontWeight: "bold" }}>
                เหตุผล
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกเหตุผล"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "#F2F2E6" }}>
          <Button
            style={{ backgroundColor: "#B3B4AD", border: "none" }}
            onClick={handleClose}
          >
            ยกเลิก
          </Button>
          <Button
            style={{ backgroundColor: "#FD6E2B", border: "none" }}
            onClick={() => {
              console.log("Selected Project:", selectedProject);
              console.log("Reason:", reason);
              handleConfirm();
            }}
          >
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal สำหรับแจ้งเตือนข้อผิดพลาด */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header style={{ backgroundColor: "#F2F2E6" }}>
          <Modal.Title
            style={{ fontSize: "24px", color: "red", fontWeight: "bold" }}
          >
            แจ้งเตือน
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#F2F2E6",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          {errorMessage}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#F2F2E6" }}>
          <Button
            style={{ backgroundColor: "#B3B4AD", border: "none" }}
            onClick={handleCloseErrorModal}
          >
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Cart;
