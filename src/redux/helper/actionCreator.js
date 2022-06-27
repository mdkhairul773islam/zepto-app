import actions from "./actions";
import { DataService } from "../../config/dataService/dataService";
const { helperBegin, warehouseSuccess, suplierSuccess, helperErr } = actions;

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

const suplier = () => {
  return async (dispatch) => {
    try {
      dispatch(helperBegin());
      const res = await DataService.get("supplier-list");
      dispatch(suplierSuccess(res.data));
    } catch (err) {
      dispatch(helperErr(err));
    }
  };
};

export { warehouse, suplier };