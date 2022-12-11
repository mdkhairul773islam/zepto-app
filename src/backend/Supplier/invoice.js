import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "./navbar";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { DataService } from "../../config/dataService/dataService";
import { toCapitalize } from "../../utility/utility";

function TransactionDetails(props) {
  const [data, setData] = useState({});
  const id = props.match.params.id;

  const getTransactionById = async function getTransactionById(id = null) {
    try {
      const res = await DataService.get(`party-transaction/${id}`);
      if (res.data) {
        await setData(res.data);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getTransactionById(id);
  }, [id]);

  useEffect(() => {
    document.title = `${
      data.party ? data.party.name + "-" + data.party.mobile : ""
    } Transaction Invoice | React Dashboard`;
  }, [data.party]);

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
                Transaction Invoice
                <Button
                  to="#"
                  className="btn btn-light btn-xl float-end px-1 py-0"
                  onClick={() => window.print()}
                >
                  <i className="fa fa-print" aria-hidden="true"></i>
                </Button>
                <Link
                  to={`/supplier/transaction-edit/${id}`}
                  className="btn btn-light btn-xl float-end px-2 py-0"
                  type="button"
                >
                  <i className="fa fa-pen" aria-hidden="true"></i>
                </Link>
              </Card.Header>
              <Card.Body>
                <div className="card">
                  <div className="card-body">
                    <div className="container mb-5 mt-3">
                      <div className="row d-flex align-items-baseline">
                        <div className="col-xl-9">
                          <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                            Invoice
                            <strong>ID: {data ? data.relation : ""}</strong>
                          </p>
                        </div>
                        <div className="col-xl-3 float-end">
                          <Link
                            to="#"
                            className="btn btn-light text-capitalize border-0"
                            data-mdb-ripple-color="dark"
                          >
                            <i className="fas fa-print text-primary"></i> Print
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-light text-capitalize"
                            data-mdb-ripple-color="dark"
                          >
                            <i className="far fa-file-pdf text-danger"></i>{" "}
                            Export ad
                          </Link>
                        </div>
                        <hr />
                      </div>

                      <div className="container">
                        {/* <div className="col-md-12">
                            <div className="text-center">
                              <i className="fab fa-mdb fa-4x ms-0" style={{color:'#5d9fc5'}}></i>
                              <p className="pt-0">-</p>
                            </div>
                          </div> */}
                        <div className="row">
                          <div className="col-xl-8">
                            <ul className="list-unstyled">
                              <li className="text-muted">
                                To:
                                <span style={{ color: "#5d9fc5" }}>
                                  {data.party ? data.party.name : ""}
                                </span>
                              </li>
                              <li className="text-muted">
                                {data.party ? data.party.address : ""}
                              </li>
                              <li className="text-muted">
                                Mymensingh, Bangladesh
                              </li>
                              <li className="text-muted">
                                <i className="fas fa-phone"></i>{" "}
                                {data.party ? data.party.mobile : ""}
                              </li>
                            </ul>
                          </div>
                          <div className="col-xl-4">
                            <p className="text-muted">Invoice</p>
                            <ul className="list-unstyled">
                              <li className="text-muted">
                                <i
                                  className="fas fa-circle"
                                  style={{ color: "#84B0CA" }}
                                ></i>{" "}
                                <span className="fw-bold">Code: </span>
                                {data ? data.party_code : ""}
                              </li>
                              <li className="text-muted">
                                <i
                                  className="fas fa-circle"
                                  style={{ color: "#84B0CA" }}
                                ></i>
                                <span className="fw-bold">Creation Date: </span>
                                {data ? data.transaction_at : ""}
                              </li>
                              <li className="text-muted">
                                <i
                                  className="fas fa-circle"
                                  style={{ color: "#84B0CA" }}
                                ></i>{" "}
                                <span className="me-1 fw-bold">Status:</span>
                                <span className="badge bg-warning text-black fw-bold">
                                  Paid
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="row justify-content-center">
                          <Table
                            borderless={true}
                            hover={false}
                            striped
                            responsive
                          >
                            <thead
                              style={{ backgroundColor: "#303f9f" }}
                              className="text-white"
                            >
                              <tr>
                                <th scope="col">Sl</th>
                                <th scope="col">Description</th>
                                <th scope="col">Credit</th>
                                <th scope="col">Debit</th>
                                <th scope="col">Commission</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <td>
                                  Transaction Type :
                                  {data
                                    ? toCapitalize(data.transaction_type)
                                    : ""}
                                  <br />
                                  Method :
                                  {data
                                    ? toCapitalize(data.transaction_method)
                                    : ""}
                                  <br />
                                  Paid By : {data ? data.paid_by : ""}
                                </td>
                                <td>TK {data ? data.credit : 0}</td>
                                <td>TK {data ? data.debit : 0}</td>
                                <td>TK {data ? data.commission : 0}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        <div className="row">
                          <div className="col-xl-7">
                            <p className="ms-4">
                              Remark: {data ? toCapitalize(data.remark) : ""}
                            </p>
                          </div>
                          <div className="col-xl-5">
                            <ul className="list-unstyled">
                              <li className="text-muted ms-3">
                                <span className="text-black me-4">
                                  Previuse Balance
                                </span>
                                TK {data ? data.previuse_balance : 0}
                              </li>
                              <li className="text-muted ms-3 mt-2">
                                <span className="text-black me-4">Tax(0%)</span>
                                TK 0
                              </li>
                            </ul>
                            <p className="text-black float-start">
                              <span className="text-black me-3">
                                Current Balance
                              </span>
                              <span style={{ fontSize: "20px" }}>
                                TK {data ? data.current_balance : 0}
                              </span>
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-xl-4">
                            <p className="mt-5">Thank you for your purchase</p>
                          </div>
                          <div className="col-xl-4">
                            <p className="text-center mt-5">
                              ---------------------- <br />
                              Signature of Suplier
                            </p>
                          </div>
                          <div className="col-xl-4">
                            <p className="text-center mt-5">
                              ---------------------- <br />
                              Signature of Authority
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWraper>
  );
}

export default TransactionDetails;
