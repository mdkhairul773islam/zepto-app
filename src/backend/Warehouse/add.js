import React, { useEffect } from "react";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Warehouse/navbar";
import NewForm from "../../backend/Warehouse/component/addForm";
import { Container, Row, Col, Card } from "react-bootstrap";

function Add(props) {
  useEffect(() => {
    document.title = "Add New Warehouse | Admin Dashboard";
  }, []);

  return (
    <AdminWraper menuOpen="warehouse">
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
                Add New Warehouse
              </Card.Header>
              <Card.Body>
                <NewForm />
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWraper>
  );
}

export default Add;
