import React, { useState, useMemo } from "react";
import { AiOutlineDownload, AiOutlinePrinter } from "react-icons/ai";
import {
  Card,
  Form,
  Button,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Pagination from "../../components/Pagination";
import { FaClipboardList } from "react-icons/fa";

const Reports = () => {
  const [monthFrom, setMonthFrom] = useState("");
  const [monthTo, setMonthTo] = useState("");
  const [reportType, setReportType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");
  const itemsPerPage = 10;

  const currentDate = new Date();
  const currentMonth = currentDate.toISOString().slice(0, 7);
  const maxDate = currentMonth;
  const minDate = new Date(
    currentDate.setFullYear(currentDate.getFullYear() - 5)
  )
    .toISOString()
    .slice(0, 7);

  const getRandomDate = () => {
    const start = new Date(
      new Date().setFullYear(new Date().getFullYear() - 5)
    );
    const end = new Date();
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return randomDate.toISOString().split("T")[0];
  };

  const sampleData = Array(6000)
    .fill(0)
    .map((_, index) => ({
      date: getRandomDate(),
      productName: `Product ${index + 1}`,
      productId: `P${index + 1}`,
      status: ["Completed", "Completed", "Available"][index % 3],
      quantity: Math.floor(Math.random() * 100) + 1,
      type: ["inbound", "outbound", "inventory"][index % 3],
    }));

  const filteredData = useMemo(() => {
    let data = [...sampleData];
    if (monthFrom) {
      const fromDate = new Date(monthFrom);
      data = data.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getFullYear() > fromDate.getFullYear() ||
          (itemDate.getFullYear() === fromDate.getFullYear() &&
            itemDate.getMonth() >= fromDate.getMonth())
        );
      });
    }
    if (monthTo) {
      const toDate = new Date(monthTo);
      data = data.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getFullYear() < toDate.getFullYear() ||
          (itemDate.getFullYear() === toDate.getFullYear() &&
            itemDate.getMonth() <= toDate.getMonth())
        );
      });
    }
    if (reportType !== "all")
      data = data.filter((item) => item.type === reportType);
    return data;
  }, [monthFrom, monthTo, reportType]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearch = () => {
    if (!monthFrom || !monthTo) {
      setError("กรุณาเลือกช่วงเดือนที่ต้องการตรวจสอบ");
      setShowResults(false);
    } else {
      setError("");
      setShowResults(true);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container
      fluid
      style={{ marginLeft: "264px", width: "calc(100% - 250px)" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2
          className="m-0 d-flex align-items-center"
          style={{ color: "#473366", fontSize: "2rem", fontWeight: "bold" }}
        >
          <FaClipboardList className="me-3" size={30} />
          Reports
        </h2>
      </div>
      <Card className="shadow-sm" style={{ marginTop: "10px" }}>
        <Card.Body>
          <Row className="align-items-end mb-4">
            <Col md={3}>
              <Form.Group>
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="month"
                  value={monthFrom}
                  onChange={(e) => setMonthFrom(e.target.value)}
                  min={reportType === "inventory" ? currentMonth : minDate}
                  max={reportType === "inventory" ? currentMonth : maxDate}
                  disabled={reportType === "inventory"}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="month"
                  value={monthTo}
                  onChange={(e) => setMonthTo(e.target.value)}
                  min={reportType === "inventory" ? currentMonth : minDate}
                  max={reportType === "inventory" ? currentMonth : maxDate}
                  disabled={reportType === "inventory"}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Report Type</Form.Label>
                <Form.Control
                  as="select"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="inbound">Inbound</option>
                  <option value="outbound">Outbound</option>
                  <option value="inventory">Inventory</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2} className="text-end">
              <Button
                variant="primary"
                onClick={handleSearch}
                className="mt-md-0 w-100"
              >
                Search
              </Button>
            </Col>
          </Row>
          {error && <div className="text-danger mb-3">{error}</div>}
          {showResults && (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Product Name</th>
                    <th>Product ID</th>
                    <th>Status</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.date}</td>
                      <td>{row.productName}</td>
                      <td>{row.productId}</td>
                      <td>{row.status}</td>
                      <td>{row.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Reports;
