import actions from "./actions";
import { DataService } from "../../config/dataService/dataService";
const { brandBegin, brandSuccess, brandErr } = actions;

const brand = () => {
  return async (dispatch) => {
    try {
      dispatch(brandBegin());
      const res = await DataService.get("brand");
      dispatch(brandSuccess(res.data.data));
    } catch (err) {
      dispatch(brandErr(err));
    }
  };
};

export { brand };
