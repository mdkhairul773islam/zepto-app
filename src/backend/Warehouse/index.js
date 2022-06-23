import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Warehouse/navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DataTable from "../../components/DataTable/Table";
import { useToasts } from "react-toast-notifications";

function Index(props) {
  const data = [
    {
      id: 1,
      name: "Warehouse A",
      manager_name: "Khairul Islam",
      mobile: "01707536945",
      address: "Dhaka Bangladesh",
    },
    {
      id: 2,
      name: "Warehouse B",
      manager_name: "Go Islam",
      mobile: "01707536940",
      address: "Dhaka Bangladesh, Dhaka",
    },
  ];

  const totalDataRows = 10;
  const loading = false;

  const { addToast } = useToasts();
  const history = useHistory();

  const handleDeleteClick = (e) => {
    var id = e.target.id;
  };

  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    setTotalRows(totalDataRows);
  }, [totalDataRows]);

  useEffect(() => {
    document.title = "Warehouse List | Admin Dashboard";
  }, []);

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handlePerRowsChange = async (perPage, currentPage) => {
    setPerPage(perPage);
  };

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
                  data={data}
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
