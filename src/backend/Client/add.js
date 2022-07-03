import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "./navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

function Add(props) {

  const history = useHistory();

  useEffect(() => {
    document.title = "Add New Client | Admin Dashboard";
  }, []);

  const { register, handleSubmit, formState } = useForm({});

  const onSubmit = async (data, e) => {
    console.log("data", data);
    e.target.reset();
  };

  return (
    <AdminWraper menuOpen="client">
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
                Add New
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group as={Row} className="mb-2">
                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Warehouse <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option selected disabled value="">Warehouse List</option>
                        <option value="1">W-1</option>
                        <option value="2">W-2</option>
                      </Form.Select>
                    </Col>
                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Supplier Name"
                        required
                      />
                    </Col>

                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Contact Person <span className="text-danger"></span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("contact_person")}
                        placeholder="Contact Person Name"
                      />
                    </Col>

                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Mobile <span className="text-danger">*</span>{" "}
                      </Form.Label>
                      <Form.Control
                        {...register("mobile", { required: true })}
                        placeholder="Mobile No"
                        required
                      />
                    </Col>
                    <Col md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>Inital Balance </Form.Label>
                      <Row>
                        <Col md={6}>
                          <Form.Control
                            type="number"
                            {...register("inital_balance", { required: true })}
                            placeholder="0.0"
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Select aria-label="Default select example">
                            <option selected disabled value="">Status</option>
                            <option value="payable">Payable</option>
                            <option value="receivable">Receivable</option>
                          </Form.Select>
                        </Col>
                      </Row>
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
    </AdminWraper >
  );
}

export default Add;
