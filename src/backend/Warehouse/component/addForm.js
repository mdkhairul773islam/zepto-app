import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";

import { DataService } from "../../../config/dataService/dataService";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";

function AddForm(props) {
  const { addToast } = useToasts();
  const history = useHistory();
  const [errorMessage, setMessage] = useState({});

  const { register, handleSubmit, formState } = useForm({});
  const onSubmit = async (data, e) => {
    try {
      const res = await DataService.post("warehouse", data);
      if (res.data.success) {
        e.target.reset();
        addToast(res.data.success, { appearance: "info" });
        history.push("/warehouse/all");
      } else if (res.data.warning) {
        addToast(res.data.warning, { appearance: "warning" });
      } else if (res.data.validator) {
        setMessage({
          ...errorMessage,
          mobile: res.data.message.mobile,
          address: res.data.message.address,
          prefix: res.data.message.prefix,
        });
        addToast(res.data.validator, { appearance: "warning" });
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} className="mb-2">
        <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
          <Form.Label>
            Name <span className="text-danger">*</span>{" "}
          </Form.Label>
          <Form.Control
            type="text"
            {...register("name", { required: true })}
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
            {...register("manager_name")}
            placeholder="Manager Name"
          />
        </Col>

        <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
          <Form.Label>
            Mobile <span className="text-danger">*</span>{" "}
          </Form.Label>
          <Form.Control
            type="text"
            {...register("mobile", { required: true })}
            placeholder="Mobile No"
            required
          />
          <p>{errorMessage.mobile}</p>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-2">
        <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
          <Form.Label>Address </Form.Label>
          <Form.Control as="textarea" {...register("address")} rows={3} />
          <p>{errorMessage.address}</p>
        </Col>

        <Col md={4} lg={4} xl={4} xxl={4} xs={12}>
          <Form.Label>Prefix </Form.Label>
          <Form.Control
            name="prefix"
            {...register("prefix", { required: true })}
            placeholder="WarehouseAbc"
          />
          <p>{errorMessage.prefix}</p>
        </Col>
      </Form.Group>
      <hr />
      <Button disabled={formState.isSubmitting} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddForm;
