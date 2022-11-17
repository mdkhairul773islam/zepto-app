import React, { useEffect } from "react";

import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Supplier/navbar";
import { Container, Row, Col, Card } from "react-bootstrap";
import EditTransaction from "./component/editTransaction";

function TransactionEdit(props) {
  useEffect(() => {
    document.title = "Edit Transaction | Dashboard";
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
                Edit Supplier Transaction
              </Card.Header>
              <Card.Body>
                <EditTransaction/>
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWraper>
  );
}

export default TransactionEdit;
