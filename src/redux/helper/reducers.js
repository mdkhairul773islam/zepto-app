import actions from "./actions";

const { HELPER_BEGIN, WAREHOUSE_SUCCESS, SUPLIER_SUCCESS, SUPLIER_TRANSACTION_DETAILS_SUCCESS, HELPER_ERR } =
  actions;

const initState = {
  warehouseList: [],
  suplierList: [],
  partyBalance: [],
  loading: false,
  error: "",
};

/**
 *
 * @todo impure state mutation/explaination
 */

const Helper = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case HELPER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouseList: data.length ? data : [],
        loading: false,
      };
    case SUPLIER_SUCCESS:
      return {
        ...state,
        suplierList: data.length ? data : [],
        loading: false,
      };
    case SUPLIER_TRANSACTION_DETAILS_SUCCESS:
      return {
        ...state,
        partyBalance: data,
        loading: false,
      };
    case HELPER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default Helper;
