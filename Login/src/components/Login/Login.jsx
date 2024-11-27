import React, { useState, useContext } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../../Context/AuthContext";
import { usersData } from "../../data/data";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const success = await login(username, password);
    if (!success) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <Container className="d-flex login justify-content-center align-items-center min-vh-100 container">
        <Card
          className="p-4 shadow"
          style={{ width: "400px", borderRadius: "15px" }}
        >
          <Card.Body>
            <div className="text-center mb-4">
              <img
                src="/public/metthier2.png"
                alt="Logo"
                style={{ width: "200px", marginBottom: "20px" }}
              />
              <Card.Title className="title">Welcome, Please Login</Card.Title>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter username"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                />
              </Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: "#473366",
                  border: "none",
                  padding: "10px",
                }}
              >
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
