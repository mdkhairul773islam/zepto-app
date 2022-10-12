import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Supplier/navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DataTable from "../../components/DataTable/Table";

import { numberFormat, toFilter } from "../../utility/utility";

// use redux
import { useDispatch, useSelector } from "react-redux";
import {
  supplierList,
  supplierDelete,
} from "../../redux/supplier/actionCreator";

function Index(props) {
  // get data from redux
  const dispatch = useDispatch();

  const data = useSelector((state) => state.supplierReducer.supplierList);
  const loading = useSelector((state) => state.supplierReducer.loading);
  const totalDataRows = useSelector((state) => state.supplierReducer.totalRows);

 
  const history = useHistory();

  const handleDeleteClick = (e) => {
    var id = e.target.id;
    var confirmDelete = window.confirm("Want to delete?");
    if(confirmDelete){
      dispatch(supplierDelete(id, history));
    }
  };

  const columns = [
    {
      name: "Sl",
      selector: (row, index) => ++index,
      maxWidth: "20px",
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Contact Person",
      selector: (row) =>
        row.contact_person != null ? toFilter(row.contact_person) : "N/A",
    },
    {
      name: "Mobile",
      selector: (row) => (row.mobile != null ? row.mobile : "N/A"),
    },
    {
      name: "Initial Balance",
      selector: (row) => numberFormat(row.initial_balance),
      center: true,
    },
    {
      name: "Current Balance",
      selector: (row) =>  Math.abs(row.balance),
      center: true,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      center: true,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link
            to={`/supplier/view/${row.id}`}
            className="btn btn-primary btn-sm m-1"
          >
            <i className="fas fa-eye fa-sm"></i>
          </Link>

          <Link
            to={`/supplier/edit/${row.id}`}
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

  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    setTotalRows(totalDataRows);
  }, [totalDataRows]);

  useEffect(() => {
    document.title = "Supplier List | React Dashboard";
    dispatch(supplierList(currentPage, perPage));
  }, [currentPage, dispatch, perPage]);

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(supplierList(currentPage));
  };

  const handlePerRowsChange = async (perPage, currentPage) => {
    setPerPage(perPage);
    dispatch(supplierList(currentPage, perPage));
  };

  const totalInitialBalance = data.reduce(
    (totalBalance, row) => totalBalance + parseFloat(row.initial_balance), 0
  );
  const totalCurrentBalance = data.reduce(
    (totalBalance, row) => totalBalance + parseFloat(row.balance), 0
  );

  return (
    <AdminWraper menuOpen="supplier">
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
                All Supplier
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
                <p className="text-center fw-bold">
                  Total Initial Balance: {totalInitialBalance} Tk. Total Current Balance: {totalCurrentBalance} Tk.
                </p>
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
