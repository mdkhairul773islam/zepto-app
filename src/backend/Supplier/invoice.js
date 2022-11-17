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
