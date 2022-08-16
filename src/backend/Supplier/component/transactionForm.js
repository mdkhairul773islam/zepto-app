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
  warehouse,
  suplier,
  supplierTransactionDetailsFn,
} from "../../../redux/helper/actionCreator";

import { transaction } from "../../../redux/suplierTransaction/actionCreator";

const paymentMethodList = getPaymentMethods();
const transactionTypeList = getTransactionTypes();

const TransactionForm = () => {
  // get data from redux
  const dispatch = useDispatch();
  const warehouseList = useSelector(
    (state) => state.helperReducer.warehouseList
  );
  
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
    payment: "",
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
  } = useForm({
    defaultValues: defaultValues,
  });

  const warehouseId = watch("warehouse_id");
  const partyCode = watch("party_code");
  const currentSuplierStatus = watch("status");
  const paymentAmount = watch("payment");
  const transactionType = watch("transaction_type");

  /* suplier list set */
  const [suplierList, setSuplierList] = useState(null);
  const getSuplierList = useSelector((state) => state.helperReducer.suplierList);
  useEffect(() => {
    if(warehouseId){
      setValue("party_code", 0);
      setSuplierList(getSuplierList);
    }else{
      setSuplierList([]);
    }
  }, [getSuplierList, setValue, warehouseId]);

  /* This code for supplier balance calculation */
  useEffect(() => {
    if (
      typeof warehouseId !== "undefined" &&
      warehouseId !== "" &&
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
  }, [
    paymentAmount,
    real_balance,
    setValue,
    transactionType,
    currentSuplierStatus,
    warehouseId,
    partyCode,
  ]);

  const handleWarehouseChange = async (e) => {
    await dispatch(suplier(e.value));
    setValue("warehouse_id", e.value);
  };

  const handleSupplierChange = async (e) => {
    (await e) &&
      dispatch(supplierTransactionDetailsFn(e)) &&
      setValue("party_code", e.code);
  };

  const handleTransactionTypeChange = (e) => {
    setValue("transaction_type", e.value);
  };

  const handlePaymentMethodChange = (e) => {
    setValue("transaction_method", e.value);
  };
  
  useEffect(() => {
    dispatch(warehouse());
  }, [dispatch]);

  useEffect(() => {
    setValue("balance", balance);
    setValue("status", status);
    setValue("real_balance", real_balance);
  }, [balance, real_balance, setValue, status]);

  const onSubmit = async (data, e) => {
    const { date } = data;
    const formData = {
      ...data,
      date: typeof date !== "undefined" ? getDate(date) : getDate(startDate),
    };
    await dispatch(transaction(formData, history));
    await e.target.reset();
  };

  console.log("watch", watch());
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
          Warehouse <span className="text-danger">*</span>
        </Form.Label>
        <Col sm={5}>
          <Select
            onChange={handleWarehouseChange}
            ref={(e) => {
              register("warehouse_id", { required: true });
            }}
            type="text"
            options={warehouseList}
            isSearchable={true}
            isClearable
            placeholder="Chose Warehouse"
          ></Select>
          {errors.warehouse_id && errors.warehouse_id.type === "required" && (
            <span className="text-danger">Warehouse is required</span>
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
              register("party_code", { required: true });
            }}
            type="text"
            options={suplierList}
            isSearchable={true}
            defaultValue={{ code:null, label: "Select Suplier", value: 0, mobile:null }}
            isClearable
            required
          ></Select>
          {errors.party_code && errors.party_code.type === "required" && (
            <span className="text-danger">Supplier name is required</span>
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
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form.Label>
      </Form.Group>
    </Form>
  );
};

export default TransactionForm;