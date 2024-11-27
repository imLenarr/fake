import { useNavigate } from "react-router-dom";
import { Nav, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineInventory2 } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FaBoxes, FaChartBar, FaUsers, FaClipboardList } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import "./Sidebar.css";
import React, { useContext, useState } from "react";
import { useAuth } from "../Context/AuthContext";

const Sidebar = ({ isOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  // Define which menu items should be visible based on role
  const menuItems = {
    SUPER: ["dashboard", "reports", "settings"],
    ADMIN: ["dashboard", "inventory", "reports", "inbound"],
    USER: ["outbound"],
  };

  const isMenuVisible = (menuName) => {
    return menuItems[user?.role]?.includes(menuName);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("คุณต้องการออกจากระบบหรือไม่?");
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <div
      className={`sidebar ${isOpen ? "open" : "closed"}`}
      style={{
        backgroundColor: "#748D8C",
        borderRadius: "0 20px 20px 0",
        position: "fixed",
      }}
    >
      {/* ส่วนโลโก้ */}
      <div className="logo-area p-2 text-center">
        <img
          src="/public/metthier2.png"
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: "170px", height: "auto" }}
        />
      </div>

      {/* ส่วนเมนู */}
      <div className="menu-section">
        <div
          className="menu-header px-3"
          style={{ fontSize: "1rem", marginTop: "10px", fontWeight: "bold" }}
        >
          <p>MENU</p>
        </div>

        <Nav className="flex-column">
          {isMenuVisible("dashboard") && (
            <Nav.Link
              as={Link}
              to="/dashboard"
              className="text-white-50 py-3 px-5"
            >
              <div className="d-flex align-items-center">
                <RxDashboard className="me-3" />
                <span>Dashboard</span>
              </div>
            </Nav.Link>
          )}

          {isMenuVisible("inventory") && (
            <Nav.Link
              as={Link}
              to="/inventory"
              className="text-white-50 py-3 px-5"
            >
              <div className="d-flex align-items-center">
                <FaBoxes className="me-3" />
                <span>Inventory</span>
              </div>
            </Nav.Link>
          )}

          {isMenuVisible("outbound") && (
            <Nav.Link
              as={Link}
              to="/outbound"
              className="text-white-50 py-3 px-5"
            >
              <div className="d-flex align-items-center">
                <FaChartBar className="me-3" />
                <span>Outbound</span>
              </div>
            </Nav.Link>
          )}

          {isMenuVisible("inbound") && (
            <Nav.Link
              as={Link}
              to="/barcode"
              className="text-white-50 py-3 px-5"
            >
              <div className="d-flex align-items-center">
                <MdOutlineInventory2 className="me-3" />
                <span>Inbound</span>
              </div>
            </Nav.Link>
          )}

          {isMenuVisible("reports") && (
            <Nav.Link
              as={Link}
              to="/reports"
              className="text-white-50 py-3 px-5"
            >
              <div className="d-flex align-items-center">
                <FaClipboardList className="me-3" />
                <span>Reports</span>
              </div>
            </Nav.Link>
          )}

          {isMenuVisible("settings") && (
            <Nav.Link
              as={Link}
              to="/settings"
              className="text-white-50 py-3 px-5"
            >
              <div className="d-flex align-items-center">
                <FaUsers className="me-3" />
                <span>User Management</span>
              </div>
            </Nav.Link>
          )}

          {/* ปุ่ม Logout */}
          <button onClick={handleLogout}className="btn btn-danger logout" ><span className="bi bi-box-arrow-right ">&nbsp; Logout</span></button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
