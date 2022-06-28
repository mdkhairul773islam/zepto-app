import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Supplier/navbar";

import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {
  getDate,
  getPaymentMethods,
  getTransactionTypes,
} from "../../utility/utility";

import { Controller, useForm } from "react-hook-form";

// use redux
import { useDispatch, useSelector } from "react-redux";
import { warehouse, suplier, supplierTransactionDetailsFn } from "../../redux/helper/actionCreator";

const paymentMethodList = getPaymentMethods();
const transactionTypeList = getTransactionTypes();

function AddTransaction(props) {
  const history = useHistory();
  const { addToast } = useToasts();
  const [startDate, setStartDate] = useState(new Date());

  // get data from redux
  const dispatch = useDispatch();
  const warehouseList = useSelector(
    (state) => state.helperReducer.warehouseList
  );
  const suplierList = useSelector((state) => state.helperReducer.suplierList);

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data, e) => {
    console.log("data", getDate(data.dateInput));
    //dispatch(supplier(data, addToast, history));
    //e.target.reset();
  };

  const handleWarehouseChange = (e) => {
    setValue("warehouse", e.value);
  };

  const handleSupplierChange = (e) => {
    setValue("suplier", e.value);
    dispatch(supplierTransactionDetailsFn(e));
  };

  const handleTransactionTypeChange = (e) => {
    setValue("transaction_type", e.value);
  };

  const handlePaymentMethodChange = (e) => {
    setValue("payment_method", e.value);
  };

  useEffect(() => {
    document.title = "Add New Transaction | Dashboard";
  }, [setValue]);

  useEffect(() => {
    dispatch(warehouse());
    dispatch(suplier());
  }, [dispatch]);

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
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Date <span className="text-danger">*</span>
                    </Form.Label>
                    <Col sm={5}>
                      <Controller
                        control={control}
                        name="dateInput"
                        render={({ field }) => (
                          <DatePicker
                            className="form-control"
                            placeholderText="Select date"
                            onChange={(date) =>
                              field.onChange(date, setStartDate(date))
                            }
                            selected={startDate}
                            dateFormat="yyyy-MM-dd"
                          />
                        )}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Warehouse <span className="text-danger">*</span>
                    </Form.Label>
                    <Col sm={5}>
                      <Select
                        onChange={handleWarehouseChange}
                        ref={(e) => {
                          register("warehouse", { required: true });
                        }}
                        type="text"
                        options={warehouseList}
                        isSearchable={true}
                        placeholder="Chose Warehouse"
                      ></Select>
                      {errors.warehouse &&
                        errors.warehouse.type === "required" && (
                          <span className="text-danger">
                            Warehouse is required
                          </span>
                        )}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Name
                    </Form.Label>
                    <Col sm={5}>
                      <Select
                        onChange={handleSupplierChange}
                        ref={(e) => {
                          register("suplier", { required: true });
                        }}
                        type="text"
                        options={suplierList}
                        isSearchable={true}
                        placeholder="Chose Supplier Name"
                        required
                      ></Select>
                      {errors.suplier && errors.suplier.type === "required" && (
                        <span className="text-danger">
                          Supplier name is required
                        </span>
                      )}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Balance (TK) <span className="text-danger">*</span>
                    </Form.Label>
                    <Col sm={3}>
                      <Form.Control
                        type="text"
                        {...register("balance")}
                        placeholder="0.00"
                        readOnly
                      />
                    </Col>
                    <Col sm={2}>
                      <Form.Control
                        type="text"
                        {...register("balance_status", { required: false })}
                        placeholder="Balance Status"
                        readOnly
                        required
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Transaction Type
                    </Form.Label>
                    <Col sm={5}>
                      <Select
                        onChange={handleTransactionTypeChange}
                        ref={(e) => {
                          register("transaction_type", { required: true });
                        }}
                        type="text"
                        options={transactionTypeList}
                        isSearchable={true}
                        placeholder="Chose Transaction Type"
                        required
                      ></Select>
                      {errors.transaction_type &&
                        errors.transaction_type.type === "required" && (
                          <span className="text-danger">
                            Transaction Type is required
                          </span>
                        )}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Payment Method
                    </Form.Label>
                    <Col sm={3}>
                      <Select
                        onChange={handlePaymentMethodChange}
                        ref={(e) => {
                          register("payment_method", { required: true });
                        }}
                        type="text"
                        options={paymentMethodList}
                        isSearchable={true}
                        placeholder="Chose Payment Method"
                      ></Select>
                      {errors.payment_method &&
                        errors.payment_method === "required" && (
                          <span className="text-danger">
                            Payment Method is required
                          </span>
                        )}
                    </Col>
                    <Col sm={2}>
                      <Form.Control
                        type="number"
                        {...register("payment", { required: true })}
                        placeholder="Amount (0.00)"
                      />
                      {errors.payment && errors.payment.type === "required" && (
                        <span className="text-danger">Amount is required</span>
                      )}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Total Balance (TK) <span className="text-danger">*</span>
                    </Form.Label>
                    <Col sm={3}>
                      <Form.Control
                        type="text"
                        {...register("total_balance")}
                        placeholder="0.00"
                        readOnly
                      />
                    </Col>
                    <Col sm={2}>
                      <Form.Control
                        type="text"
                        {...register("balance_status", {
                          required: false,
                        })}
                        placeholder="Balance Status"
                        readOnly
                        required
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
                      Paid By
                    </Form.Label>
                    <Col sm={5}>
                      <Form.Control
                        type="text"
                        {...register("paid_by", { required: false })}
                        placeholder="Paid By"
                      />
                    </Col>
                  </Form.Group>
                  <hr />
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={8} className="text-sm-end">
                      <Button variant="primary" type="submit">
                        Save
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

export default AddTransaction;
