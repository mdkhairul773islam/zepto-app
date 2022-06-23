import React from "react";
import { Link } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Purchase/navbar";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";

function Purchase(props) {
  console.log(props.match.params);
  return (
    <AdminWraper menuOpen="purchase">
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
                Invoice
                <Button
                  to="#"
                  className="btn btn-light btn-xl float-end px-1 py-0"
                  onClick={() => window.print()}
                >
                  <i className="fa fa-print" aria-hidden="true"></i>
                </Button>
                <Link
                  to="/purchase/edit/1"
                  className="btn btn-light btn-xl float-end px-2 py-0"
                  type="button"
                >
                  <i className="fa fa-pen" aria-hidden="true"></i>
                </Link>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={6} xxl="6" xl="6" col-md={6} col-sm={6}>
                    <Table borderless responsive className="shadow-none">
                      <thead>
                        <tr>
                          <th>Company Name : </th>
                          <td>FreeLance IT Lab</td>
                        </tr>
                        <tr>
                          <th>Address : </th>
                          <td>Coronation Road, Sankipara, Mymensingh 2200</td>
                        </tr>
                        <tr>
                          <th>Mobile : </th>
                          <td>01707536945</td>
                        </tr>
                      </thead>
                    </Table>
                  </Col>
                  <Col xs={6} xxl="6" xl="6" col-md={6} col-sm={6}>
                    <Table borderless responsive className="shadow-none">
                      <thead>
                        <tr>
                          <th>DO Invoice : </th>
                          <td>211123</td>
                        </tr>
                        <tr>
                          <th>Order Date :</th>
                          <td>2021-11-22</td>
                        </tr>
                        <tr>
                          <th>Print Date/Time : </th>
                          <td>23-Nov-2021 01:12:23 AM</td>
                        </tr>
                      </thead>
                    </Table>
                  </Col>
                </Row>
                <Table bordered striped hover responsive>
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
                      <th colSpan="4" className="text-end">
                        Total
                      </th>
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

export default Purchase;
