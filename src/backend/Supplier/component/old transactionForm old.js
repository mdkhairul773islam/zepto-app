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

import {transaction} from "../../../redux/suplierTransaction/actionCreator";


const paymentMethodList = getPaymentMethods();
const transactionTypeList = getTransactionTypes();

const TransactionForm = () => {
   
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());
    const [suplierCode, setSuplierCode] = useState(null);

    // get data from redux
    const dispatch = useDispatch();
    const warehouseList = useSelector(
        (state) => state.helperReducer.warehouseList
    );

    

    const suplierList = useSelector((state) => state.helperReducer.suplierList);
    const {balance, status} = useSelector((state) => state.helperReducer.partyBalance);

    const {
        control,
        setValue,
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
          balance: "",
          balance_status: "",
          comission: "",
          date: "",
          paid_by: "",
          party_code: "",
          payment: "",
          remark: "",
          remission: "",
          status: "",
          total_balance: "",
          transaction_method: "",
          transaction_type: "",
          warehouse_id:""
        },
    });

    const onSubmit = (data, e) => {

        const { date } = data;
        const formData = {...data, date: typeof date !=='undefined' ?  getDate(date): getDate(startDate)};
        console.log("Fromdata", formData);
        
        //dispatch(transaction(formData, history));
        //e.target.reset();
    };
    
    const handleWarehouseChange = (e) => {
      const warehouseId = e.value;
      setValue("balance", "");
      setValue("status", "");
      setSuplierCode(null);
      dispatch(suplier(warehouseId));
      setValue("warehouse_id", e.value)
    };

    const handleSupplierChange = async(e) => {
      dispatch(supplierTransactionDetailsFn(e));
      const suplier = e.label + " - " + e.mobile;
      setSuplierCode(suplier);
      setValue("party_code", e.value);
    };

    const handleTransactionTypeChange = (e) => {
      setValue("transaction_type", e.value);
    };

    const handlePaymentMethodChange = (e) => {
      setValue("transaction_method", e.value);
    };
 
    useEffect(() => {
      reset({balance, status})
    }, [reset, balance, status]); 


  useEffect(() => {
      dispatch(warehouse());
  }, [dispatch]);
  
  console.log(watch());
  //console.log("warehouseList", warehouseList);
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
            register("warehouse_id");
          }}
          type="text"
          options={warehouseList}
          isSearchable={true}
          placeholder="Chose Warehouse"
        ></Select>
        
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
            register("party_code", { required: false });
          }}
          type="text"
          options={suplierList}
          isSearchable={false}
          placeholder="Chose Supplier Name"
          required
        ></Select>
        {errors.balance && errors.balance.type === "required" && (
          <span className="text-danger">
            Supplier name is required
          </span>
        )}
        {suplierCode}
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={3} className="text-sm-end">
        Balance (TK) <span className="text-danger">*</span>
      </Form.Label>
      <Col sm={3}>
        <Form.Control
          type="text"
          {...register('balance')}
          placeholder="0.00"
          readOnly
        />
        {errors.balance &&
          errors.balance.type === "required" && (
            <span className="text-danger">
              Suplier Name & Balance amount is required
            </span>
          )}
      </Col>
      <Col sm={2}>
        <Form.Control
          type="text"
          {...register('status')}
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
            register("transaction_type", { required: false });
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
        Transaction Method
      </Form.Label>
      <Col sm={3}>
        <Select
          onChange={handlePaymentMethodChange}
          ref={(e) => {
            register("transaction_method", { required: false });
          }}
          type="text"
          options={paymentMethodList}
          isSearchable={true}
          placeholder="Chose Payment Method"
        ></Select>
        {errors.transaction_method &&
          errors.transaction_method.type === "required" && (
            <span className="text-danger">
              Payment Method is required
            </span>
          )}
      </Col>
      <Col sm={2}>
        <Form.Control
          type="number"
          {...register("payment", { required: false })}
          placeholder="Amount (0.00)"
        />
        {errors.payment && errors.payment.type === "required" && (
          <span className="text-danger">Amount is required</span>
        )}
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={3} className="text-sm-end">
        Others Amount
      </Form.Label>
      <Col sm={3}>
        <Form.Control
          type="number"
          {...register("remission", { required: false })}
          placeholder="Remission (0.00)"
        />
      </Col>
      <Col sm={2}>
        <Form.Control
          type="number"
          {...register("comission", { required: false })}
          placeholder="Comission (0.00)"
        />
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
  )
}

export default TransactionForm;