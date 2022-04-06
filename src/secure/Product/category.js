import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../secure/Product/navbar";

import { DataService } from "../../config/dataService/dataService";
import DataTable from "../../components/DataTable/Table";

import { useToasts } from "react-toast-notifications";

import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Modal,
    Button,
} from "react-bootstrap";


function Category(props) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);


    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const { addToast } = useToasts();
    const handleClose = () => setShow(false);

    /* Category database store here */

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: "",
        },
    });
    const onSubmit = async (data, e) => {
        setLoading(true);
        try {
            const res = await DataService.post("category-store", data);
            addToast("Saved Successfully", { appearance: "success" });
            setCategory(res.data);
            setTotalRows(res.data.total);
            setLoading(false);
        } catch (error) {
            console.log("error");
        }
        e.target.reset();
    };

    /* category get and pagination start here */

    const getCategory = async function getCategory(currentPage = 1, perPage = 10) {
        setLoading(true);
        try {
            const res = await DataService.get(`category?page=${currentPage}&per_page=${perPage}`);
            setTotalRows(res.data.total)
            setCategory(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log("error");
        }
    };

    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage);
        getCategory(currentPage)
    };

    const handlePerRowsChange = async (perPage, currentPage) => {
        setPerPage(perPage);
        getCategory(currentPage, perPage);
    };

    useEffect(() => {
        document.title = "Category | React Dashboard";
        getCategory(currentPage, perPage);
    }, [currentPage, perPage]);

    /* category pagination end here */

    /* Category database store end here */

    /* Category update start here */
    const { register: register2, handleSubmit: handleSubmit2, reset } = useForm();
    const [editCategory, setEditCategory] = useState([]);

    const handleShow = async (e) => {
        setShow(true);
        try {
            var id = e.target.id;
            const res = await DataService.get(`/category-edit/${id}`);
            setEditCategory(res.data);
        } catch (error) {
            console.log("error");
        }
    };

    const onSubmitUpdate = async (data, e) => {

        const { id, name } = data.editCategory;

        try {
            setLoading(true);
            const res = await DataService.post("category-update", { id: id, name: name });
            addToast("Updated Successfully", { appearance: "info" });
            setCategory(res.data);
            setLoading(false);
            setShow(false);
        } catch (error) {
            console.log("error");
        }
    };

    /* Category delete  */
    const handleDeleteClick = async (e) => {
        try {
            var id = e.target.id;
            var confirmDelete = window.confirm("Want to delete?");
            if (confirmDelete) {
                const res = await DataService.get(`/category-destroy/${id}`);
                addToast("Successfully Deleted", { appearance: "error" });
                setCategory(res.data);
            }
        } catch (error) {
            console.log("error");
        }
    };

    useEffect(() => {
        reset({
            editCategory,
        });
    }, [editCategory, reset]);

    const columns = [
        {
            name: "Sl",
            selector: (row, index) => index + 1,
            maxWidth: "20px",
        },
        {
            name: "Name",
            selector: (row) => row.name,
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
                                Category
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
                                                name="name"
                                                required
                                                {...register("name", { required: true })}
                                                placeholder="Category Name"
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
                                Category List
                            </Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={columns} data={category}
                                    loading={loading} totalRows={totalRows}
                                    currentPage={currentPage} perPage={perPage}
                                    handlePerRowsChange={handlePerRowsChange}
                                    handlePageChange={handlePageChange}
                                />
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title as="h5">Edit Category</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form
                                            key={2}
                                            autoComplete="off"
                                            onSubmit={handleSubmit2(onSubmitUpdate)}
                                        >
                                            <Form.Control
                                                name="name"
                                                required
                                                {...register2("editCategory.name", { required: true })}
                                                placeholder="Category Name"
                                            />

                                            <Form.Control
                                                type="hidden"
                                                name="id"
                                                required
                                                {...register2("editCategory.id", { required: true })}
                                                placeholder="Category Name"
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

export default Category;
