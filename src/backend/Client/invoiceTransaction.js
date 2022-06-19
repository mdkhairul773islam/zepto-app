import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "./navbar";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";

function TransactionDetails(props) {

    useEffect(() => {
        document.title = "Transaction Invoice | React Dashboard";
    }, []);

    return (
        <AdminWraper menuOpen="client">
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
                                Transaction Invoice
                                <Button
                                    to="#"
                                    className="btn btn-light btn-xl float-end px-1 py-0"
                                    onClick={() => window.print()}
                                >
                                    <i className="fa fa-print" aria-hidden="true"></i>
                                </Button>
                                <Link
                                    to="/supplier/transaction/edit/1"
                                    className="btn btn-light btn-xl float-end px-2 py-0"
                                    type="button"
                                >
                                    <i className="fa fa-pen" aria-hidden="true"></i>
                                </Link>
                            </Card.Header>
                            <Card.Body>
                                <Table
                                    bordered
                                    striped
                                    hover
                                    responsive
                                    className="custom-table"
                                >
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>Contact Person</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>Mobile</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>Remarks</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>Initial Balance</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>Current Balance</th>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <th>Supplier Type</th>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                            <Card.Footer className="text-muted">&nbsp;</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </AdminWraper>
    );
}

export default TransactionDetails;
