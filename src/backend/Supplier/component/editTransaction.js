import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { Controller, useForm, useController } from "react-hook-form"; 
import DatePicker from "react-datepicker";
import moment from 'moment';
import {
  getDate,
  getPaymentMethods,
  getTransactionTypes,
} from "../../../utility/utility";

// use redux
import { useDispatch } from "react-redux";
import { transactionUpdate } from "../../../redux/suplierTransaction/actionCreator";

const paymentMethodList = getPaymentMethods();
const transactionTypeList = getTransactionTypes();

const EditTransaction = ({details}) => { 
  const dispatch = useDispatch();
  const history = useHistory();

  const [startDate, setStartDate] = useState();  
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
  const { field } = useController({name:'transaction_type', control});
  useEffect(() => {
    reset({
      details,
    });
  }, [reset, details])
  
  const {id, credit, debit, name, transaction_at, transaction_type, transaction_method, real_balance, previous_balance, previous_status, remark, paid_by } = details;

  const currentSuplierStatus = watch("status");
  const paymentAmount = watch("payment");
  const transactionType = watch("transaction_type");
  /* This code for supplier balance calculation */
  useEffect(() => {
    if (typeof id !== "undefined" && id !== "") {
      var total = 0;
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
  }, [id, paymentAmount, real_balance, setValue, transactionType, currentSuplierStatus]);
  
  useEffect(() => {
    setValue("balance", previous_balance);
    setValue("status", previous_status);
    setValue("real_balance", real_balance);
    setValue("name", name);
    setValue("payment", credit > 0 ? credit: debit);
    setValue("transaction_type", transaction_type);
    setValue("transaction_method", transaction_method);
    setValue("remark", remark);
    setValue("paid_by", paid_by);
    setValue("date", moment(transaction_at).toDate());
  }, [credit, debit, name, previous_balance, previous_status, real_balance, setValue, transaction_type, transaction_method, remark, paid_by, transaction_at]);

  const onSubmit = async (data, e) => {
    const { date } = data;
    const  formData = await {
      ...data,
      id:id,
      date: typeof date !== "undefined" ? getDate(date) : getDate(startDate),
    };
    await dispatch(transactionUpdate(formData, history));
  };
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
                selected={startDate ? startDate: moment(transaction_at).toDate()}
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
            {...register("name", { required: true })}
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
          <Select
            value={transactionTypeList.find(({value})=>value===field.value)}
            onChange={(e)=>field.onChange(e ? e.value: '')}
            options={transactionTypeList}
            isSearchable={true}
            isClearable
            placeholder="Chose Transaction Type"
            required
          ></Select>
          {errors.transaction_type &&
            errors.transaction_type.type === "required" && (
              <span className="text-danger">Transaction Type is required</span>
            )}
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
        <Controller
              name="transaction_method"
              control={control}
              render={({ field }) => (
                <Select
                value={paymentMethodList.find(({value})=>value===field.value)}
                options={paymentMethodList}
                onChange={(e)=>field.onChange(e ? e.value: '')}
                placeholder="Chose Transaction Method"
                isSearchable={true}
                isClearable
                 {...field.value} 
                 label="Text field" />
              )}
            />
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