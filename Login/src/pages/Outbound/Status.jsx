import "./Status.css";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CiClock2 } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import Pagination from "../../components/Pagination";
import { TbXboxX } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
// import Profile from "../../data/Profile";

function Status() {
  const [statusItems, setStatusItems] = useState([]);
  const [switchChecked, setSwitchChecked] = useState(false); // สถานะของสวิตช์

  const [currentPage, setCurrentPage] = useState(1); // เก็บหน้าปัจจุบัน
  const [itemsPerPage, setItemsPerPage] = useState(10); // เปลี่ยนเป็น state

  const [rejectedReason, setRejectedReason] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showAlert, setShowAlert] = useState(false); // สถานะสำหรับ Modal แจ้งเตือน
  const handleCloseAlert = () => setShowAlert(false); // ปิด Modal แจ้งเตือน

  const [showRejectedReasonModal, setShowRejectedReasonModal] = useState(false);
  const handleRejected = (uniqueKey) => {
    // ตั้งเหตุผลที่ต้องการแสดง
    setRejectedReason("สต็อกสินค้ามีไม่เพียงพอ"); // เปลี่ยนข้อความตามที่ต้องการ
    setShowRejectedReasonModal(true); // เปิด Modal
  };

  // ฟังก์ชันเช็คว่ามีรายการที่สถานะ "done" หรือ "rejected"
  const handleShow = () => {
    const hasDoneOrRejectedItems = statusItems.some(
      (item) => item.status === "done" || item.status === "rejected"
    );
    if (hasDoneOrRejectedItems) {
      setShow(true); // แสดง Modal ยืนยันการลบ
    } else {
      setShowAlert(true); // แสดง Modal แจ้งเตือน
    }
  };

  // ฟังก์ชันลบรายการที่สถานะเป็น "done" หรือ "rejected"
  const deleteDoneAndRejectedItems = () => {
    const filteredItems = statusItems.filter(
      (item) => item.status !== "done" && item.status !== "rejected"
    );
    setStatusItems(filteredItems);

    // บันทึกข้อมูลที่อัปเดตกลับไปยัง localStorage
    localStorage.setItem("statusItems", JSON.stringify(filteredItems));

    // ปิด Modal
    handleClose();
  };

  // ฟังก์ชันกรองข้อมูล
  const filteredData = switchChecked
    ? statusItems.filter((item) => item.status === "waiting")
    : statusItems;

  // ฟังก์ชันเปลี่ยนสถานะสวิตช์
  const handleSwitchChange = () => {
    setSwitchChecked(!switchChecked);
  };

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value)); // อัปเดต state ของ itemsPerPage
    setCurrentPage(1); // รีเซ็ตหน้าเป็นหน้าแรกเมื่อเปลี่ยนจำนวนรายการต่อหน้า
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ดึงข้อมูล statusItems จาก localStorage เมื่อหน้าโหลด
  useEffect(() => {
    const savedStatusItems = localStorage.getItem("statusItems");
    if (savedStatusItems) {
      // เพิ่ม uniqueKey ให้แต่ละอินสแตนซ์ที่โหลด
      const loadedItems = JSON.parse(savedStatusItems).map((item, index) => ({
        ...item,
        uniqueKey: `${item.id}-${index}`, // สร้าง uniqueKey สำหรับแต่ละรายการ
        status: item.status || "waiting", // ถ้าไม่มีสถานะ ให้กำหนดเป็น waiting
      }));
      setStatusItems(loadedItems);
    }
  }, []);

  // ฟังก์ชันเปลี่ยนสถานะเป็น done
  const handleStatusChange = (uniqueKey, status) => {
    const updatedItems = statusItems.map((item) => {
      if (item.uniqueKey === uniqueKey) {
        let newStatus = item.status;

        // ถ้าสถานะเป็น "waiting" จะเปลี่ยนไปเป็น "done"
        if (item.status === "waiting" && status === "done") {
          newStatus = "done";
        }
        // ถ้าสถานะเป็น "done" จะเปลี่ยนไปเป็น "rejected"
        else if (item.status === "done" && status === "rejected") {
          newStatus = "rejected";
        }

        return { ...item, status: newStatus };
      }
      return item;
    });

    setStatusItems(updatedItems);

    // บันทึกกลับไปใน localStorage
    localStorage.setItem("statusItems", JSON.stringify(updatedItems));
  };

  return (
    <div className="status-container" style={{ marginLeft: "264px", width: "calc(100% - 250px)" }}>
      {/* Header */}
      <div
        className="d-flex align-items-center mb-4"
        style={{ marginLeft: "20px" }}
      >
        <h2
          className="m-0 d-flex align-items-center"
          style={{ color: "#473366", fontSize: "2rem", fontWeight: "bold" }}
        >
          <GrStatusGood className="me-3" size={30} />
          Status
        </h2>
      </div>
      {/* ----------------------------showing---------------------------- */}
      <div className="showing-status">
        {/* Switch */}
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Waiting"
            checked={switchChecked}
            onChange={handleSwitchChange}
            className="status-switch"
          />
        </Form>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
          Showing&nbsp;
        </span>
        <select
          className="form-select"
          aria-label="Default select example"
          value={itemsPerPage} // ผูก state itemsToShow
          onChange={handleItemsPerPageChange} // เรียกฟังก์ชัน handleShowChange เมื่อเปลี่ยนค่า
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* ---------------------------products-------------------------------- */}
      <div className="products-status-list">
        <table>
          <thead className="table-header-status">
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
          <tbody className="table-body-status">
            {displayedData.map((item, index) => (
              <tr key={item.uniqueKey} style={{ backgroundColor: "#F2F2E6" }}>
                <td>
                  {/* แสดงภาพจากข้อมูลที่ตรงกับ product id */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "5px",
                      marginLeft: "100px",
                    }}
                  />
                </td>
                <td style={{ textAlign: "left" }}>{item.name}</td>
                <td style={{ textAlign: "center" }}>{item.id}</td>
                <td style={{ textAlign: "center" }}>{item.category}</td>
                <td className="quantity-cell-status">
                  {/* แสดงจำนวนสินค้าที่เลือก */}
                  <div className="quantity-container-status">
                    <span>{item.quantity}</span>

                    {/* ------------------------------waiting-button------------------------- */}
                    <button
                      className={`waiting-button ${
                        item.status === "done"
                          ? "done"
                          : item.status === "rejected"
                          ? "rejected"
                          : "waiting"
                      }`}
                      onClick={() => {
                        if (item.status === "waiting") {
                          handleStatusChange(item.uniqueKey, "done"); // เปลี่ยนสถานะเป็น done
                        } else if (item.status === "done") {
                          handleStatusChange(item.uniqueKey, "rejected"); // เปลี่ยนสถานะเป็น rejected
                        } else if (item.status === "rejected") {
                          handleRejected(item.uniqueKey); // แสดง modal เมื่อกด rejected
                        }
                      }}
                    >
                      {item.status === "waiting" ? (
                        <>
                          <CiClock2 size={18} style={{ marginRight: "5px" }} />
                          Waiting
                        </>
                      ) : item.status === "done" ? (
                        <>
                          <MdDone size={18} style={{ marginRight: "5px" }} />
                          Done
                        </>
                      ) : (
                        <>
                          <TbXboxX size={18} style={{ marginRight: "5px" }} />
                          Rejected
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="status-actions">
        <button
          className="delete-button-status"
          style={{ fontSize: "20px" }}
          onClick={handleShow}
        >
          <span>
            <FaRegTrashAlt size={20} />
            &nbsp;Delete
          </span>
        </button>

        {/* ------------------------------------Modal สำหรับแจ้งเตือน----------------------------------- */}
        <Modal show={showAlert} onHide={handleCloseAlert} centered>
          <Modal.Header style={{ backgroundColor: "#F2F2E6" }}>
            <Modal.Title
              style={{ fontSize: "24px", color: "red", fontWeight: "bold" }}
            >
              การแจ้งเตือน
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{
              fontSize: "18px",
              backgroundColor: "#F2F2E6",
              textAlign: "center",
            }}
          >
            ไม่สามารถลบรายการสินค้าได้ <br />
            เนื่องจากไม่มีสินค้าที่อยู่ในสถานะ&nbsp;"Done"&nbsp;หรือ&nbsp;"Rejected"
          </Modal.Body>

          <Modal.Footer style={{ backgroundColor: "#F2F2E6" }}>
            <Button
              style={{ backgroundColor: "#B3B4AD", border: "none" }}
              onClick={handleCloseAlert}
            >
              ปิด
            </Button>
          </Modal.Footer>
        </Modal>
        {/* --------------------------------Modal สำหรับยืนยันการลบ------------------------ */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header style={{ backgroundColor: "#F2F2E6" }}>
            <Modal.Title
              style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}
            >
              Confirm Delete
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{
              fontSize: "18px",
              backgroundColor: "#F2F2E6",
              textAlign: "center",
            }}
          >
            คุณต้องการลบรายการสินค้านี้หรือไม่?
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
              onClick={deleteDoneAndRejectedItems}
            >
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>

        {/* --------------------------------Modal สำหรับแสดงเหตุผล------------------------ */}
        <Modal
          show={showRejectedReasonModal}
          onHide={() => setShowRejectedReasonModal(false)} // ปิด modal
          centered
        >
          <Modal.Header style={{ backgroundColor: "#F2F2E6" }}>
            <Modal.Title
              style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}
            >
              เหตุผล
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              fontSize: "18px",
              backgroundColor: "#F2F2E6",
              textAlign: "center",
            }}
          >
            {rejectedReason} {/* แสดงเหตุผลที่ถูกปฏิเสธ */}
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#F2F2E6" }}>
            <Button
              style={{ backgroundColor: "#B3B4AD", border: "none" }}
              onClick={() => setShowRejectedReasonModal(false)} // ปิด modal
            >
              ปิด
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Status;
