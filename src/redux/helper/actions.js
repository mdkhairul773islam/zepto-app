const actions = {
  HELPER_BEGIN: "HELPER_BEGIN",
  WAREHOUSE_SUCCESS: "WAREHOUSE_SUCCESS",
  SUPLIER_SUCCESS: "SUPLIER_SUCCESS",
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
  suplierSuccess: (data) => {
    return {
      type: actions.SUPLIER_SUCCESS,
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
