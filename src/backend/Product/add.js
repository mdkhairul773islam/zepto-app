import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdminWraper from "../../components/layouts/AdminWraper";
import Navbar from "../../backend/Product/navbar";
import fileConvertBase64 from "../../utility/fileConvertBase64";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormCheck,
  Button,
} from "react-bootstrap";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import Select from "react-select";

// use redux
import { useDispatch, useSelector } from "react-redux";
import { category } from "../../redux/category/actionCreator";
import { brand } from "../../redux/brand/actionCreator";
import { unit } from "../../redux/unit/actionCreator";
import { product } from "../../redux/product/actionCreator";

function Add(props) {
 
  const history = useHistory();
  const dispatch = useDispatch();

  // use redux
  const categories = useSelector((state) => state.categoryReducer.categoryList);
  const brandItems = useSelector((state) => state.brandReducer.brandList);
  const units = useSelector((state) => state.unitReducer.unitList);

  const categoryList = categories.map((item) => {
    const { name: label, id: value, ...rest } = item;
    return { value, label, ...rest };
  });

  const brandList = brandItems.map((item) => {
    const { name: label, id: value, ...rest } = item;
    return { value, label, ...rest };
  });

  const unitList = units.map((item) => {
    const { unit: label, id: value, ...rest } = item;
    return { value, label, ...rest };
  });

  useEffect(() => {
    document.title = "Add New Product | Admin Dashboard";
    async function fetchData() {
      await dispatch(category());
      await dispatch(brand());
      await dispatch(unit());
    }
    fetchData();
  }, [dispatch]);

  const { setValue, register, handleSubmit, formState } = useForm({
    defaultValues: {
      purchase_price: "0",
      sale_price: "0",
    },
  });

  const handleCategoryChange = (e) => {
    setValue("category_id", e.value);
  };

  const handleBrandChange = (e) => {
    setValue("brand_id", e.value);
  };

  const handleUnitChange = (e) => {
    setValue("unit_id", e.value);
  };

  const onSubmit = async (data, e) => {

    const params = new URLSearchParams();

    params.append("name", data.name);
    params.append("category_id", data.category_id);
    params.append("brand_id", data.brand_id);
    params.append("unit_id", data.unit_id);
    params.append("purchase_price", data.purchase_price);
    params.append("sale_price", data.sale_price);
    params.append("status", data.status);

    if (data.photo[0] && typeof data.photo[0] != "undefined") {
      const photo = await fileConvertBase64(data.photo[0]);
      params.append("photo", photo);
    }

    dispatch(product(params, history));
    e.target.reset();
  };

  return (
    <AdminWraper menuOpen="product">
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
                Add New Product
              </Card.Header>
              <Card.Body>
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                >
                  <Form.Group as={Row} className="mb-2">
                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Product Name"
                        required
                      />
                    </Col>

                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Category <span className="text-danger">*</span>{" "}
                      </Form.Label>
                      <Select
                        onChange={handleCategoryChange}
                        ref={(e) => {
                          register("category_id", { required: true });
                        }}
                        options={categoryList}
                        isSearchable={true}
                        placeholder="Chose Category"
                        required
                      ></Select>
                    </Col>

                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Brand <span className="text-danger">*</span>{" "}
                      </Form.Label>
                      <Select
                        onChange={handleBrandChange}
                        ref={(e) => {
                          register("brand_id", { required: true });
                        }}
                        type="text"
                        options={brandList}
                        isSearchable={true}
                        placeholder="Chose Brand"
                        required
                      ></Select>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-2">
                    <Col className="mb-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>Purchase Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="purchase_price"
                        {...register("purchase_price", { required: true })}
                        placeholder="0.0"
                      />
                    </Col>

                    <Col md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>Sale Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="sale_price"
                        {...register("sale_price", { required: true })}
                        placeholder="0.0"
                      />
                    </Col>

                    <Col md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Unit <span className="text-danger">*</span>{" "}
                      </Form.Label>
                      <Select
                        onChange={handleUnitChange}
                        ref={(e) => {
                          register("unit_id", { required: true });
                        }}
                        type="text"
                        options={unitList}
                        isSearchable={true}
                        placeholder="Chose Unit"
                        required
                      ></Select>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-2">
                    <Col md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <Form.Label>
                        Image <span className="text-danger"></span>{" "}
                      </Form.Label>

                      <Form.Control
                        type="file"
                        {...register("photo")}
                        size="sm"
                      />
                    </Col>

                    <Col className="mt-2" md={4} lg={4} xl={4} xxl={4} xs={12}>
                      <FormCheck.Label className="me-2 mt-4">
                        Status
                      </FormCheck.Label>
                      <Form.Check
                        inline
                        label="Available"
                        name="status"
                        type="radio"
                        checked
                        id="one"
                        {...register("status")}
                      />
                      <Form.Check
                        inline
                        name="status"
                        label="Not Available"
                        type="radio"
                        id="two"
                        {...register("status")}
                      />
                    </Col>
                  </Form.Group>
                  <hr />
                  <Button
                    disabled={formState.isSubmitting}
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted">&nbsp;</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWraper>
  );
}

export default Add;
