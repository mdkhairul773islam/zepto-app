import actions from "./actions";
import { toast } from "react-toastify";
import { DataService } from "../../config/dataService/dataService";
const { productBegin, productSuccess, productGet, productErr } = actions;


const product = (data,  history) => {
  return async (dispatch) => {
    try {
      dispatch(productBegin());
      const res = await DataService.post("product-store", data);
      if (res.data.success) {
        toast.success(res.data.success, {
          position: toast.POSITION.TOP_CENTER
        });
        history.push("/product/all");
      }

      if (res.data.warning) {
        toast.warn(res.data.warning, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (err) {
      dispatch(productErr(err));
      toast("Product not getting added.", {
        position: toast.POSITION.TOP_CENTER
      });
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

const productUpdate = (data, history) => {
  return async (dispatch) => {
    try {
      dispatch(productBegin());
      const res = await DataService.post("product-update", data);
      if (res.data.success) {
        toast.success(res.data.success, {
          position: toast.POSITION.TOP_CENTER
        });
        history.push("/product/all");
      }

      if (res.data.warning) {
        toast.warn(res.data.warning, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (err) {
      dispatch(productErr(err));
      toast.error("Product not getting added.", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
};

const productDelete = (id) => {
  return async (dispatch) => {
    try {
      dispatch(productBegin());
      const res = await DataService.get(`/product-destroy/${id}`);
      if (res.data) {
        toast.success("Product successfully deleted", {
          position: toast.POSITION.TOP_CENTER
        });
        dispatch(productSuccess(res.data));
      }

      if (res.data.warning) {
        toast.warn(res.data.warning, {
          position: toast.POSITION.TOP_CENTER
        });
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
