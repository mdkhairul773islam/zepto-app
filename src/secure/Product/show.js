import React from "react";
import { Link } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../secure/Product/navbar";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";

function Show(props) {

    return (
        <AdminWraper menuOpen='product'>
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
                                Product Details
                                <Button to="#" className="btn btn-light btn-xl float-end px-1 py-0" onClick={() => window.print()}>
                                    <i className="fa fa-print" aria-hidden="true"></i>
                                </Button>
                                <Link to="/product/edit/1"
                                    className="btn btn-light btn-xl float-end px-2 py-0"
                                    type="button"
                                >
                                    <i className="fa fa-pen" aria-hidden="true"></i>
                                </Link>
                            </Card.Header>
                            <Card.Body>
                                <Table bordered striped hover responsive className="custom-table">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Date</th>
                                            <th>Item</th>
                                            <th>DO Invoice</th>
                                            <th>Qty(ctn)</th>
                                            <th>Free(ctn)</th>
                                            <th>Pending Qty(ctn)</th>
                                            <th>Free (ctn)</th>
                                            <th>P.Price (TK)</th>
                                            <th>Total (TK)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>27-Oct-2021</td>
                                            <td>Biscony Mogol Cookise</td>
                                            <td>454780</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>27-Oct-2021</td>
                                            <td>Biscony Mogol Cookise</td>
                                            <td>454780</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>27-Oct-2021</td>
                                            <td>Biscony Mogol Cookise</td>
                                            <td>454780</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>27-Oct-2021</td>
                                            <td>Biscony Mogol Cookise</td>
                                            <td>454780</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <th colSpan="4" className="text-end">Total</th>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <th>Remark:</th>
                                            <td colSpan="9"></td>
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

export default Show;

