import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "./navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DataTable from "../../components/DataTable/Table";

import { numberFormat, toFilter } from "../../utility/utility";

// use redux
import { useDispatch, useSelector } from "react-redux";
import {
  transactionHistory,
  transactionDelete,
} from "../../redux/suplierTransaction/actionCreator";

function TransactionHistory(props) {
  // get data from redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.suplierTransactionReducerReducer.transactionList);
  const loading = useSelector((state) => state.suplierTransactionReducer.loading);
  const totalDataRows = useSelector((state) => state.suplierTransactionReducer.totalRows);


  console.log("data", data);
 
  const history = useHistory();

  const handleDeleteClick = (e) => {
    var id = e.target.id;
    dispatch(transactionDelete(id, history));
  };

  const columns = [
    {
      name: "Date",
      selector: (row) =>
        row.date != null ? toFilter(row.date) : "N/A",
    },
    {
      name: "Warehouse",
      selector: (row) => row.name,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Mobile",
      selector: (row) => (row.mobile != null ? row.mobile : "N/A"),
    },
    {
      name: "Payment",
      selector: (row) => numberFormat(row.payment),
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link
            to={`/supplier/transaction-view/${row.id}`}
            className="btn btn-primary btn-sm m-1"
          >
            <i className="fas fa-eye fa-sm"></i>
          </Link>

          <Link
            to={`/supplier/transaction-edit/${row.id}`}
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
    document.title = "Suplier Transaction History | React Dashboard";
    dispatch(transactionHistory(currentPage, perPage));
  }, [currentPage, dispatch, perPage]);

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(transactionHistory(currentPage));
  };

  const handlePerRowsChange = async (perPage, currentPage) => {
    setPerPage(perPage);
    dispatch(transactionHistory(currentPage, perPage));
  };

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
                All Transaction
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

export default TransactionHistory;
