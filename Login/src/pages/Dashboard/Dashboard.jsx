import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

import { RiArrowUpDoubleLine, RiArrowDownDoubleLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  FaBoxes,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaUserCircle,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { dashboardData } from "../../data/Dashboarddata";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(dashboardData.stats);
  const [monthlyData, setMonthlyData] = useState(dashboardData.monthlyData);
  const [categoryData, setCategoryData] = useState(dashboardData.categoryData);
  const [recentActivities, setRecentActivities] = useState(
    dashboardData.recentActivities
  );
  const [selectedMonths, setSelectedMonths] = useState(6);

  // ฟังก์ชันกรองข้อมูลตามจำนวนเดือนที่เลือก
  const filteredData = monthlyData.slice(-selectedMonths);

  // สีสําหรับกราฟ
  const COLORS = ["#473366", "#F2F2E6", "#EBCFCD", "#FD6E2B"];

  return (
    <div
      className="container-fluid p-4"
      style={{ marginLeft: "250px", width: "calc(100% - 250px)" }}
    >
      <div>
        {/* Header */}
        <div className="d-flex align-items-center mb-4">
          <h2
            className="m-0 d-flex align-items-center"
            style={{ color: "#473366", fontSize: "2rem", fontWeight: "bold" }}
          >
            <RxDashboard className="me-3" size={30} />
            Dashboard
          </h2>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div
            className="card text-white h-100"
            style={{ borderRadius: "10px", backgroundColor: "#748D8C" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Total Products</h6>
                  <h2 className="mb-0" style={{ color: "#473366" }}>
                    {stats.totalProducts}{" "}
                    <span className="text-white fs-4">รายการ</span>
                  </h2>
                </div>
                <FaBoxes className="text-primary" size={30} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-white h-100"
            style={{ borderRadius: "10px", backgroundColor: "#748D8C" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Low Stock Items</h6>
                  <h2 className="mb-0" style={{ color: "#473366" }}>
                    {stats.lowStock}{" "}
                    <span className="text-white fs-4">รายการ</span>
                  </h2>
                </div>
                <FaExclamationTriangle className="text-warning" size={30} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-white h-100"
            style={{ borderRadius: "10px", backgroundColor: "#748D8C" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Incoming Deliveries</h6>
                  <h2 className="mb-0 " style={{ color: "#473366" }}>
                    {stats.incomingDeliveries}{" "}
                    <span className="text-white fs-4">รายการ</span>
                  </h2>
                </div>
                <FaArrowDown className="text-success" size={30} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-white h-100"
            style={{ borderRadius: "10px", backgroundColor: "#748D8C" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Outgoing Orders</h6>
                  <h2 className="mb-0 " style={{ color: "#473366" }}>
                    {stats.outgoingOrders}{" "}
                    <span className="text-white fs-4">รายการ</span>
                  </h2>
                </div>
                <FaArrowUp className="text-danger" size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div
            className="card"
            style={{ borderRadius: "10px", backgroundColor: "#748D8C" }}
          >
            <div className="card-body">
              {/* Dropdown เลือกจำนวนเดือน */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="card-title" style={{ color: "#473366" }}>
                  Monthly Inventory Movement
                </h5>
                <Dropdown
                  className="me-2"
                  onSelect={(value) => setSelectedMonths(parseInt(value))}
                >
                  <Dropdown.Toggle
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#748D8C",
                      color: "#473366",
                    }}
                    id="dropdown-basic"
                  >
                    {selectedMonths} months
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="3">3 month</Dropdown.Item>
                    <Dropdown.Item eventKey="6">6 month</Dropdown.Item>
                    <Dropdown.Item eventKey="12">12 month</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredData}>
                  <CartesianGrid />
                  <XAxis dataKey="name" tick={{ fill: "#F2F2E6" }} />
                  <YAxis tick={{ fill: "#F2F2E6" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="incoming" fill="#FD6E2B" name="Incoming" />
                  <Bar dataKey="outgoing" fill="#473366" name="Outgoing" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Circle chart */}
        <div className="col-md-4">
          <div
            className="card"
            style={{ borderRadius: "10px", backgroundColor: "#748D8C" }}
          >
            <div className="card-body">
              <h5 className="card-title" style={{ color: "#473366" }}>
                Product Categories
              </h5>
              <ResponsiveContainer width="100%" height={420}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div
        className="card"
        style={{ backgroundColor: "#748D8C", borderRadius: "10px" }}
      >
        <div className="card-body">
          <h5 className="card-title" style={{ color: "#473366" }}>
            Recent Activity
          </h5>
          <div className="table-responsive">
            <table className="table" style={{ color: "#748D8C" }}>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Product Name</th>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td>
                      {activity.type === "incoming" ? (
                        <span className="text-success">
                          <RiArrowDownDoubleLine /> Incoming
                        </span>
                      ) : (
                        <span className="text-danger">
                          <RiArrowUpDoubleLine /> Outgoing
                        </span>
                      )}
                    </td>
                    <td>{activity.name}</td>
                    <td>{activity.productId}</td>
                    <td>{activity.quantity}</td>
                    <td>{activity.category}</td>
                    <td>{activity.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
