import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "./navbar";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import DataTable from "../../components/DataTable/Table";
import { Controller, useForm } from "react-hook-form"; 
import DatePicker from "react-datepicker";

import {getDate} from "../../utility/utility";

// use redux
import { useDispatch, useSelector } from "react-redux";
import {
  transactionHistory,
  transactionDelete,
} from "../../redux/suplierTransaction/actionCreator";

function TransactionHistory(props) {

  const [startDate, setStartDate] = useState(new Date());
  const defaultValues = {
    date: startDate
  };

  const {
    control, handleSubmit,
  } = useForm({
    defaultValues: defaultValues,
  });

  // get data from redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.suplierTransactionReducer.transactionList);
  const loading = useSelector((state) => state.suplierTransactionReducer.loading);
  const totalDataRows = useSelector((state) => state.suplierTransactionReducer.totalRows);

  const history = useHistory();
  const handleDeleteClick = (e) => {
    var id = e.target.id;
    dispatch(transactionDelete(id, history));
  };

  const columns = [
    {
      name: "Sl",
      selector: (row, index) => ++index,
      maxWidth:"20px",
      center: true,
    },
    {
      name: "Date",
      selector: (row) =>
      row.transaction_at != null ? row.transaction_at : "N/A",
      sortable: true,
    },
    {
      name: "Warehouse",
      selector: (row) => row.warehouse_name,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Code",
      selector: (row) => (row.party_code != null ? row.party_code : "N/A"),
    },
    {
      name: "Type Of Transaction / Method",
      selector: (row) => (row.transaction_method != null ? row.transaction_method : "N/A"),
    },
    {
      name: "Amount",
      selector: (row) => row.credit  > 0 ? row.credit : row.debit,
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


  const onSubmit = async (data, e) => {
    const { date } = data;
    const formData = {
      ...data,
      date: typeof date !== "undefined" ? getDate(date) : getDate(startDate),
    };
    console.log('data', data);
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
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Row} className="mb-3">
                  <Col sm={2}>
                    <Controller
                      control={control}
                      name="date"
                      render={({ field }) => (
                        <DatePicker
                          className="form-control"
                          placeholderText="Date From"
                          onChange={(date) => field.onChange(date, setStartDate(date))}
                          selected={startDate}
                          dateFormat="yyyy-MM-dd"
                        />
                      )}
                    />
                  </Col>
                  <Col sm={2}>
                    <Controller
                      control={control}
                      name="date"
                      render={({ field }) => (
                        <DatePicker
                          className="form-control"
                          placeholderText="Date To"
                          onChange={(date) => field.onChange(date, setStartDate(date))}
                          selected={startDate}
                          dateFormat="yyyy-MM-dd"
                        />
                      )}
                    />
                  </Col>
                  </Form.Group>
                </Form>
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