import actions from "./actions";
import { DataService } from "../../config/dataService/dataService";
const { helperBegin, helperSuccess, helperErr } = actions;

const warehouse = () => {
  return async (dispatch) => {
    try {
      dispatch(helperBegin());
      const res = await DataService.get("warehouse-list");
      dispatch(helperSuccess(res.data));
    } catch (err) {
      dispatch(helperErr(err));
    }
  };
};

export { warehouse };
