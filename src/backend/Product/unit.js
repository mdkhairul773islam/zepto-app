import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Product/navbar";

import { DataService } from "../../config/dataService/dataService";
import DataTable from "../../components/DataTable/Table";
import { toast } from 'react-toastify';

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Button,
} from "react-bootstrap";

function Unit(props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

 
  const handleClose = () => setShow(false);

  /* unit database store here */

  const { register, handleSubmit } = useForm({
    defaultValues: {
      unit: "",
    },
  });

  const onSubmit = async (data, e) => {
    setLoading(true);
    try {
      const res = await DataService.post("unit-store", data);
      if (res.data.success) {
        toast.success(res.data.success, {
          position: toast.POSITION.TOP_CENTER
        });
        getUnit();
      }
      if (res.data.warning) {
        toast.warn(res.data.warning, {
          position: toast.POSITION.TOP_CENTER
        });
        getUnit();
      }
      setLoading(false);
    } catch (error) {
      console.log("error");
      setLoading(false);
    }
    e.target.reset();
  };

  const getUnit = async function getUnit(currentPage = 1, perPage = 10) {
    setLoading(true);
    try {
      const res = await DataService.get(
        `unit?page=${currentPage}&per_page=${perPage}`
      );
      if (res.data.data.length) {
        setTotalRows(res.data.total);
        setUnits(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("error");
      setLoading(false);
    }
  };

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
    getUnit(currentPage);
  };

  const handlePerRowsChange = async (perPage, currentPage) => {
    setPerPage(perPage);
    getUnit(currentPage, perPage);
  };

  useEffect(() => {
    document.title = "Unit | Admin Dashboard";
    getUnit(currentPage, perPage);
  }, [currentPage, perPage]);

  /* unit database store end here */

  /* unit update start here */
  const { register: register2, handleSubmit: handleSubmit2, reset } = useForm();
  const [editUnit, setEditUnit] = useState([]);

  const handleShow = async (e) => {
    setShow(true);
    try {
      var id = e.target.id;
      const res = await DataService.get(`/unit-edit/${id}`);
      setEditUnit(res.data);
    } catch (error) {
      console.log("error");
    }
  };

  const onSubmitUpdate = async (data, e) => {
    const { id, unit } = data.editUnit;
    try {
      setLoading(true);
      const res = await DataService.post("unit-update", { id: id, unit: unit });

      if (res.data.success) {
        toast.success(res.data.success, {
          position: toast.POSITION.TOP_CENTER
        });
        getUnit();
      }
      if (res.data.warning) {
        toast.warn(res.data.warning, {
          position: toast.POSITION.TOP_CENTER
        });
        getUnit();
      }
      setLoading(false);
      setShow(false);
    } catch (error) {
      console.log("error");
    }
  };

  /* unit delete  */
  const handleDeleteClick = async (e) => {
    try {
      var id = e.target.id;
      var confirmDelete = window.confirm("Want to delete?");
      if (confirmDelete) {
        const res = await DataService.get(`/unit-destroy/${id}`);
        if (res.data.success) {
          toast.success(res.data.success, {
            position: toast.POSITION.TOP_CENTER
          });
          getUnit();
        }
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    reset({
      editUnit,
    });
  }, [editUnit, reset]);

  const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      maxWidth: "20px",
    },
    {
      name: "Name",
      selector: (row) => row.unit,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Button
            onClick={handleShow}
            id={row.id}
            className="btn btn-success btn-sm m-1"
          >
            <i className="fas fa-pen fa-sm"></i>
          </Button>
          <Button
            className="btn btn-danger btn-sm m-1"
            onClick={handleDeleteClick}
            id={row.id}
          >
            <i className="fas fa-trash fa-sm"></i>
          </Button>
        </>
      ),
      center: true,
      className: "action-width",
    },
  ];

  return (
    <AdminWraper menuOpen="product">
      <Container className="p-0" fluid>
        <Row>
          <div className="body_nav">
            <Navbar />
          </div>
        </Row>
        <Row>
          <Col sm={12} className="mb-4">
            <Card>
              <Card.Header as="h4" className="fw-bold">
                Unit
              </Card.Header>
              <Card.Body>
                <Form
                  key={1}
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Row className="justify-content-md-start">
                    <Col
                      className="mb-3"
                      sm={6}
                      md={6}
                      lg={3}
                      xl={3}
                      xxl={3}
                      xs={12}
                    >
                      <Form.Control
                        name="unit"
                        required
                        {...register("unit", { required: true })}
                        placeholder="Unit Name"
                      />
                    </Col>
                    <Col sm={6} md={6} lg={3} xl={3} xxl={3} xs={12}>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Header as="h4" className="fw-bold">
                Unit List
              </Card.Header>
              <Card.Body>
                <DataTable
                  columns={columns}
                  data={units}
                  loading={loading}
                  totalRows={totalRows}
                  currentPage={currentPage}
                  perPage={perPage}
                  handlePerRowsChange={handlePerRowsChange}
                  handlePageChange={handlePageChange}
                />
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title as="h5">Edit Unit</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form
                      key={2}
                      autoComplete="off"
                      onSubmit={handleSubmit2(onSubmitUpdate)}
                    >
                      <Form.Control
                        name="unit"
                        required
                        {...register2("editUnit.unit", { required: true })}
                        placeholder="Unit Name"
                      />

                      <Form.Control
                        type="hidden"
                        name="id"
                        required
                        {...register2("editUnit.id", { required: true })}
                        placeholder="Unit Name"
                      />
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handleSubmit2(onSubmitUpdate)}
                    >
                      Update
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWraper>
  );
}

export default Unit;
