import actions from "./actions";
import { DataService } from "../../config/dataService/dataService";
const { categoryBegin, categorySuccess, categoryErr } = actions;

const category = () => {
  return async (dispatch) => {
    try {
      dispatch(categoryBegin());
      const res = await DataService.get("category");
      dispatch(categorySuccess(res.data.data));
    } catch (err) {
      dispatch(categoryErr(err));
    }
  };
};

export { category };
