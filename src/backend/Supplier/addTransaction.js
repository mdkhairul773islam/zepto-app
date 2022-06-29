import React, { useEffect } from "react";

import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Supplier/navbar";
import { Container, Row, Col, Card } from "react-bootstrap";
import TransactionForm from "./component/transactionForm";

function AddTransaction(props) {
  useEffect(() => {
    document.title = "Add New Transaction | Dashboard";
  }, []);
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
                Add Supplier Transaction
              </Card.Header>
              <Card.Body>
                <TransactionForm/>
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWraper>
  );
}

export default AddTransaction;
