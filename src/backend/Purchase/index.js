import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Purchase/navbar";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Table,
  Button,
  Pagination,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
function Purchase(props) {
  const [startDate, setStartDate] = useState(new Date());
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "Khairul", label: "Khairul" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];
  return (
    <AdminWraper menuOpen="purchase">
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
                Search Purchase
              </Card.Header>
              <Card.Body>
                <Form autoComplete="off">
                  <Row>
                    <Col
                      className="mb-3"
                      sm={6}
                      md={6}
                      lg={3}
                      xl={3}
                      xxl={3}
                      xs={12}
                    >
                      <DatePicker
                        className="form-control"
                        selected={startDate}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date) => setStartDate(date)}
                        autoComplete="off"
                      />
                    </Col>

                    <Col
                      className="mb-3"
                      sm={6}
                      md={6}
                      lg={3}
                      xl={3}
                      xxl={3}
                      xs={12}
                    >
                      <Form.Control placeholder="Invoice No" />
                    </Col>

                    <Col
                      className="mb-3"
                      sm={6}
                      md={6}
                      lg={3}
                      xl={3}
                      xxl={3}
                      xs={12}
                    >
                      <Select
                        type="text"
                        options={options}
                        isClearable={true}
                        isSearchable={true}
                        placeholder="Chose Showroom"
                      />
                    </Col>

                    <Col
                      className="mb-3"
                      sm={6}
                      md={6}
                      lg={3}
                      xl={3}
                      xxl={3}
                      xs={12}
                    >
                      <Select
                        type="text"
                        options={options}
                        isClearable={true}
                        isSearchable={true}
                        placeholder="Chose Company"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-end">
                      <Button variant="primary">Search</Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>

          <Col sm={12}>
            <Card>
              <Card.Header as="h4" className="fw-bold">
                All Purchase
                <Button
                  to="#"
                  className="btn btn-light btn-xl float-end px-1 py-0"
                  onClick={() => window.print()}
                >
                  <i className="fa fa-print" aria-hidden="true"></i>
                </Button>
                <Link
                  to="/purchase/add"
                  className="btn btn-light btn-xl float-end px-2 py-0"
                  type="button"
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
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
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>DO No.</th>
                      <th>Qty(ctn)</th>
                      <th>Free(ctn)</th>
                      <th>Pending Qty.</th>
                      <th>Free Qty.</th>
                      <th>P.Price (TK)</th>
                      <th>Total (TK)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Biscony Mogol Cookise</td>
                      <td>945405</td>
                      <td>27-Oct-2021</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>1</td>
                      <td>1</td>
                      <td className="text-center">
                        <Link
                          to="/purchase/invoice/1"
                          className="mx-1 btn btn-primary btn-sm"
                          type="button"
                        >
                          <i className="fa fa-eye fa-sm" aria-hidden="true"></i>
                        </Link>
                        <Link
                          to="/purchase/edit/1"
                          className="mx-1 btn btn-success btn-sm"
                          type="button"
                        >
                          <i className="fa fa-pen fa-sm" aria-hidden="true"></i>
                        </Link>
                        <Button
                          className="mx-1"
                          variant="danger"
                          type="button"
                          size="sm"
                        >
                          <i
                            className="fa fa-trash fa-sm"
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Biscony Mogol Cookise</td>
                      <td>945405</td>
                      <td>27-Oct-2021</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>1</td>
                      <td>1</td>
                      <td className="text-center">
                        <Link
                          to="/purchase/invoice/2"
                          className="mx-1 btn btn-primary btn-sm"
                          type="button"
                        >
                          <i className="fa fa-eye fa-sm" aria-hidden="true"></i>
                        </Link>
                        <Link
                          to="/purchase/edit/2"
                          className="mx-1 btn btn-success btn-sm"
                          type="button"
                        >
                          <i className="fa fa-pen fa-sm" aria-hidden="true"></i>
                        </Link>
                        <Button
                          className="mx-1"
                          variant="danger"
                          type="button"
                          size="sm"
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Pagination>
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item>{1}</Pagination.Item>
                  <Pagination.Ellipsis />

                  <Pagination.Item>{10}</Pagination.Item>
                  <Pagination.Item>{11}</Pagination.Item>
                  <Pagination.Item active>{12}</Pagination.Item>
                  <Pagination.Item>{13}</Pagination.Item>
                  <Pagination.Item disabled>{14}</Pagination.Item>

                  <Pagination.Ellipsis />
                  <Pagination.Item>{20}</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWraper>
  );
}

export default Purchase;
