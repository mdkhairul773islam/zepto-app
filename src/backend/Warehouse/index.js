import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Warehouse/navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { DataService } from "../../config/dataService/dataService";
import DataTable from "../../components/DataTable/Table";
import { useToasts } from "react-toast-notifications";

function Index(props) {
  const { addToast } = useToasts();
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [wharehouse, setWarehouse] = useState([]);

  const getWarehouse = async function getWarehouse(
    currentPage = 1,
    perPage = 10
  ) {
    setLoading(true);
    try {
      const res = await DataService.get(
        `warehouse?page=${currentPage}&per_page=${perPage}`
      );
      if (res.data.data.length) {
        setTotalRows(res.data.total);
        setWarehouse(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("error");
      setLoading(false);
    }
  };

  const handleDeleteClick = async (e) => {
    try {
      var id = e.target.id;
      var confirmDelete = window.confirm("Want to delete?");
      if (confirmDelete) {
        const res = await DataService.get(`/warehouse-destroy/${id}`);
        if (res.data.success) {
          setWarehouse(res.data.data);
          addToast(res.data.success, { appearance: "success" });
          getWarehouse();
        }
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
    getWarehouse(currentPage);
  };

  const handlePerRowsChange = async (perPage, currentPage) => {
    setPerPage(perPage);
    getWarehouse(currentPage, perPage);
  };

  useEffect(() => {
    document.title = "Warehouse List | Admin Dashboard";
    getWarehouse(currentPage, perPage);
  }, [currentPage, perPage]);

  const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      maxWidth: "20px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Manager",
      selector: (row) => (row.manager_name != null ? row.manager_name : "N/A"),
    },
    {
      name: "Mobile",
      selector: (row) => (row.mobile != null ? row.mobile : "N/A"),
    },
    {
      name: "Address",
      selector: (row) => row.address,
      width: "100px",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link
            to={`/warehouse/edit/${row.id}`}
            className="btn btn-success btn-sm m-1"
          >
            <i className="fas fa-pen fa-sm"></i>
          </Link>
          <button
            className="btn btn-danger btn-sm m-1"
            onClick={handleDeleteClick}
            id={row.id}
          >
            <i className="fas fa-trash fa-sm"></i>
          </button>
        </>
      ),
      center: true,
      className: "action-width",
    },
  ];

  return (
    <AdminWraper menuOpen="warehouse">
      <Container className="p-0" fluid>
        <Row>
          <div className="body_nav">
            <Navbar />
          </div>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header as="h4" className="fw-bold">
                All Warehouse
                <Button
                  to="#"
                  className="btn btn-light btn-xl float-end px-1 py-0"
                  onClick={() => window.print()}
                >
                  <i className="fa fa-print" aria-hidden="true"></i>
                </Button>
              </Card.Header>
              <Card.Body>
                <DataTable
                  columns={columns}
                  data={wharehouse}
                  loading={loading}
                  totalRows={totalRows}
                  currentPage={currentPage}
                  perPage={perPage}
                  handlePerRowsChange={handlePerRowsChange}
                  handlePageChange={handlePageChange}
                />
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWraper>
  );
}

export default Index;
