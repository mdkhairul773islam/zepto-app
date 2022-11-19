import React, { useEffect, useState } from "react";

import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Supplier/navbar";
import { Container, Row, Col, Card } from "react-bootstrap";
import EditTransaction from "./component/editTransaction";

import { DataService } from "../../config/dataService/dataService";

function TransactionEdit(props) {

  const id = props.match.params.id;
  const [transactionDetails, setTransactionDetails] = useState([]);
  useEffect(() => {
    document.title = "Edit Transaction | Dashboard";
  }, []);

  const getTransactionDetails = async function getTransactionDetails(id) {
    try {
      const res = await DataService.get(`party-transaction/${id}/edit`);
      if (res.data) {
        setTransactionDetails(res.data);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getTransactionDetails(id);
  }, [id]);

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
                Edit Supplier Transaction
              </Card.Header>
              <Card.Body>
                <EditTransaction details={transactionDetails}/>
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWraper>
  );
}

export default TransactionEdit;
