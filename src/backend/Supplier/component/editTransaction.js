import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form"; 
import DatePicker from "react-datepicker";
import {
  getDate,
  getPaymentMethods,
  getTransactionTypes,
} from "../../../utility/utility";

// use redux
import { useDispatch, useSelector } from "react-redux";
import {
  supplierEditTransactionDetailsFn,
} from "../../../redux/helper/actionCreator";

import { newTransactionStore } from "../../../redux/suplierTransaction/actionCreator";

const paymentMethodList = getPaymentMethods();
const transactionTypeList = getTransactionTypes();

const EditTransaction = ({details}) => { 
 // get data from redux
  const dispatch = useDispatch();
  const { balance, status, real_balance } = useSelector(
    (state) => state.helperReducer.partyBalance
  );
  
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());  
  const defaultValues = {
    date: startDate,
    balance: 0,
    real_balance: 0,
    balance_status: "",
    paid_by: "",
    party_code: "",
    payment:"",
    remark: "",
    status: "",
    total_balance: 0,
    transaction_method: "",
    transaction_type: "",
    warehouse_id: "",
  };
  const {
    control,
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset({
      details,
    });
  }, [reset, details])
  

  const warehouseId = watch("warehouse_id");
  const partyCode = watch("party_code");
  const currentSuplierStatus = watch("status");
  const paymentAmount = watch("payment");
  const transactionType = watch("transaction_type");

  /* This code for supplier balance calculation */
  useEffect(() => {
    if (
      typeof partyCode !== "undefined" &&
      partyCode !== ""
    ) {
      var total = 0;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (
        typeof transactionType != "undefined" &&
        transactionType !== "" &&
        currentSuplierStatus === "Receivable"
      ) {
        total = (!isNaN(parseFloat(real_balance)) ? parseFloat(real_balance) : 0); 
        if (transactionType === "receive") {
          total =
            parseFloat(total) - 
            (!isNaN(parseFloat(paymentAmount)) ? parseFloat(paymentAmount) : 0);
        } else {
          total =
            parseFloat(total)  +
            (!isNaN(parseFloat(paymentAmount)) ? parseFloat(paymentAmount) : 0);
        }
      } else if (
        typeof transactionType != "undefined" &&
        transactionType !== "" &&
        currentSuplierStatus === "Payable"
      ) {
        total = (!isNaN(parseFloat(real_balance)) ? parseFloat(real_balance) : 0) 
        if (transactionType === "paid") {
          total =
            parseFloat(total) +
            (!isNaN(parseFloat(paymentAmount)) ? parseFloat(paymentAmount) : 0);
        } else {
          total =
            parseFloat(total) -
            (!isNaN(parseFloat(paymentAmount)) ? parseFloat(paymentAmount) : 0);
        }
      } else {
        total = !isNaN(parseFloat(real_balance)) ? parseFloat(real_balance) : 0;
      }
      total >= 0
        ? setValue("balance_status", "Receivable")
        : setValue("balance_status", "Payable");
      total = Math.abs(total).toFixed();
      setValue("total_balance", total);
    } else {
      setValue("real_balance", 0);
      setValue("balance", 0);
      setValue("status", "");
      setValue("total_balance", 0);
      setValue("balance_status", "");
    }
  }, [paymentAmount, real_balance, setValue, transactionType, currentSuplierStatus, partyCode]);

  const handleTransactionTypeChange = (e) => {
    setValue("transaction_type", e.value);
  };

  const handlePaymentMethodChange = (e) => {
    setValue("transaction_method", e.value);
  };
  
  const code = "SI-221558";
  useEffect(() => {
    dispatch(supplierEditTransactionDetailsFn(code))
  }, [dispatch]);

  const {credit, debit, name } = details;
  useEffect(() => {
    setValue("balance", balance);
    setValue("status", status);
    setValue("real_balance", real_balance);
    setValue("name", name);
    setValue("payment", credit > 0 ? credit: debit);
  }, [balance, credit, debit, name, real_balance, setValue, status]);

  const onSubmit = async (data, e) => {
    const { date } = data;
    const formData = {
      ...data,
      date: typeof date !== "undefined" ? getDate(date) : getDate(startDate),
    };
    await dispatch(newTransactionStore(formData, history));
    await e.target.reset();
  };

  // console.log("watch", watch());
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-sm-end">
          Date <span className="text-danger">*</span>
        </Form.Label>
        <Col sm={5}>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                className="form-control"
                placeholderText="Select date"
                onChange={(date) => field.onChange(date, setStartDate(date))}
                selected={startDate}
                dateFormat="yyyy-MM-dd"
              />
            )}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-sm-end">
          Name
        </Form.Label>
        <Col sm={5}>
        <Form.Control
            type="text"
            {...register("name", { required: false })}
            placeholder="Supllier Name"
            readOnly
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-sm-end">
          Balance (TK) <span className="text-danger">*</span>
        </Form.Label>
        <Col sm={3}>
          <Form.Control
            type="text"
            {...register("balance", { required: true })}
            placeholder="0.00"
            readOnly
          />
          {errors.balance && errors.balance.type === "required" && (
            <span className="text-danger">Balance amount is required</span>
          )}
        </Col>
        <Col sm={2}>
          <Form.Control
            type="text"
            {...register("status")}
            placeholder="Balance Status"
            readOnly
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-sm-end">
          Transaction Type
        </Form.Label>
        <Col sm={5}>
          {/* <Select
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
              <span className="text-danger">Transaction Type is required</span>
            )} */}
          <Select
            options={transactionTypeList}
            isSearchable={true}
            placeholder="Chose Transaction Type"
            required
          ></Select>

        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-sm-end">
          Transaction Amount
        </Form.Label>
        <Col sm={5}>
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
          Transaction Method
        </Form.Label>
        <Col sm={5}>
          <Select
            onChange={handlePaymentMethodChange}
            ref={(e) => {
              register("transaction_method", { required: true });
            }}
            type="text"
            options={paymentMethodList}
            isSearchable={true}
            placeholder="Chose Payment Method"
          ></Select>
          {errors.transaction_method &&
            errors.transaction_method.type === "required" && (
              <span className="text-danger">Payment Method is required</span>
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
              required: true,
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
            {...register("remark", { required: false })}
            placeholder="Remark"
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
          <Button variant="success" type="submit">
            Update
          </Button>
        </Form.Label>
      </Form.Group>
    </Form>
  );
};

export default EditTransaction;