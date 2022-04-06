import actions from "./actions";
import { DataService } from "../../config/dataService/dataService";
const { unitBegin, unitSuccess, unitErr } = actions;

const unit = () => {
  return async (dispatch) => {
    try {
      dispatch(unitBegin());
      const res = await DataService.get("unit");
      dispatch(unitSuccess(res.data.data));
    } catch (err) {
      dispatch(unitErr(err));
    }
  };
};

export { unit };
