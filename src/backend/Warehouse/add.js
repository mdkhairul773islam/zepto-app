import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Warehouse/navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";

function Add(props) {
  const { addToast } = useToasts();
  const history = useHistory();

  useEffect(() => {
    document.title = "Add New Warehouse | Admin Dashboard";
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
                Add New Warehouse
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
                    variant="primary"
                    type="submit"
                  >
                    Submit
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
