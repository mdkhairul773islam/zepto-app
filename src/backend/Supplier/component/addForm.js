import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import {  Row, Col, Form, Button } from "react-bootstrap";

import { useForm } from "react-hook-form";
import Select from "react-select";

// use redux
import { useDispatch, useSelector } from "react-redux";
import { supplier } from "../../../redux/supplier/actionCreator";
import {warehouse} from "../../../redux/helper/actionCreator";

import {getBalanceStatusList} from "../../../utility/utility";

const AddForm = () => {
   
    const history = useHistory();

    const dispatch = useDispatch();
    const warehouseList = useSelector(
        (state) => state.helperReducer.warehouseList
      );
    const balanceStatusList = getBalanceStatusList();
  
    const { setValue, register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        initial_balance: 0,
      },
    });
  
    const onSubmit = (data, e) => {
      dispatch(supplier(data, history));
    };
  
    const handleBalanceStatusChange = (e) => {
      setValue("balance_status", e.value);
    };

    const handleWarehouseChange = (e) => {
        setValue("warehouse_id", e.value);
    };
    
    useEffect(() => {
        dispatch(warehouse());
      }, [dispatch]);
      
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        
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
                placeholder="Chose Warehouse"
                ></Select>
                {errors.warehouse_id &&
                errors.warehouse_id.type === "required" && (
                    <span className="text-danger">
                        Warehouse is required
                    </span>
                )}
            </Col>
        </Form.Group>
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
                {errors.name &&
                errors.name.type === "required" && (
                    <span className="text-danger">
                    Name is required
                    </span>
                )}
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
                {errors.mobile &&
                errors.mobile.type === "required" && (
                    <span className="text-danger">
                    Mobile is required
                    </span>
                )}
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
                options={balanceStatusList}
                isSearchable={true}
                placeholder="Chose"
                required
                ></Select>
                {errors.balance_status &&
                errors.balance_status.type === "required" && (
                    <span className="text-danger">
                    Status is required
                    </span>
                )}
            </Col>
        </Form.Group>

        <hr />
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={8} className="text-sm-end">
                <Button
                variant="primary"
                type="submit"
                >
                Submit
                </Button>
            </Form.Label>
        </Form.Group>
    </Form>
  )
}

export default AddForm;