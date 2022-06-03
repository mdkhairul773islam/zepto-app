import actions from "./actions";
import { DataService } from "../../config/dataService/dataService";
const { productBegin, productSuccess, productGet, productErr } = actions;

const product = (data, addToast, history) => {
  return async (dispatch) => {
    try {
      dispatch(productBegin());
      const res = await DataService.post("product-store", data);
      if (res.data.success) {
        addToast(res.data.success, { appearance: "success" });
        history.push("/product/all");
      }

      if (res.data.warning) {
        addToast(res.data.warning, { appearance: "warning" });
      }
    } catch (err) {
      dispatch(productErr(err));
      addToast("Product not getting added.", { appearance: "error" });
    }
  };
};

const productList = (currentPage = 1, perPage = 10) => {
  return async (dispatch) => {
    try {
      dispatch(productBegin());
      const res = await DataService.get(
        `product?page=${currentPage}&per_page=${perPage}&delay=1`
      );
      dispatch(productSuccess(res.data));
    } catch (err) {
      dispatch(productErr(err));
    }
  };
};

const productOptionList = () => {
  return async (dispatch) => {
    try {
      dispatch(productBegin());
      const res = await DataService.get(`product-list`);
      dispatch(productSuccess(res.data));
    } catch (err) {
      dispatch(productErr(err));
    }
  };
};

const productEdit = (id) => {
  return async (dispatch) => {
    try {
      dispatch(productBegin());
      const res = await DataService.get(`/product-edit/${id}`);
      dispatch(productGet(res.data));
    } catch (err) {
      dispatch(productErr(err));
    }
  };
};

const productUpdate = (data, addToast, history) => {
  return async (dispatch) => {
    try {
      dispatch(productBegin());
      const res = await DataService.post("product-update", data);
      if (res.data.success) {
        addToast(res.data.success, { appearance: "success" });
        history.push("/product/all");
      }

      if (res.data.warning) {
        addToast(res.data.warning, { appearance: "warning" });
      }
    } catch (err) {
      dispatch(productErr(err));
      addToast("Product not getting added.", { appearance: "error" });
    }
  };
};

const productDelete = (id, addToast) => {
  return async (dispatch) => {
    try {
      dispatch(productBegin());
      const res = await DataService.get(`/product-destroy/${id}`);
      if (res.data) {
        addToast("Product successfully deleted", { appearance: "success" });
        dispatch(productSuccess(res.data));
      }

      if (res.data.warning) {
        addToast(res.data.warning, { appearance: "warning" });
      }
    } catch (err) {
      dispatch(productErr(err));
    }
  };
};

export {
  product,
  productList,
  productOptionList,
  productEdit,
  productUpdate,
  productDelete,
};
