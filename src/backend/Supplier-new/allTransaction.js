import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Supplier/navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DataTable from "../../components/DataTable/Table";
import { toast } from 'react-toastify';

function Index(props) {
    const data = [];

    const totalDataRows = [];
    const loading = false;

   
    const history = useHistory();

    const handleDeleteClick = (e) => {
        var id = e.target.id;
    };

    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        setTotalRows(totalDataRows);
    }, [totalDataRows]);

    useEffect(() => {
        document.title = "Supplier List | Admin Dashboard";
    }, []);

    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage);
    };

    const handlePerRowsChange = async (perPage, currentPage) => {
        setPerPage(perPage);
    };

    const columns = [
        {
            name: "Sl",
            selector: (row, index) => index + 1,
            maxWidth: "20px",
        },
        {
            name: "Name",
            selector: (row) => row.name,
        },
        {
            name: "Category",
            selector: (row) => (row.category != null ? row.category.name : "N/A"),
        },
        {
            name: "Brand",
            selector: (row) => (row.brand != null ? row.brand.name : "N/A"),
        },
        {
            name: "Purchase Price",
            selector: (row) => row.purchase_price,
        },
        {
            name: "Sale Price",
            selector: (row) => row.sale_price,
        },
        {
            name: "Unit",
            selector: (row) => (row.unit != null ? row.unit.unit : "N/A"),
        },
        {
            name: "Photo",
            selector: (row) => (row.unit != null ? row.unit.unit : "N/A"),
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <Link
                        to={`/product/edit/${row.id}`}
                        className="btn btn-success btn-sm m-1"
                    >
                        <i className="fas fa-pen fa-sm"></i>
                    </Link>
                    <button
                        className="btn btn-danger btn-sm m-1"
                        onClick={handleDeleteClick}
                        id={row.id}
                    >
                        <i className="fas fa-trash fa-sm"></i>
                    </button>
                </>
            ),
            center: true,
            className: "action-width",
        },
    ];

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
                                All Transaction
                                <Button
                                    to="#"
                                    className="btn btn-light btn-xl float-end px-1 py-0"
                                    onClick={() => window.print()}
                                >
                                    <i className="fa fa-print" aria-hidden="true"></i>
                                </Button>
                            </Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    loading={loading}
                                    totalRows={totalRows}
                                    currentPage={currentPage}
                                    perPage={perPage}
                                    handlePerRowsChange={handlePerRowsChange}
                                    handlePageChange={handlePageChange}
                                />
                            </Card.Body>
                            <Card.Footer className="text-muted">&nbsp;</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </AdminWraper>
    );
}

export default Index;
