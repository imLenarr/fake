import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

const InventoryFilter = ({ onApplyFilters }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    status: {
      inStock: false,
      lowStock: false,
      outOfStock: false,
    },
    category: {
      Office: false, // Office Supplies
      IT: false, // IT & Technology Equipment
      Industrial: false, // Industrial Supplies
      Event: false, // Event Supplies & Services
    },
  });

  const handleFilterChange = (section, key) => {
    setFilters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const handleApplyFilters = () => {
    const activeFilters = {
      status: Object.entries(filters.status)
        .filter(([_, checked]) => checked)
        .map(([status]) => status),
      category: Object.entries(filters.category)
        .filter(([_, checked]) => checked)
        .map(([category]) => category),
    };

    onApplyFilters(activeFilters);
    setShowFilterModal(false);
  };

  const handleClearFilters = () => {
    setFilters({
      status: {
        inStock: false,
        lowStock: false,
        outOfStock: false,
      },
      category: {
        Office: false, // Office Supplies
        IT: false, // IT & Technology Equipment
        Industrial: false, // Industrial Supplies
        Event: false, // Event Supplies & Services
      },
    });
  };

  return (
    <div>
      <Button
        onClick={() => setShowFilterModal(true)}
        style={{
          backgroundColor: "#FD6E2B",
          borderColor: "#FD6E2B",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <FaFilter />
        Filter
      </Button>

      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Custom Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-4">
            {/* ส่วนของ Status */}
            <div className="flex-fill">
              <h5 className="mb-3">Status</h5>
              <div className="d-flex flex-column gap-2">
                {Object.keys(filters.status).map((status) => (
                  <Form.Check
                    key={status}
                    type="checkbox"
                    id={`status-${status}`}
                    label={status.charAt(0).toUpperCase() + status.slice(1)}
                    checked={filters.status[status]}
                    onChange={() => handleFilterChange("status", status)}
                  />
                ))}
              </div>
            </div>

            {/* ส่วนของ Category */}
            <div className="flex-fill">
              <h5 className="mb-3">Category</h5>
              <div className="d-flex flex-column gap-2">
                {Object.keys(filters.category).map((category) => (
                  <Form.Check
                    key={category}
                    type="checkbox"
                    id={`category-${category}`}
                    label={category}
                    checked={filters.category[category]}
                    onChange={() => handleFilterChange("category", category)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClearFilters}>
            Clear All
          </Button>
          <Button
            style={{ backgroundColor: "#FD6E2B", borderColor: "#FD6E2B" }}
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InventoryFilter;