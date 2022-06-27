import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Supplier/navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { useToasts } from "react-toast-notifications";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { getDate } from "../../utility/utility";
import { helperFunction } from "../../utility/helper";

// use redux
import { useDispatch, useSelector } from "react-redux";
import { warehouse } from "../../redux/helper/actionCreator";
import { supplier } from "../../redux/helper/actionCreator";

function AddTransaction(props) {

  // get data from redux
  const dispatch = useDispatch();
  const warehouseList = useSelector((state) => state.helperReducer.dataList);
  console.log('da', helperFunction.warehouseList().then((x)=>{
    console.log(x.data);
  }));

  const [startDate, setStartDate] = useState(new Date());
  const { addToast } = useToasts();
  const history = useHistory();

  const supplierList = [
    { label: "A", value: "001" },
    { label: "B", value: "002" },
  ];

  const transactionTypeList = [
    { label: "Paid To Supplier", value: "payment" },
    { label: "Receive From Supplier", value: "receive" },
  ];

  const payemtTypeList = [
    { label: "Cash", value: "cash" },
    { label: "Bank", value: "bank" },
    { label: "Cheque", value: "cheque" },
    { label: "bKsah", value: "bKash" },
    { label: "T.T", value: "tt" },
    { label: "Cash To T.T", value: "cash_to_tt" },
  ];

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

  const handleShowroomChange = (e) => {
    setValue("showroom", e.value);
  };

  const handleSupplierChange = (e) => {
    setValue("name", e.value);
  };

  const handleTransactionTypeChange = (e) => {
    setValue("transactionType", e.value);
  };

  const handlePaymentTypeChange = (e) => {
    setValue("paymentType", e.value);
  };

  useEffect(() => {
    document.title = "Add New Transaction | React Dashboard";
  }, [setValue]);

  useEffect(() => {
    dispatch(warehouse());
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
                      Showroom <span className="text-danger">*</span>
                    </Form.Label>
                    <Col sm={5}>
                      <Select
                        onChange={handleShowroomChange}
                        ref={(e) => {
                          register("showroom", { required: true });
                        }}
                        type="text"
                        options={warehouseList}
                        isSearchable={true}
                        placeholder="Chose Warehouse"
                        required
                      ></Select>
                      {errors.showroom &&
                        errors.showroom.type === "required" && (
                          <span className="text-danger">
                            Showroom is required
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
                          register("name", { required: false });
                        }}
                        type="text"
                        options={supplierList}
                        isSearchable={true}
                        placeholder="Chose Supplier Name"
                        required
                      ></Select>
                      {errors.name && errors.name.type === "required" && (
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
                          register("transactionType", { required: true });
                        }}
                        type="text"
                        options={transactionTypeList}
                        isSearchable={true}
                        placeholder="Chose Transaction Type"
                        required
                      ></Select>
                      {errors.transactionType &&
                        errors.transactionType.type === "required" && (
                          <span className="text-danger">
                            Showroom is required
                          </span>
                        )}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="text-sm-end">
                      Payment Type
                    </Form.Label>
                    <Col sm={3}>
                      <Select
                        onChange={handlePaymentTypeChange}
                        ref={(e) => {
                          register("paymentType", { required: true });
                        }}
                        type="text"
                        options={payemtTypeList}
                        isSearchable={true}
                        placeholder="Chose Payment Type"
                        required
                      ></Select>
                      {errors.paymentType &&
                        errors.paymentType.type === "required" && (
                          <span className="text-danger">
                            Showroom is required
                          </span>
                        )}
                    </Col>
                    <Col sm={2}>
                      <Form.Control
                        type="number"
                        {...register("payment", { required: true })}
                        placeholder="Amount (0.00)"
                        required
                      />
                      {errors.payment && errors.payment.type === "required" && (
                        <span className="text-danger">
                          Showroom is required
                        </span>
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
                        {...register("total_balance", { required: true })}
                        placeholder="0.00"
                        readOnly
                        required
                      />
                    </Col>
                    <Col sm={2}>
                      <Form.Control
                        type="text"
                        {...register("total_balance_status", {
                          required: false,
                        })}
                        placeholder="Total Balance Status"
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
