import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import { usersData } from "../../data/data";
import Pagination from "../../components/Pagination";
import "./UserManagement.css";
import { HiUsers } from "react-icons/hi2";

const UserManagement = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState(usersData);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "USER",
  });
  const [validated, setValidated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (!showModal) {
      setFormData({ username: "", password: "", role: "USER" });
      setValidated(false);
    }
  }, [showModal]);

  const handleShowModal = (user = null) => {
    if (user) {
      setCurrentUser(user);
      setFormData({
        username: user.username,
        password: user.password,
        role: user.role,
      });
    } else {
      setCurrentUser(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (currentUser) {
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? { ...user, ...formData } : user
        )
      );
    } else {
      const newUser = { id: users.length + 1, ...formData };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    const userToDelete = users.find((user) => user.id === id);
    if (userToDelete.role === "SUPER") {
      alert("Cannot delete superadmin account!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชันกรองข้อมูล
  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

    return matchesSearchTerm && matchesRole;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <Container
      fluid
      className="usermanagement-container"
      style={{ marginLeft: "264px", width: "calc(100% - 250px)" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2
          className="m-0 d-flex align-items-center"
          style={{ color: "#473366", fontSize: "2rem", fontWeight: "bold" }}
        >
          <HiUsers className="me-3" size={30} />
          User management
        </h2>
      </div>

      <Card className="shadow-sm" style={{ marginTop: "10px" }}>
        <Row style={{ padding: "30px" }}>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: "20px" }}
            />
          </Col>
          <Col md="auto">
            <Form.Select
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <Form.Select
              onChange={(e) => setRoleFilter(e.target.value)}
              value={roleFilter}
            >
              <option value="ALL">All Roles</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPER">Super Admin</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <Button
              variant="primary"
              onClick={() => handleShowModal()}
              className="d-flex align-items-center gap-2"
              style={{ backgroundColor: "#473366", border: "none" }}
            >
              <FaUserPlus /> Add New User
            </Button>
          </Col>
        </Row>

        <Card.Body>
          {/* <Row className="mb-3">
            <Col md="auto">
              <Form.Select
                onChange={handleItemsPerPageChange}
                value={itemsPerPage}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </Form.Select>
            </Col>
            <Col md="auto">
              <Form.Select
                onChange={(e) => setRoleFilter(e.target.value)}
                value={roleFilter}
              >
                <option value="ALL">All Roles</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER">Super Admin</option>
              </Form.Select>
            </Col>
          </Row> */}

          <div className="table-responsive">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{user.username}</td>
                    <td>{"*".repeat(user.password.length)}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          user.role === "SUPER"
                            ? "danger"
                            : user.role === "ADMIN"
                            ? "warning"
                            : "info"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleShowModal(user)}
                      >
                        <FaEdit />
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        disabled={user.role === "SUPER"}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onFirstPage={handleFirstPage}
            onLastPage={handleLastPage}
          />
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        style={{ marginLeft: "350px", width: "calc(100% - 250px)", marginTop: "200px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {currentUser ? "Edit User" : "Add New User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  variant="outline-light"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ms-2"
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER">Super Admin</option>
              </Form.Select>
            </Form.Group>

            <div className="text-end mt-3">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="me-2"
                style={{ backgroundColor: "#B3B4AD", borderColor: "#B3B4AD" }}
              >
                Cancel
              </Button>
              <Button
                variant="success"
                type="submit"
                style={{ backgroundColor: "#FD6E2B", borderColor: "#FD6E2B" }}
              >
                {currentUser ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserManagement;
