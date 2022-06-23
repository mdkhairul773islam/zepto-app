import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "./navbar";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";

// use redux
import { useDispatch, useSelector } from "react-redux";
import { supplierInfo } from "../../redux/supplier/actionCreator";

function TransactionDetails(props) {
  const dispatch = useDispatch();
  const { address, contact_person, name, mobile, remarks, initial_balance } = useSelector((state) => state.supplierReducer.supplier);

  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Supplier Transaction Details | React Dashboard";
    dispatch(supplierInfo(id));
  }, [dispatch, id]);

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
                Transaction Details
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
                <Table
                  bordered
                  striped
                  hover
                  responsive
                  className="custom-table"
                >
                  <tbody>
                    <tr>
                      <th>Supplier Name</th>
                      <td>{name}</td>
                    </tr>
                    <tr>
                      <th>Contact Person</th>
                      <td>{contact_person}</td>
                    </tr>
                    <tr>
                      <th>Mobile</th>
                      <td>{mobile}</td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>{address}</td>
                    </tr>
                    <tr>
                      <th>Remarks</th>
                      <td>{remarks}</td>
                    </tr>
                    <tr>
                      <th>Initial Balance</th>
                      <td>{initial_balance}</td>
                    </tr>
                    <tr>
                      <th>Current Balance</th>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th>Supplier Type</th>
                      <td>{initial_balance > 0 ? 'Receivable' : 'Payable'}</td>
                    </tr>
                  </tbody>
                </Table>
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
