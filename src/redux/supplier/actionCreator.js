import actions from "./actions";
import { toast } from "react-toastify";
import { DataService } from "../../config/dataService/dataService";
const { supplierBegin, supplierSuccess, supplierGet, supplierErr } = actions;

const supplier = (data, history) => {
  return async (dispatch) => {
    try {
      dispatch(supplierBegin());
      const res = await DataService.post("supplier-store", data);

      if (res.data.success) {
        toast.success(res.data.success, {
          position: toast.POSITION.TOP_CENTER
        });
        history.push("/supplier/all");
      }

      if (res.data.warning) {
        toast.warn(res.data.warning, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (err) {
      dispatch(supplierErr(err));
      toast.error("Supplier not getting added.", {
          position: toast.POSITION.TOP_CENTER
        });
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
      const res = await DataService.get(
        `showroom-wise-supplier/${showroom_id}`
      );
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

const supplierUpdate = (data, history) => {
  return async (dispatch) => {
    try {
      dispatch(supplierBegin());
      const res = await DataService.post("supplier-update", data);
      if (res.data.success) {
        toast.success(res.data.success, {
          position: toast.POSITION.TOP_CENTER
        });
        history.push("/supplier/all");
      }

      if (res.data.warning) {
        toast.warn(res.data.warning, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (err) {
      dispatch(supplierErr(err));
      toast.error("Supplier not getting added.", {
          position: toast.POSITION.TOP_CENTER
        });
    }
  };
};

const supplierDelete = (id) => {
  return async (dispatch) => {
    try {
      dispatch(supplierBegin());
      const res = await DataService.get(`/supplier-destroy/${id}`);
      if (res.data) {
        toast.success("Supplier successfully deleted", {
          position: toast.POSITION.TOP_CENTER
        });
        dispatch(supplierSuccess(res.data));
      }

      if (res.data.warning) {
        toast.warn(res.data.warning, {
          position: toast.POSITION.TOP_CENTER
        });
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
