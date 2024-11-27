import React, { useState } from "react";
import {
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { CiFilter, CiEdit, CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaBoxes, FaUserCircle, FaAngleDown, FaFilter } from "react-icons/fa";

import { productData as initialProductData } from "../../data/ProductsData";
import InventoryFilter from "./InventoryFilter";
import ProductDetailsModal from "../../data/ProductDetailsModal";
import Pagination from "../../components/Pagination";
import "./Inventory.css";
import Notification from "./Notification";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState(initialProductData);
  const [activeFilters, setActiveFilters] = useState({
    status: [],
    category: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = productData.filter((product) => {
    // กรองตามคำค้นหา
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().toLowerCase().includes(searchTerm.toLowerCase());

    // กรองตาม status
    const matchesStatus =
      activeFilters.status.length === 0 ||
      activeFilters.status.some((status) => {
        // แปลงค่า status จาก filter เป็นรูปแบบเดียวกับที่เก็บในข้อมูล
        const formattedStatus =
          status === "inStock"
            ? "In Stock"
            : status === "lowStock"
            ? "Low Stock"
            : status === "outOfStock"
            ? "Out of Stock"
            : status;
        return product.status === formattedStatus;
      });

    // กรองตาม category
    const matchesCategory =
      activeFilters.category.length === 0 ||
      activeFilters.category.some((category) => {
        const formattedCategory =
          category === "Office"
            ? "Office Supplies"
            : category === "IT"
            ? "IT & Technology Equipment"
            : category === "Industrial"
            ? "Industrial Supplies"
            : category === "Event"
            ? "Event Supplies & Services"
            : category;
        return product.category === formattedCategory;
      });

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPage = (eventKey) => setItemsPerPage(parseInt(eventKey));
  // const handleFilterCategory = (category) => setSelectedCategory(category);

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  // ฟังก์ชันเปิด Modal
  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // ฟังก์ชันปิด Modal
  const handleCloseModal = () => setShowModal(false);

  // ฟังก์ชันบันทึกข้อมูล
  const handleSaveProduct = (updatedProduct) => {
    // ตรวจสอบว่ามีไฟล์รูปใหม่หรือไม่
    if (updatedProduct.imageFile) {
      // อัปโหลดรูปและรับ URL ใหม่
      const newImageUrl = URL.createObjectURL(updatedProduct.imageFile);
      
      const updatedData = productData.map((product) =>
        product.id === updatedProduct.id
          ? { 
              ...product, 
              name: updatedProduct.name,
              imageUrl: newImageUrl,
              quantity: updatedProduct.quantity,
              category: updatedProduct.category,
              status: updatedProduct.status,
              details: updatedProduct.details,
              location: updatedProduct.location,
              warehouseArea: updatedProduct.warehouseArea
            }
          : product
      );
      setProductData(updatedData);
    } else {
      // ถ้าไม่มีไฟล์ใหม่ ใช้การอัปเดตปกติ
      const updatedData = productData.map((product) =>
        product.id === updatedProduct.id
          ? { 
              ...product, 
              name: updatedProduct.name,
              quantity: updatedProduct.quantity,
              category: updatedProduct.category,
              status: updatedProduct.status,
              details: updatedProduct.details,
              location: updatedProduct.location,
              warehouseArea: updatedProduct.warehouseArea
            }
          : product
      );
      setProductData(updatedData);
    }
    
    setShowModal(false);
  };

  // ฟังก์ชันลบข้อมูล
  const handleDeleteProduct = (productId) => {
    const updatedData = productData.filter(
      (product) => product.id !== productId
    );
    setProductData(updatedData);
    setShowModal(false);
  };

  // ฟังก์ชันสําหรับการแสดงสถานะ
  const getStatusStyle = (status) => {
    switch (status) {
      case "In Stock":
        return {
          backgroundColor: "#E6F4EA", // พื้นหลังสีเขียวอ่อน
          color: "#34A853", // ตัวอักษรสีเขียวเข้ม
          borderRadius: "15px",
          padding: "5px 10px",
          fontWeight: "600",
        };
      case "Low Stock":
        return {
          backgroundColor: "#FFF4E5", // พื้นหลังสีส้มอ่อน
          color: "#FF9800", // ตัวอักษรสีส้ม
          borderRadius: "15px",
          padding: "5px 10px",
          fontWeight: "600",
        };
      case "Out of Stock":
        return {
          backgroundColor: "#FFEBEE", // พื้นหลังสีแดงอ่อน
          color: "#F44336", // ตัวอักษรสีแดง
          borderRadius: "15px",
          padding: "5px 10px",
          fontWeight: "600",
        };
      default:
        return {
          backgroundColor: "#E0E0E0", // สีเทาเป็นค่าดีฟอลต์
          color: "#757575",
          borderRadius: "15px",
          padding: "5px 10px",
          fontWeight: "600",
        };
    }
  };

  // ฟังก์ชันสําหรับการแสดงหน้าปัจจุบัน
  const totalPages = Math.ceil(productData.length / itemsPerPage);
  // อัปเดตหน้าปัจจุบัน
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="inventory" style={{ marginLeft: "250px" }}>
      {/* Topbar */}
      <div
        style={{
          // backgroundColor: "#748D8C",
          padding: "15px 30px",
          position: "fixed",
          top: 0,
          right: "135px",
          left: "295px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
          height: "70px",
          borderRadius: "10px 25px 10px 25px",
        }}
      >
        {/* Search Bar */}
        <div className="flex-grow-1" style={{ maxWidth: "400px" }}>
          <InputGroup>
            <div style={{ position: "relative", width: "100%" }}>
              <FormControl
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderRadius: "12px",
                  paddingLeft: "45px",
                  height: "45px",
                  border: "1.5px solid #E5E7EB",
                  fontSize: "14px",
                  backgroundColor: "#F9FAFB",
                }}
              />
              <CiSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "15px",
                  transform: "translateY(-50%)",
                  color: "#6B7280",
                  pointerEvents: "none",
                }}
                size={20}
              />
            </div>
          </InputGroup>
        </div>

        <div className="d-flex align-items-center gap-4">
          {/* Notification Bell */}
          <Notification />
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2
            className="m-0 d-flex align-items-center"
            style={{ color: "#473366", fontSize: "2rem", fontWeight: "bold" }}
          >
            <FaBoxes className="me-3" size={30} />
            Inventory
          </h2>

          {/* แสดงจํานวนรายการ*/}
          <div className="d-flex align-items-center ms-auto me-5">
            <span className="me-1">Showing</span>
            <DropdownButton
              variant=""
              title={<span style={{ color: "#ffffff" }}>{itemsPerPage}</span>}
              onSelect={handleItemsPerPage}
              className="custom-dropdown"
              style={{
                backgroundColor: "#EBCFCD",
                borderRadius: "15px",
                border: "none",
              }}
            >
              <Dropdown.Item eventKey="10" className="custom-dropdown-item">
                10
              </Dropdown.Item>
              <Dropdown.Item eventKey="20" className="custom-dropdown-item">
                20
              </Dropdown.Item>
              <Dropdown.Item eventKey="50" className="custom-dropdown-item">
                50
              </Dropdown.Item>
            </DropdownButton>
          </div>

          {/* ฟิลเตอร์หมวดหมู่ */}
          <InventoryFilter onApplyFilters={handleApplyFilters} />
        </div>

        {/* ตารางข้อมูลสินค้า */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "150px" }}>Product Image</th>
              <th style={{ width: "250px" }}>Product Name</th>
              <th style={{ width: "150px" }}>Product ID</th>
              <th style={{ width: "150px" }}>Quantity</th>
              <th style={{ width: "150px" }}>Category</th>
              <th style={{ width: "150px" }}>Status</th>
              <th style={{ width: "100px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.id}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>
                  <span style={getStatusStyle(product.status)}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <button
                    className="me-2"
                    style={{
                      width: "50px",
                      height: "30px",
                      backgroundColor: "#473366",
                      borderRadius: "10px",
                      borderColor: "#473366",
                      color: "#ffffff",
                    }}
                    onClick={() => handleShowModal(product)}
                  >
                    <CiEdit size={20} className="mb-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal สำหรับแสดงรายละเอียดสินค้า */}
        <ProductDetailsModal
          show={showModal}
          handleClose={handleCloseModal}
          product={selectedProduct}
          onSave={handleSaveProduct} // ฟังก์ชันนี้ควรรับค่าที่แก้ไขแล้ว
          onDelete={handleDeleteProduct}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Inventory;
