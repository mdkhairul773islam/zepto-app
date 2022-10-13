import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "./navbar";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { DataService } from "../../config/dataService/dataService";

function TransactionDetails(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const id = props.match.params.id;

  const getTransactionById = async function getTransactionById(id=null) {
    setLoading(true);
    try {
        const res = await DataService.get(`party-transaction/${id}`);
        res.data ? await setData(res.data) && setLoading(false) : setLoading(false);
    } catch (error) {
        console.log("error");
        setLoading(false);
    }
};

  useEffect(() => {
    document.title = "Supplier Transaction Invoice | React Dashboard";
    getTransactionById(id);
  }, [id]);

  console.log('data', data.relation, data.party.address);

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
                      <td></td>
                      <th>Mobile</th>
                      <td></td>
                      <th>Invoice No</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Amount</th>
                      <td>0</td>
                      <th>Commission</th>
                      <td>0</td>
                      <th>Transaction Method</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Transaction Generation</th>
                      <td></td>
                      <th>Previous Balance</th>
                      <td></td>
                      <th>Current Balance</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td colSpan="5"></td>
                    </tr>
                    <tr>
                      <th>Remarks</th>
                      <td colSpan="5"></td>
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
