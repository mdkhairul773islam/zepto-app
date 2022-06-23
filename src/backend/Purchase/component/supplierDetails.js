import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function supplierDetails(props) {
  const { name, mobile, address } = props.supllierInfoDetails;

  return (
    <>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={5} className="text-sm-end">
          Name
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="text"
            value={name ? name : ""}
            placeholder="Supplier Name"
            readOnly
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={5} className="text-sm-end">
          Mobile
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="text"
            value={mobile ? mobile : ""}
            placeholder="Mobile"
            readOnly
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={5} className="text-sm-end">
          Address
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            as="textarea"
            value={address ? address : ""}
            rows={3}
            placeholder="Address"
            readOnly
          />
        </Col>
      </Form.Group>
    </>
  );
}
