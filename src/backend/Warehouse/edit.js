import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Warehouse/navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { DataService } from "../../config/dataService/dataService";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";

function Add(props) {
  const { addToast } = useToasts();
  const history = useHistory();

  const id = props.match.params.id;
  const [wharehouse, setWarehouse] = useState([]);

  const getWarehouse = async function getWarehouse(id) {
    try {
      const res = await DataService.get(
        `warehouse-edit/${id}`
      );
      if (res.data.length) {
        setWarehouse(res.data);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    document.title = "Edit Warehouse | Admin Dashboard";
    getWarehouse(id);
  }, []);

  const { register, handleSubmit, formState } = useForm({});

  const onSubmit = async (data, e) => {
    console.log("data", data);
    e.target.reset();
  };

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
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group as={Row} className="mb-2">
                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Warehouse Name"
                        required
                      />
                    </Col>

                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Manager <span className="text-danger"></span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("name")}
                        placeholder="Manager Name"
                      />
                    </Col>

                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Mobile <span className="text-danger">*</span>{" "}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("mobile", { required: true })}
                        placeholder="Mobile No"
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-2">
                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>Address </Form.Label>
                      <Form.Control
                        as="textarea"
                        {...register("address")}
                        rows={3}
                      />
                    </Col>

                    <Col md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>Prefix </Form.Label>
                      <Form.Control
                        name="prefix"
                        {...register("prefix", { required: true })}
                        placeholder="WarehouseAbc"
                      />
                    </Col>
                  </Form.Group>
                  <hr />
                  <Button
                    disabled={formState.isSubmitting}
                    variant="success"
                    type="submit"
                  >
                    Update
                  </Button>
                </Form>
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
