import actions from "./actions";

const { TRANSACTION_BEGIN, TRANSACTION_SUCCESS, TRANSACTION_ERR } = actions;

const initState = {
  transactionList: [],
  loading: false,
  error: "",
};

/**
 *
 * @todo impure state mutation/explaination
 */

const Transaction = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case TRANSACTION_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        transactionList: data.data,
        totalRows: data.data.total,
        loading: false,
      };
    case TRANSACTION_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default Transaction;
