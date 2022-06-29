import actions from "./actions";
import { DataService } from "../../config/dataService/dataService";
const { transactionBegin, transactionSuccess, transactionErr } = actions;

const transaction = (data, addToast, history) => {
  return async (dispatch) => {
    try {
      dispatch(transactionBegin());
      const res = await DataService.post("party-transaction", data);
       if (res.data.success) {
        addToast(res.data.success, { appearance: "success" });
        history.push("/supplier/transaction-histrory");
      } 
    } catch (err) {
      dispatch(transactionErr(err));
    }
  };
};

export { transaction };
