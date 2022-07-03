import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Supplier/navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

// use redux
import { useDispatch, useSelector } from "react-redux";
import {
  supplierInfo,
  supplierUpdate,
} from "../../redux/supplier/actionCreator";

import { useForm } from "react-hook-form";

function Edit(props) {
  const [getBstatus, setGetBstatus] = useState();
 
  const history = useHistory();

  const dispatch = useDispatch();
  var getSupplier = useSelector((state) => state.supplierReducer.supplier);
  const status = getSupplier.initial_balance >= 0 ? "receivable" : "payable";

  const { setValue, register, handleSubmit, reset } = useForm();

  const handleBalanceStatusChange = (e) => {
    setValue("getSupplier.balance_status", e.target.value);
    setGetBstatus(e.target.value);
  };

  const id = props.match.params.id;
  const onSubmit = (data, e) => {
    setValue("getSupplier.balance_status", getBstatus);
    dispatch(supplierUpdate(data.getSupplier, history));
  };

  useEffect(() => {
    dispatch(supplierInfo(id));
  }, [dispatch, id]);

  useEffect(() => {
    document.title = "Edit Supplier| React Dashboard";
    getSupplier.initial_balance >= 0
      ? setGetBstatus("receivable")
      : setGetBstatus("payable");

    reset({ getSupplier });
  }, [getSupplier, reset]);

  getSupplier = { ...getSupplier, balance_status: status };

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
                Edit Supplier
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
                        {...register("getSupplier.name", { required: true })}
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
                        {...register("getSupplier.contact_person", {
                          required: false,
                        })}
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
                        {...register("getSupplier.mobile", { required: true })}
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
                        {...register("getSupplier.address", {
                          required: false,
                        })}
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
                        {...register("getSupplier.remarks", {
                          required: false,
                        })}
                        placeholder="Remarks"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Initial Balance (TK)
                    </Form.Label>
                    <Col sm={3}>
                      <Form.Control
                        type="number"
                        {...register("getSupplier.initial_balance", {
                          required: true,
                        })}
                        placeholder="0"
                      />
                    </Col>
                    <Col sm={2}>
                      <Form.Select
                        aria-label="Chose"
                        value={getBstatus == null ? "" : getBstatus}
                        onChange={handleBalanceStatusChange}
                        ref={(e) => {
                          register("getSupplier.balance_status", {
                            required: false,
                          });
                        }}
                      >
                        <option>Chose Status</option>
                        <option value="payable">Payable</option>
                        <option value="receivable">Receivable</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>

                  <hr />
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={8} className="text-sm-end">
                      <Button variant="success" type="submit">
                        Update
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

export default Edit;
