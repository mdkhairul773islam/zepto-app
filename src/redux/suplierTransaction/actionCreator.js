import actions from "./actions";
import { toast } from "react-toastify";
import { DataService } from "../../config/dataService/dataService";
const { transactionBegin, transactionSuccess, transactionErr } = actions;

const transaction = (data, history) => {
  return async (dispatch) => {
    try {
      dispatch(transactionBegin());
      const res = await DataService.post("party-transaction", data);
       if (res.data.success) {
        toast.success(res.data.success, {
          position: toast.POSITION.TOP_CENTER
        });
        history.push("/supplier/transaction-histrory");
      } 
    } catch (err) {
      dispatch(transactionErr(err));
    }
  };
};

export { transaction };
