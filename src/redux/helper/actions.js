const actions = {
  HELPER_BEGIN: "HELPER_BEGIN",
  WAREHOUSE_SUCCESS: "WAREHOUSE_SUCCESS",
  WAREHOUSE_SUCCESS_FOR_SEARCH: "WAREHOUSE_SUCCESS_FOR_SEARCH",
  SUPLIER_SUCCESS: "SUPLIER_SUCCESS",
  SUPLIER_SUCCESS_FOR_SEARCH: "SUPLIER_SUCCESS_FOR_SEARCH",
  SUPLIER_TRANSACTION_DETAILS_SUCCESS: "SUPLIER_TRANSACTION_DETAILS_SUCCESS", 
  HELPER_ERR: "HELPER_ERR",

  helperBegin: () => {
    return {
      type: actions.HELPER_BEGIN,
    };
  },

  warehouseSuccess: (data) => {
    return {
      type: actions.WAREHOUSE_SUCCESS,
      data,
    };
  },
  warehouseSuccessForSearch: (data) => {
    return {
      type: actions.WAREHOUSE_SUCCESS_FOR_SEARCH,
      data,
    };
  },
  suplierSuccessForSearch: (data) => {
    return {
      type: actions.SUPLIER_SUCCESS_FOR_SEARCH,
      data,
    };
  },
  suplierSuccess: (data) => {
    return {
      type: actions.SUPLIER_SUCCESS,
      data,
    };
  },
  suplierTransactionDetailsSuccess: (data) => {
    return {
      type: actions.SUPLIER_TRANSACTION_DETAILS_SUCCESS,
      data,
    };
  },

  helperErr: (err) => {
    return {
      type: actions.HELPER_ERR,
      err,
    };
  },
};

export default actions;
