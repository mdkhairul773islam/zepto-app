import actions from "./actions";
import { DataService } from "../../config/dataService/dataService";
const {
  helperBegin,
  warehouseSuccess,
  suplierSuccess,
  suplierTransactionDetailsSuccess,
  helperErr,
} = actions;

const warehouse = () => {
  return async (dispatch) => {
    try {
      dispatch(helperBegin());
      const res = await DataService.get("warehouse-list");
      dispatch(warehouseSuccess(res.data));
    } catch (err) {
      dispatch(helperErr(err));
    }
  };
};

const suplier = (warehouse_id) => {
  return async (dispatch) => {
    try {
      dispatch(helperBegin());
      const res = await DataService.get(`supplier-list/${warehouse_id}`);
      dispatch(suplierSuccess(res.data));
    } catch (err) {
      dispatch(helperErr(err));
    }
  };
};

const supplierTransactionDetailsFn = (e) => {
  const {code} = e;
  return async (dispatch) => {
    try {
      dispatch(helperBegin());
      const res = await DataService.get(`supplier-transaction-details/${code}`);
      dispatch(suplierTransactionDetailsSuccess(res.data));
    } catch (err) {
      dispatch(helperErr(err));
    }
  };
};

export { warehouse, suplier, supplierTransactionDetailsFn };
