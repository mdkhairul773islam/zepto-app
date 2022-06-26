import React, { useEffect } from "react";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Warehouse/navbar";
import EditForm from "./component/editForm";
import { Container, Row, Col, Card } from "react-bootstrap";

function Edit(props) {
  const id = props.match.params.id;
  useEffect(() => {
    document.title = "Edit Warehouse | Admin Dashboard";
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
                Update Warehouse
              </Card.Header>
              <Card.Body>
                <EditForm id={id} />
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWraper>
  );
}

export default Edit;
