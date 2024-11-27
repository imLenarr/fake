import { FaUserCircle } from "react-icons/fa";
import "./Topbar.css";

const Topbar = ({ loggedInUser }) => {
  return (
    <div
      style={{
        backgroundColor: "#748D8C",
        padding: "15px 30px",
        position: "fixed",
        top: 0,
        right: 0,
        left: "295px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end", // จัดชิดขวา
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",borderRadius: "10px 25px 10px 25px",
        height: "70px",
      }}
    >
      {/* SuperAdmin Profile */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 16px",
          borderRadius: "12px",
          backgroundColor: "#F3F4F6",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
      >
        <FaUserCircle size={28} color="#473366" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#473366",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {loggedInUser?.role}
          </span>
          <span
            style={{
              color: "#6B7280",
              fontSize: "12px",
            }}
          >
            {loggedInUser?.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
