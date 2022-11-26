import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "./navbar";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { DataService } from "../../config/dataService/dataService";

function TransactionDetails(props) {
  const [data, setData] = useState({});
  const id = props.match.params.id;

  const getTransactionById = async function getTransactionById(id=null) {
    try {
        const res = await DataService.get(`party-transaction/${id}`);
        if(res.data){
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
  document.title = `${data.party ? data.party.name : ''} Transaction Invoice | React Dashboard`;
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
                  to="/supplier/transaction-edit/1"
                  className="btn btn-light btn-xl float-end px-2 py-0"
                  type="button"
                >
                  <i className="fa fa-pen" aria-hidden="true"></i>
                </Link>
              </Card.Header>
              <Card.Body>
                {/* <Table
                  bordered
                  striped
                  hover
                  responsive
                  className="custom-table"
                >
                  <tbody>
                    <tr>
                      <th>Supplier Name</th>
                      <td>{data.party ? data.party.name : ''}</td>
                      <th>Mobile</th>
                      <td>{data.party ? data.party.mobile : ''}</td>
                      <th>Invoice No</th>
                      <td>{data ? data.relation: ''}</td>
                    </tr>
                    <tr>
                      <th>Amount</th>
                      <td>{data && data.credit > 0 ? data.credit : data.debit}</td>
                      <th>Commission</th>
                      <td></td>
                      <th>Transaction Method</th>
                      <td>{data ? data.transaction_method : ''}</td>
                    </tr>
                    <tr>
                      <th>Previous Balance</th>
                      <td></td>
                      <th>Current Balance</th>
                      <td colSpan="3"></td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td colSpan="5">{data.party ? data.party.address: ''}</td>
                    </tr>
                    <tr>
                      <th>Remarks</th>
                      <td colSpan="5">{data.party ? data.party.remark: ''}</td>
                    </tr>
                  </tbody>
                </Table> */}

                <div className="card">
                    <div className="card-body">
                      <div className="container mb-5 mt-3">
                        <div className="row d-flex align-items-baseline">
                          <div className="col-xl-9">
                            <p style={{color: "#7e8d9f", 'fontSize': "20px"}} >Invoice <strong>ID: #123-123</strong></p>
                          </div>
                          <div className="col-xl-3 float-end">
                            <a className="btn btn-light text-capitalize border-0" data-mdb-ripple-color="dark"><i
                                className="fas fa-print text-primary"></i> Print</a>
                            <a className="btn btn-light text-capitalize" data-mdb-ripple-color="dark"><i
                                className="far fa-file-pdf text-danger"></i> Export</a>
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
                                <li className="text-muted">To: <span style={{color:'#5d9fc5'}}>John Lorem</span></li>
                                <li className="text-muted">Street, City</li>
                                <li className="text-muted">State, Country</li>
                                <li className="text-muted"><i className="fas fa-phone"></i> 123-456-789</li>
                              </ul>
                            </div>
                            <div className="col-xl-4">
                              <p className="text-muted">Invoice</p>
                              <ul className="list-unstyled">
                                <li className="text-muted"><i className="fas fa-circle" style={{color:'#84B0CA'}}></i> <span
                                    className="fw-bold">ID:</span>#123-456</li>
                                <li className="text-muted"><i className="fas fa-circle" style={{color:'#84B0CA'}}></i> <span
                                    className="fw-bold">Creation Date: </span>Jun 23,2021</li>
                                <li className="text-muted"><i className="fas fa-circle" style={{color:'#84B0CA'}}></i> <span
                                    className="me-1 fw-bold">Status:</span><span className="badge bg-warning text-black fw-bold">
                                    Unpaid</span></li>
                              </ul>
                            </div>
                          </div>

                          <div className="row my-2 mx-1 justify-content-center">
                            <table className="table table-striped table-borderless">
                              <thead style={{ backgroundColor:'#84B0CA' }} className="text-white">
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Description</th>
                                  <th scope="col">Qty</th>
                                  <th scope="col">Unit Price</th>
                                  <th scope="col">Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Pro Package</td>
                                  <td>4</td>
                                  <td>$200</td>
                                  <td>$800</td>
                                </tr>
                                <tr>
                                  <th scope="row">2</th>
                                  <td>Web hosting</td>
                                  <td>1</td>
                                  <td>$10</td>
                                  <td>$10</td>
                                </tr>
                                <tr>
                                  <th scope="row">3</th>
                                  <td>Consulting</td>
                                  <td>1 year</td>
                                  <td>$300</td>
                                  <td>$300</td>
                                </tr>
                              </tbody>

                            </table>
                          </div>
                          <div className="row">
                            <div className="col-xl-8">
                              <p className="ms-3">Add additional notes and payment information</p>

                            </div>
                            <div className="col-xl-3">
                              <ul className="list-unstyled">
                                <li className="text-muted ms-3"><span className="text-black me-4">SubTotal</span>$1110</li>
                                <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Tax(15%)</span>$111</li>
                              </ul>
                              <p className="text-black float-start"><span className="text-black me-3"> Total Amount</span><span
                                  style={{ 'fontSize': '25px'}}>$1221</span></p>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-xl-10">
                              <p>Thank you for your purchase</p>
                            </div>
                            <div className="col-xl-2">
                              <button type="button" className="btn btn-primary text-capitalize"
                                style={{ 'backgroundColor':'#60bdf3' }}>Pay Now</button>
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
