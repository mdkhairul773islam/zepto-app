import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Supplier/navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";
import Select from "react-select";

// use redux
import { useDispatch } from "react-redux";
import { supplier } from "../../redux/supplier/actionCreator";

const balanceStatusList = [
  { label: "Payable", value: "payable" },
  { label: "Receivable", value: "receivable" },
];

function Add(props) {
  const { addToast } = useToasts();
  const history = useHistory();
  const dispatch = useDispatch();

  const { setValue, register, handleSubmit, formState } = useForm({
    defaultValues: {
      initial_balance: 0,
    },
  });

  const onSubmit = (data, e) => {
    dispatch(supplier(data, addToast, history));
    e.target.reset();
  };

  const handleBalanceStatusChange = (e) => {
    setValue("balance_status", e.value);
  };

  useEffect(() => {
    document.title = "Add New Supplier | React Dashboard";
    setValue("balance_status", "payable");
  }, [setValue]);

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
                Add Supplier
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Col sm={5}>
                      <Form.Control
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Supplier Name"
                        required
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Contact Person
                    </Form.Label>
                    <Col sm={5}>
                      <Form.Control
                        type="text"
                        {...register("contact_person", { required: false })}
                        placeholder="Contact Person"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Mobile <span className="text-danger">*</span>
                    </Form.Label>
                    <Col sm={5}>
                      <Form.Control
                        type="text"
                        {...register("mobile", { required: true })}
                        placeholder="Mobile"
                        required
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Address
                    </Form.Label>
                    <Col sm={5}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        {...register("address", { required: false })}
                        placeholder="Address"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Remarks
                    </Form.Label>
                    <Col sm={5}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        {...register("remarks", { required: false })}
                        placeholder="Remarks"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Initial Balance (TK){" "}
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Col sm={3}>
                      <Form.Control
                        type="number"
                        {...register("initial_balance", { required: false })}
                        placeholder="0"
                      />
                    </Col>
                    <Col sm={2}>
                      <Select
                        onChange={handleBalanceStatusChange}
                        ref={(e) => {
                          register("balance_status", { required: true });
                        }}
                        type="text"
                        defaultValue={balanceStatusList[0]}
                        options={balanceStatusList}
                        isSearchable={true}
                        placeholder="Chose"
                        required
                      ></Select>
                    </Col>
                  </Form.Group>

                  <hr />
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={8} className="text-sm-end">
                      <Button
                        disabled={formState.isSubmitting}
                        variant="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Form.Label>
                  </Form.Group>
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
