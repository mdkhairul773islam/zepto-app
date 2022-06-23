import actions from "./actions";
import { DataService } from "../../config/dataService/dataService";
const { supplierBegin, supplierSuccess, supplierGet, supplierErr } = actions;

const supplier = (data, addToast, history) => {
  return async (dispatch) => {
    try {
      dispatch(supplierBegin());
      const res = await DataService.post("supplier-store", data);

      if (res.data.success) {
        addToast(res.data.success, { appearance: "success" });
        history.push("/supplier/all");
      }

      if (res.data.warning) {
        addToast(res.data.warning, { appearance: "warning" });
      }
    } catch (err) {
      dispatch(supplierErr(err));
      addToast("Supplier not getting added.", { appearance: "error" });
    }
  };
};

const supplierList = (currentPage = 1, perPage = 10) => {
  return async (dispatch) => {
    try {
      dispatch(supplierBegin());
      const res = await DataService.get(
        `supplier?page=${currentPage}&per_page=${perPage}&delay=1`
      );
      dispatch(supplierSuccess(res.data));
    } catch (err) {
      dispatch(supplierErr(err));
    }
  };
};

const showroomWiseSupplierList = (showroom_id) => {
  return async (dispatch) => {
    try {
      dispatch(supplierBegin());
      const res = await DataService.get(`showroom-wise-supplier/${showroom_id}`);
      dispatch(supplierSuccess(res.data));
    } catch (err) {
      dispatch(supplierErr(err));
    }
  };
};

const supplierInfo = (id) => {
  return async (dispatch) => {
    try {
      dispatch(supplierBegin());
      const res = await DataService.get(`/supplier-edit/${id}`);
      dispatch(supplierGet(res.data));
    } catch (err) {
      dispatch(supplierErr(err));
    }
  };
};

const supplierUpdate = (data, addToast, history) => {
  return async (dispatch) => {
    try {
      dispatch(supplierBegin());
      const res = await DataService.post("supplier-update", data);
      if (res.data.success) {
        addToast(res.data.success, { appearance: "success" });
        history.push("/supplier/all");
      }

      if (res.data.warning) {
        addToast(res.data.warning, { appearance: "warning" });
      }
    } catch (err) {
      dispatch(supplierErr(err));
      addToast("Supplier not getting added.", { appearance: "error" });
    }
  };
};

const supplierDelete = (id, addToast) => {
  return async (dispatch) => {
    try {
      dispatch(supplierBegin());
      const res = await DataService.get(`/supplier-destroy/${id}`);
      if (res.data) {
        addToast("Supplier successfully deleted", { appearance: "success" });
        dispatch(supplierSuccess(res.data));
      }

      if (res.data.warning) {
        addToast(res.data.warning, { appearance: "warning" });
      }
    } catch (err) {
      dispatch(supplierErr(err));
    }
  };
};

export {
  supplier,
  supplierList,
  showroomWiseSupplierList,
  supplierInfo,
  supplierUpdate,
  supplierDelete,
};
