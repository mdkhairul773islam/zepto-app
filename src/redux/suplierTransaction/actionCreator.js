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

const transactionHistory = (currentPage = 1, perPage = 10, customSerch = null) => {
  return async (dispatch) => {
    try {
      dispatch(transactionBegin());
      const res = await DataService.get(
        `party-transaction?page=${currentPage}&per_page=${perPage}&delay=1`
      );
      dispatch(transactionSuccess(res.data));
    } catch (err) {
      dispatch(transactionErr(err));
    }
  };
};

const transactionHistoryWithSearch = (searchItem = null, currentPage = 1, perPage = 10) => {
  console.log("currentPage", currentPage,"perPage", perPage , "customSerch", searchItem);
  return async (dispatch) => {
    try {
      dispatch(transactionBegin());
      const res = await DataService.get(
        `party-transaction?searchItem=${searchItem}&page=${currentPage}&per_page=${perPage}&delay=1`
      );
      dispatch(transactionSuccess(res.data));
    } catch (err) {
      dispatch(transactionErr(err));
    }
  };
};

const transactionUpdate = (data, history) => {
  return async (dispatch) => {
    try {
      dispatch(transactionBegin());
      const res = await DataService.post("/transaction-histrory", data);
      if (res.data.success) {
        toast.success(res.data.success, {
          position: toast.POSITION.TOP_CENTER
        });
        history.push("/supplier/transaction-histrory");
      }

      if (res.data.warning) {
        toast.warn(res.data.warning, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (err) {
      dispatch(transactionErr(err));
      toast.error("Transaction history delete error.", {
          position: toast.POSITION.TOP_CENTER
        });
    }
  };
};

const transactionDelete = (id) => {
  return async (dispatch) => {
    try {
      dispatch(transactionBegin());
      const res = await DataService.get(`/transaction-histrory/${id}`);
      if (res.data) {
        toast.success("transaction successfully deleted", {
          position: toast.POSITION.TOP_CENTER
        });
        dispatch(transactionSuccess(res.data));
      }

      if (res.data.warning) {
        toast.warn(res.data.warning, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (err) {
      dispatch(transactionErr(err));
    }
  };
};

export { transaction, transactionHistory, transactionHistoryWithSearch, transactionUpdate, transactionDelete };
