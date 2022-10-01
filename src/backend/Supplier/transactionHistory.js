import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "./navbar";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import DataTable from "../../components/DataTable/Table";
import ColoredLine from "../../components/UI/ColoredLine";
import { Controller, useForm } from "react-hook-form"; 
import DatePicker from "react-datepicker";
import Select from "react-select";

import {getDate, toFilter} from "../../utility/utility";

// use redux
import { useDispatch, useSelector } from "react-redux";
import {
  transactionHistoryWithSearch,
  transactionDelete,
} from "../../redux/suplierTransaction/actionCreator";
import {
  warehouse,
  suplier,
} from "../../redux/helper/actionCreator";

function TransactionHistory(props) {

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const defaultValues = {
    from_date: fromDate,
    to_date: toDate,
  };

  const {
    control, setValue,  register, handleSubmit, watch, formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });
  const warehouseId = watch('warehouse_id');

  // get data from redux
  const dispatch = useDispatch();
  const warehouseList = useSelector(
    (state) => state.helperReducer.warehouseList
  );
  const supliers = useSelector((state) => state.helperReducer.suplierList);
  const [suplierList, setSuplierList] = useState([]);
  
  useEffect(() => {
    if(typeof warehouseId !=="undefined" && warehouseId !==""){
      setSuplierList(supliers);
    }else{
      setSuplierList([]);
    }
  }, [supliers, warehouseId]);


  const data = useSelector((state) => state.suplierTransactionReducer.transactionList);
  const loading = useSelector((state) => state.suplierTransactionReducer.loading);
  const totalDataRows = useSelector((state) => state.suplierTransactionReducer.totalRows);

  const history = useHistory();
  const handleDeleteClick = (e) => {
    var id = e.target.id;
    dispatch(transactionDelete(id, history));
  };

  const columns = [
    {
      name: "Sl",
      selector: (row, index) => ++index,
      maxWidth:"20px",
      center: true,
    },
    {
      name: "Date",
      selector: (row) =>
      row.transaction_at != null ? row.transaction_at : "N/A",
      sortable: true,
    },
    {
      name: "Warehouse",
      selector: (row) => row.warehouse_name,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Code",
      selector: (row) => (row.party_code != null ? row.party_code : "N/A"),
    },
    {
      name: "Type Of Transaction / Method",
      selector: (row) => (row.transaction_method != null ? toFilter(row.transaction_method) : "N/A"),
    },
    {
      name: "Amount",
      selector: (row) => row.credit  > 0 ? row.credit : row.debit,
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link
            to={`/supplier/transaction-view/${row.id}`}
            className="btn btn-primary btn-sm m-1"
          >
            <i className="fas fa-eye fa-sm"></i>
          </Link>

          <Link
            to={`/supplier/transaction-edit/${row.id}`}
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

  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchItem, setSearchItem] = useState({});

  useEffect(() => {
    setTotalRows(totalDataRows);
  }, [totalDataRows]);

  useEffect(() => {
    document.title = "Suplier Transaction History | React Dashboard";
    dispatch(transactionHistoryWithSearch(searchItem, currentPage, perPage));
  }, [currentPage, dispatch, perPage, searchItem]);

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(transactionHistoryWithSearch(searchItem, currentPage, perPage));
  };

  const handlePerRowsChange = async (perPage, currentPage) => {
    setPerPage(perPage);
    dispatch(transactionHistoryWithSearch(searchItem, currentPage, perPage))
  };

  useEffect(() => {
    dispatch(warehouse());
  }, [dispatch]);

  const handleWarehouseChange = async (e) => {
    (await e) && dispatch(suplier(e.value)) && setValue("warehouse_id", e.value);
  };
  const handleSupplierChange = async (e) => {
      setValue("party_code", e.code);
  };

  const onSubmit = async (data, e) => {

    const { from_date, to_date } = data;
    const filterItem = await {
      ...data,
      from_date: typeof from_date !== "undefined" ? getDate(from_date) : getDate(fromDate),
      to_date: typeof to_date !== "undefined" ? getDate(to_date) : getDate(toDate),
    };
    setSearchItem(filterItem);
    dispatch(transactionHistoryWithSearch(filterItem));
  };
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
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Row} className="mb-3">
                  <Col sm={2}>
                    <Controller
                      control={control}
                      name="from_date"
                      render={({ field }) => (
                        <DatePicker
                          className="form-control"
                          placeholderText="Date From"
                          onChange={(date) => field.onChange(date, setFromDate(date))}
                          selected={fromDate}
                          dateFormat="yyyy-MM-dd"
                        />
                      )}
                    />
                  </Col>
                  <Col sm={2}>
                    <Controller
                      control={control}
                      name="to_date"
                      render={({ field }) => (
                        <DatePicker
                          className="form-control"
                          placeholderText="Date To"
                          onChange={(date) => field.onChange(date, setToDate(date))}
                          selected={toDate}
                          dateFormat="yyyy-MM-dd"
                        />
                      )}
                    />
                  </Col>
                  <Col sm={3}>
                    <Select
                      onChange={handleWarehouseChange}
                      ref={(e) => {
                        register("warehouse_id", { required: false });
                      }}
                      type="text"
                      options={warehouseList}
                      isSearchable={true}
                      isClearable
                      placeholder="Chose Warehouse"
                    ></Select>
                    {errors.warehouse_id && errors.warehouse_id.type === "required" && (
                      <span className="text-danger">Warehouse is required</span>
                    )}
                  </Col>
                  <Col sm={3}>
                  <Select
                    onChange={handleSupplierChange}
                    ref={(e) => {
                      register("party_code", { required: false });
                    }}
                    type="text"
                    options={suplierList}
                    isSearchable={true}
                    defaultValue={{code:null, label: "Select Suplier", value: 0, mobile:null }}
                    isClearable
                    required
                  ></Select>
                  {errors.party_code && errors.party_code.type === "required" && (
                    <span className="text-danger">Supplier name is required</span>
                  )}
                </Col>

                  <Col>
                      <Button variant="primary" type="submit">
                        Search
                      </Button>
                  </Col>
                  </Form.Group>
                </Form>
                <ColoredLine options={{color:"#2a378b", height:2}}/>
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

export default TransactionHistory;