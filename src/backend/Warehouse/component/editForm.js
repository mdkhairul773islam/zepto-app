import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";

import { DataService } from "../../../config/dataService/dataService";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

function EditForm(props) {
  const { register, handleSubmit, formState, reset } = useForm({});

 
  const history = useHistory();

  const id = props.id;
  const [wharehouse, setWarehouse] = useState([]);

  useEffect(() => {
    getWarehouse(id);
  }, [id]);

  useEffect(() => {
    reset({
      wharehouse,
    });
  }, [reset, wharehouse]);

  const getWarehouse = async function getWarehouse(id) {
    try {
      const res = await DataService.get(`warehouse-edit/${id}`);
      if (res.data) {
        setWarehouse(res.data);
      }
    } catch (error) {
      console.log("error");
    }
  };

  //Update
  const [errorMessage, setMessage] = useState({});
  const onSubmit = async (data, e) => {
    const { id, name, manager_name, mobile, address } = data.wharehouse;
    try {
      const res = await DataService.post("warehouse-update", {
        id: id,
        name: name,
        manager_name: manager_name,
        mobile: mobile,
        address: address,
      });
      if (res.data.success) {
        e.target.reset();
        toast.success(res.data.success, {
          position: toast.POSITION.TOP_CENTER
        });
        history.push("/warehouse/all");
      } else if (res.data.warning) {
        toast.warn(res.data.warning, {
          position: toast.POSITION.TOP_CENTER
        });
      } else if (res.data.validator) {
        setMessage({
          ...errorMessage,
          mobile: res.data.message.mobile,
          address: res.data.message.address,
          prefix: res.data.message.prefix,
        });
        toast.error(res.data.validator, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (error) {
      console.log("error");
    }
    e.target.reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} className="mb-2">
        <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
          <Form.Label>
            Name <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            {...register("wharehouse.name", { required: true })}
            placeholder="Warehouse Name"
            required
          />
        </Col>

        <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
          <Form.Label>
            Manager <span className="text-danger"></span>
          </Form.Label>
          <Form.Control
            type="text"
            {...register("wharehouse.manager_name")}
            placeholder="Manager Name"
          />
        </Col>

        <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
          <Form.Label>
            Mobile <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            {...register("wharehouse.mobile", { required: true })}
            placeholder="Mobile No"
            required
          />
          <p>{errorMessage.mobile}</p>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-2">
        <Col className="mb-2" md={12} lg={12} xl={12} xxl={12} xs={12}>
          <Form.Label>Address </Form.Label>
          <Form.Control
            as="textarea"
            {...register("wharehouse.address")}
            rows={3}
          />
        </Col>
        <p>{errorMessage.address}</p>
      </Form.Group>
      <hr />
      <Button disabled={formState.isSubmitting} variant="success" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default EditForm;
