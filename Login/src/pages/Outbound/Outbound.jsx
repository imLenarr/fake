import React, { useState, useEffect } from "react";
import "./Outbound.css";
import { FaSearch } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { CiFilter } from "react-icons/ci";
import { productData } from "../../data/ProductsData";
import { GrStatusGood } from "react-icons/gr";
import { FaCartPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Pagination from "../../components/Pagination";
// import { FaUserCircle } from "react-icons/fa";
import { CiInboxOut } from "react-icons/ci";

function Outbound() {
  // --------------------State สำหรับเก็บค่าหมวดหมู่ที่เลือก----------------------------//
  const [selectedCategory, setSelectedCategory] = useState("All");

  // --------------------State สำหรับเก็บค่าการค้นหาจาก input-------------------------//
  const [searchTerm, setSearchTerm] = useState("");

  const [cartItems, setCartItems] = useState([]); // สินค้าในตะกร้า
  const [cartCount, setCartCount] = useState(0); // จำนวนสินค้าทั้งหมดในตะกร้า

  // State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --------------------useEffect สำหรับดึงข้อมูลจาก localStorage-------------------------//
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    const savedCartCount = localStorage.getItem("cartCount");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems)); // โหลดข้อมูลตะกร้าที่บันทึกไว้
    }

    if (savedCartCount) {
      setCartCount(parseInt(savedCartCount)); // โหลดจำนวนสินค้าทั้งหมด
    }
  }, []); // ทำงานเมื่อคอมโพเนนต์โหลด

  // --------------------Function เพิ่มสินค้าไปที่ตะกร้า---------------------------//
  const addToCart = (product, quantity) => {
    if (quantity <= 0) return;
    const existingItem = cartItems.find((item) => item.id === product.id);

    const updatedCartItems = existingItem
      ? cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...cartItems, { ...product, quantity }];

    // อัปเดตจำนวนสินค้าในตะกร้า
    setCartItems(updatedCartItems);
    setCartCount(cartCount + quantity);

    // บันทึกข้อมูลตะกร้าใน localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    localStorage.setItem("cartCount", updatedCartItems.length);
  };

  // --------------------State สำหรับ modal---------------------//
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setQuantity(1); // รีเซ็ตค่า quantity
    setSelectedProduct(null); // ล้างข้อมูลสินค้าที่เลือก
    setShow(false); // ปิด Modal
  };
  const handleShow = (product) => {
    setSelectedProduct(product); // กำหนดสินค้าที่เลือก
    setQuantity(1); // รีเซ็ตจำนวนสินค้าเป็น 1
    setShow(true); // แสดง Modal
  };
  const [quantity, setQuantity] = useState(1); // จำนวนสินค้าที่เลือก
  const [selectedProduct, setSelectedProduct] = useState(null); // เพิ่ม state สำหรับเก็บสินค้าที่เลือก

  //---------------------สำหรับ status & cart---------------------//
  const navigate = useNavigate();

  //--------------------function filter-------------------------//
  const filteredData = productData
    .filter((product) => {
      if (selectedCategory === "All") return true;
      return product.category === selectedCategory;
    })

    // ------------------function search-------------------------//
    .filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  //--------------------function handleShowChange-------------------------//
  const handleShowChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // รีเซ็ตหน้าปัจจุบันเมื่อเปลี่ยนจำนวนต่อหน้า
  };

  return (
    <div className="requests-container">
      <div className="top-bar-outbound">
        <div
          className="search-bar"
          style={{ marginLeft: "20px", marginTop: "10px" }}
        >
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // เมื่อมีการพิมพ์ให้เก็บค่าลงใน searchTerm
          />
        </div>
      </div>
 
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2
          className="m-0 d-flex align-items-center"
          style={{ color: "#473366", fontSize: "2rem", fontWeight: "bold"}}
        >
          <CiInboxOut className="me-3" size={30} />
          Outbound
        </h2>
      </div>

      {/* ----------------------------category---------------------------- */}
      <div
        className="dropdown"
        style={{ marginLeft: "20px", marginTop: "10px" }}
      >
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={{
              backgroundColor: "#FD6E2B",
              borderColor: "#FD6E2B",
              color: "white",
            }}
          >
            <CiFilter size={20} />
            <span>&nbsp;Category</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedCategory("All")}>
              All
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setSelectedCategory("Office Supplies")}
            >
              Office Supplies
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setSelectedCategory("IT & Technology Equipment")}
            >
              IT & Technology Equipment
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setSelectedCategory("Industrial Supplies")}
            >
              Industrial Supplies
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setSelectedCategory("Event Supplies & Services")}
            >
              Event Supplies & Services
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* -----------------------status------------------------------- */}
        <span className="status-button">
          <button onClick={() => navigate("/status")}>
            <GrStatusGood size={20} />
            &nbsp;Status
          </button>
        </span>

        {/* ----------------------showing-------------------------- */}
        <div className="showing-outbound">
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Showing&nbsp;
          </span>
          <select
            className="form-select"
            aria-label="Default select example"
            value={itemsPerPage} // ผูก state itemsToShow
            onChange={handleShowChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* ----------------------cart------------------------- */}
        <div className="cart-icon">
          <button
            onClick={() => navigate("/cart", { state: { cartItems } })} // ส่งข้อมูล cartItems ไปยังหน้าตะกร้า
            className="cart-button position-relative"
          >
            <FaShoppingCart size={30} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartItems.length > 99 ? "99+" : cartItems.length}{" "}
              {/* นับจำนวนสินค้าทั้งหมดในตะกร้า */}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </div>
      </div>

      {/* --------------------products---------------------------- */}
      <div className="products-outbound-list">
        <table>
          <thead className="table-header-outbound">
            <tr>
              <th width="250px" style={{ textAlign: "center" }}>
                Product Image
              </th>
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
          <tbody className="table-body-outbound">
            {displayedData.map((product, index) => (
              <tr key={index} style={{ backgroundColor: "#F2F2E6" }}>
                <td style={{ textAlign: "left" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "5px",
                      marginLeft: "100px",
                    }}
                  />
                </td>
                <td style={{ textAlign: "left" }}>{product.name}</td>
                <td style={{ textAlign: "center" }}>{product.id}</td>
                <td style={{ textAlign: "center" }}>{product.category}</td>
                <td className="amount-cell">
                  <div className="amount-container">
                    {product.quantity}
                    {/* -------------------------------------------cart-plus---------------------------------- */}
                    <button
                      className="cartplus-button"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShow(true);
                      }}
                    >
                      <FaCartPlus size={25} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --------------------------modal----------------------------- */}
      <Modal
        style={{ width: "350px", marginLeft: "50%" }}
        show={show}
        onHide={() => setShow(false)}
        centered
      >
        <Modal.Header style={{ backgroundColor: "#F2F2E6", fontSize: "24px" }}>
          <Modal.Title>Add to cart</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#F2F2E6", fontSize: "20px" }}>
          <span>
            ระบุจำนวนสินค้า :{" "}
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 1 && value <= (selectedProduct?.quantity || 1)) {
                  setQuantity(value); // อัปเดตจำนวนสินค้าใน state
                }
              }}
              style={{ width: "90px", textAlign: "center" }}
              min={1}
              max={selectedProduct?.quantity || 1} // ใช้ quantity ของสินค้า
            />
            &nbsp; /&nbsp;{selectedProduct?.quantity || 1}
          </span>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "#F2F2E6" }}>
          <Button
            style={{ backgroundColor: "#B3B4AD", borderColor: "#B3B4AD" }}
            onClick={handleClose}
          >
            ยกเลิก
          </Button>
          <Button
            style={{ backgroundColor: "#FD6E2B", borderColor: "#FD6E2B" }}
            onClick={() => {
              addToCart(selectedProduct, quantity); // เรียกฟังก์ชันเพิ่มสินค้า
              setQuantity(1); // รีเซ็ตจำนวนสินค้ากลับเป็น 1
              handleClose(); // ปิด Modal
            }}
          >
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Outbound;
